import "server-only";
import { createClient } from "@supabase/supabase-js";

/** Baris tabel `projects` di Supabase. */
export interface ProjectRow {
  id: string;
  title: string;
  subtitle: string;
  href: string | null;
  image_url: string;
  image_alt: string;
  sort_order: number;
  created_at: string;
}

/** Baris tabel `news_items` di Supabase. */
export interface NewsRow {
  id: string;
  kicker: string;
  paragraphs: string[];
  period: string;
  image_url: string;
  image_alt: string;
  image_side: "left" | "right";
  sort_order: number;
  created_at: string;
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Klien baca-saja (anon key) untuk halaman publik. */
export function supabasePublic() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

/** Klien service-role — melewati RLS. HANYA untuk server action admin. */
export function supabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY belum di-set di .env.local");
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { persistSession: false },
  });
}
