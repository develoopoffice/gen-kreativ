"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import type { NewsRow } from "@/lib/supabase";
import {
  deleteNews,
  reorderNews,
  saveNews,
  type ActionState,
} from "../../actions";
import { DraggableList } from "../DraggableList";

const initialState: ActionState = {};

const inputCls =
  "w-full rounded-lg border border-white/15 bg-surface px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-primary";
const labelCls = "mb-1.5 block text-xs font-semibold text-white/70";

export function NewsManager({ rows }: { rows: NewsRow[] }) {
  const [editing, setEditing] = useState<NewsRow | null>(null);
  const [, startTransition] = useTransition();

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <NewsForm
        key={editing?.id ?? "new"}
        editing={editing}
        onDone={() => setEditing(null)}
      />

      <div className="min-w-0">
        <h2 className="mb-1 text-sm font-extrabold uppercase tracking-wide text-white">
          Daftar Berita ({rows.length})
        </h2>
        <p className="mb-4 text-xs text-white/45">
          Tarik ikon ☰ untuk mengubah urutan tampil.
        </p>

        {rows.length === 0 && (
          <p className="text-sm text-white/50">
            Belum ada berita di database — halaman News masih menampilkan data
            bawaan dari kode.
          </p>
        )}

        <DraggableList
          items={rows}
          onReorder={(ids) => startTransition(() => reorderNews(ids))}
          renderItem={(item) => (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.image_alt}
                className="h-16 w-14 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">{item.kicker}</p>
                <p className="line-clamp-2 break-words text-xs text-white/55">
                  {item.paragraphs[0] ?? ""}
                </p>
                <p className="text-xs text-white/40">
                  {item.period} · gambar di{" "}
                  {item.image_side === "right" ? "kanan" : "kiri"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(item)}
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Edit
              </button>
              <form action={deleteNews}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  className="rounded-full border border-red-400/30 px-3.5 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  Hapus
                </button>
              </form>
            </>
          )}
        />
      </div>
    </div>
  );
}

/** Bungkus teks yang dipilih di textarea dengan penanda markup, lalu fokus kembali. */
function wrapSelection(textarea: HTMLTextAreaElement, marker: string) {
  const { selectionStart, selectionEnd, value } = textarea;
  const selected = value.slice(selectionStart, selectionEnd);
  textarea.value =
    value.slice(0, selectionStart) +
    marker +
    selected +
    marker +
    value.slice(selectionEnd);
  textarea.focus();
  textarea.selectionStart = selectionStart + marker.length;
  textarea.selectionEnd = selectionStart + marker.length + selected.length;
}

const formatButtonCls =
  "rounded-md border border-white/15 px-2.5 py-1 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white";

function NewsForm({
  editing,
  onDone,
}: {
  editing: NewsRow | null;
  onDone: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const paragraphsRef = useRef<HTMLTextAreaElement>(null);
  const [state, formAction, pending] = useActionState(saveNews, initialState);

  useEffect(() => {
    if (!state.success) return;
    if (editing) {
      onDone();
    } else {
      formRef.current?.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="h-fit space-y-4 rounded-2xl border border-white/10 bg-ink-soft p-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-white">
          {editing ? "Edit Berita" : "Tambah Berita"}
        </h2>
        {editing && (
          <button
            type="button"
            onClick={onDone}
            className="text-xs font-semibold text-white/50 hover:text-white"
          >
            Batal
          </button>
        )}
      </div>

      {editing && <input type="hidden" name="id" value={editing.id} />}

      <div>
        <label htmlFor="n-kicker" className={labelCls}>
          Judul (kicker) *
        </label>
        <input
          id="n-kicker"
          name="kicker"
          type="text"
          required
          placeholder="mis. WIRAGAMA GRANT"
          defaultValue={editing?.kicker ?? ""}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="n-paragraphs" className={labelCls}>
          Isi berita *{" "}
          <span className="font-normal text-white/45">
            (pisahkan paragraf dengan baris kosong)
          </span>
        </label>
        <div className="mb-1.5 flex gap-1.5">
          <button
            type="button"
            title="Tebal"
            onClick={() =>
              paragraphsRef.current && wrapSelection(paragraphsRef.current, "**")
            }
            className={formatButtonCls}
          >
            <b>B</b>
          </button>
          <button
            type="button"
            title="Miring"
            onClick={() =>
              paragraphsRef.current && wrapSelection(paragraphsRef.current, "*")
            }
            className={formatButtonCls}
          >
            <i>I</i>
          </button>
          <button
            type="button"
            title="Garis bawah"
            onClick={() =>
              paragraphsRef.current && wrapSelection(paragraphsRef.current, "__")
            }
            className={formatButtonCls}
          >
            <u>U</u>
          </button>
        </div>
        <textarea
          ref={paragraphsRef}
          id="n-paragraphs"
          name="paragraphs"
          required
          rows={7}
          defaultValue={editing?.paragraphs.join("\n\n") ?? ""}
          className={inputCls}
        />
        <p className="mt-1 text-[0.7rem] text-white/40">
          Pilih teks lalu klik B/I/U, atau ketik manual: **tebal**, *miring*, __garis
          bawah__.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="n-period" className={labelCls}>
            Periode
          </label>
          <input
            id="n-period"
            name="period"
            type="text"
            placeholder="mis. October 2025."
            defaultValue={editing?.period ?? ""}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="n-side" className={labelCls}>
            Posisi gambar
          </label>
          <select
            id="n-side"
            name="image_side"
            defaultValue={editing?.image_side ?? "right"}
            className={inputCls}
          >
            <option value="right">Kanan</option>
            <option value="left">Kiri</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="n-image" className={labelCls}>
          Poster (4:5) {editing ? "— kosongkan jika tidak diganti" : "*"}
        </label>
        {editing && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={editing.image_url}
            alt={editing.image_alt}
            className="mb-2 h-24 w-20 rounded-lg object-cover"
          />
        )}
        <input
          id="n-image"
          name="image"
          type="file"
          accept="image/*"
          required={!editing}
          className={`${inputCls} file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white`}
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-500/10 px-3.5 py-2.5 text-xs text-red-400">
          {state.error}
        </p>
      )}
      {state.success && !editing && (
        <p className="rounded-lg bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-400">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary-strong disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : editing ? "Perbarui Berita" : "Simpan Berita"}
      </button>
    </form>
  );
}
