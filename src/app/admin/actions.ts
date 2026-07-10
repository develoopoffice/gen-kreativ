"use server";

import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, deleteSession, verifySession } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";

export interface ActionState {
  error?: string;
  success?: string;
}

/* ── Auth ──────────────────────────────────────────────────────────────── */

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function login(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) {
    return { error: "ADMIN_USERNAME / ADMIN_PASSWORD belum di-set di .env.local" };
  }

  if (!safeEqual(username, validUser) || !safeEqual(password, validPass)) {
    return { error: "Username atau password salah." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

/* ── Upload helper ─────────────────────────────────────────────────────── */

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

async function uploadImage(file: File, folder: "projects" | "news") {
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Ukuran gambar maks. 5MB.");
  if (!file.type.startsWith("image/")) throw new Error("File harus berupa gambar.");

  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const supabase = supabaseAdmin();
  const { error } = await supabase.storage
    .from("media")
    .upload(path, Buffer.from(await file.arrayBuffer()), {
      contentType: file.type,
    });

  if (error) throw new Error(`Upload gagal: ${error.message}`);

  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}

/** Hapus file storage berdasarkan public URL (best-effort). */
async function removeImageByUrl(url: string) {
  const marker = "/storage/v1/object/public/media/";
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const path = decodeURIComponent(url.slice(idx + marker.length));
  await supabaseAdmin().storage.from("media").remove([path]);
}

/** Nilai sort_order berikutnya (item baru selalu di urutan paling akhir). */
async function nextSortOrder(table: "projects" | "news_items") {
  const { data } = await supabaseAdmin()
    .from(table)
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  return (data?.[0]?.sort_order ?? -1) + 1;
}

/** File terisi dari input <input type="file"> — kosong berarti tidak diganti. */
function pickedFile(value: FormDataEntryValue | null): File | null {
  return value instanceof File && value.size > 0 ? value : null;
}

/* ── Projects ──────────────────────────────────────────────────────────── */

/** Insert (tanpa id) atau update (dengan id) satu project. */
export async function saveProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await verifySession())) return { error: "Unauthorized." };

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const image = pickedFile(formData.get("image"));

  if (!title) return { error: "Judul wajib diisi." };
  if (!id && !image) return { error: "Gambar wajib diunggah." };

  const supabase = supabaseAdmin();

  try {
    if (id) {
      const { data: existing } = await supabase
        .from("projects")
        .select("image_url")
        .eq("id", id)
        .single();
      if (!existing) return { error: "Project tidak ditemukan." };

      const fields: Record<string, unknown> = {
        title,
        subtitle,
        href: href || null,
        image_alt: `${title} project poster`,
      };
      if (image) fields.image_url = await uploadImage(image, "projects");

      const { error } = await supabase.from("projects").update(fields).eq("id", id);
      if (error) return { error: `Gagal menyimpan: ${error.message}` };

      if (image && existing.image_url) await removeImageByUrl(existing.image_url);
    } else {
      const { error } = await supabase.from("projects").insert({
        title,
        subtitle,
        href: href || null,
        image_url: await uploadImage(image!, "projects"),
        image_alt: `${title} project poster`,
        sort_order: await nextSortOrder("projects"),
      });
      if (error) return { error: `Gagal menyimpan: ${error.message}` };
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: id ? "Project berhasil diperbarui." : "Project berhasil ditambahkan." };
}

export async function deleteProject(formData: FormData) {
  if (!(await verifySession())) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from("projects")
    .select("image_url")
    .eq("id", id)
    .single();

  await supabase.from("projects").delete().eq("id", id);
  if (data?.image_url) await removeImageByUrl(data.image_url);

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

/** Simpan urutan baru hasil drag-drop: sort_order = posisi dalam array. */
export async function reorderProjects(ids: string[]) {
  if (!(await verifySession())) return;

  const supabase = supabaseAdmin();
  await Promise.all(
    ids.map((id, index) =>
      supabase.from("projects").update({ sort_order: index }).eq("id", id),
    ),
  );

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

/* ── News ──────────────────────────────────────────────────────────────── */

/** Insert (tanpa id) atau update (dengan id) satu berita. */
export async function saveNews(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await verifySession())) return { error: "Unauthorized." };

  const id = String(formData.get("id") ?? "").trim();
  const kicker = String(formData.get("kicker") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();
  const body = String(formData.get("paragraphs") ?? "").trim();
  const imageSide = formData.get("image_side") === "right" ? "right" : "left";
  const image = pickedFile(formData.get("image"));

  if (!kicker) return { error: "Judul (kicker) wajib diisi." };
  if (!body) return { error: "Isi berita wajib diisi." };
  if (!id && !image) return { error: "Gambar wajib diunggah." };

  // Pisahkan paragraf pada baris kosong.
  const paragraphs = body
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const supabase = supabaseAdmin();

  try {
    if (id) {
      const { data: existing } = await supabase
        .from("news_items")
        .select("image_url")
        .eq("id", id)
        .single();
      if (!existing) return { error: "Berita tidak ditemukan." };

      const fields: Record<string, unknown> = {
        kicker,
        paragraphs,
        period,
        image_alt: `${kicker} poster`,
        image_side: imageSide,
      };
      if (image) fields.image_url = await uploadImage(image, "news");

      const { error } = await supabase.from("news_items").update(fields).eq("id", id);
      if (error) return { error: `Gagal menyimpan: ${error.message}` };

      if (image && existing.image_url) await removeImageByUrl(existing.image_url);
    } else {
      const { error } = await supabase.from("news_items").insert({
        kicker,
        paragraphs,
        period,
        image_url: await uploadImage(image!, "news"),
        image_alt: `${kicker} poster`,
        image_side: imageSide,
        sort_order: await nextSortOrder("news_items"),
      });
      if (error) return { error: `Gagal menyimpan: ${error.message}` };
    }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Terjadi kesalahan." };
  }

  revalidatePath("/news-collaboration");
  revalidatePath("/admin/news");
  return { success: id ? "Berita berhasil diperbarui." : "Berita berhasil ditambahkan." };
}

export async function deleteNews(formData: FormData) {
  if (!(await verifySession())) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from("news_items")
    .select("image_url")
    .eq("id", id)
    .single();

  await supabase.from("news_items").delete().eq("id", id);
  if (data?.image_url) await removeImageByUrl(data.image_url);

  revalidatePath("/news-collaboration");
  revalidatePath("/admin/news");
}

/** Simpan urutan baru hasil drag-drop: sort_order = posisi dalam array. */
export async function reorderNews(ids: string[]) {
  if (!(await verifySession())) return;

  const supabase = supabaseAdmin();
  await Promise.all(
    ids.map((id, index) =>
      supabase.from("news_items").update({ sort_order: index }).eq("id", id),
    ),
  );

  revalidatePath("/news-collaboration");
  revalidatePath("/admin/news");
}
