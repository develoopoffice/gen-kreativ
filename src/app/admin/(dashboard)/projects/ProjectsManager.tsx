"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import type { ProjectRow } from "@/lib/supabase";
import {
  deleteProject,
  reorderProjects,
  saveProject,
  type ActionState,
} from "../../actions";
import { DraggableList } from "../DraggableList";

const initialState: ActionState = {};

const inputCls =
  "w-full rounded-lg border border-white/15 bg-surface px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-primary";
const labelCls = "mb-1.5 block text-xs font-semibold text-white/70";

export function ProjectsManager({ rows }: { rows: ProjectRow[] }) {
  const [editing, setEditing] = useState<ProjectRow | null>(null);
  const [, startTransition] = useTransition();

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
      <ProjectForm
        key={editing?.id ?? "new"}
        editing={editing}
        onDone={() => setEditing(null)}
      />

      <div>
        <h2 className="mb-1 text-sm font-extrabold uppercase tracking-wide text-white">
          Daftar Project ({rows.length})
        </h2>
        <p className="mb-4 text-xs text-white/45">
          Tarik ikon ☰ untuk mengubah urutan tampil.
        </p>

        {rows.length === 0 && (
          <p className="text-sm text-white/50">
            Belum ada project di database — homepage masih menampilkan data
            bawaan dari kode.
          </p>
        )}

        <DraggableList
          items={rows}
          onReorder={(ids) => startTransition(() => reorderProjects(ids))}
          renderItem={(project) => (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image_url}
                alt={project.image_alt}
                className="h-14 w-24 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">
                  {project.title}
                </p>
                <p className="truncate text-xs text-white/55">{project.subtitle}</p>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate text-xs text-primary hover:underline"
                  >
                    {project.href}
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={() => setEditing(project)}
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Edit
              </button>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
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

function ProjectForm({
  editing,
  onDone,
}: {
  editing: ProjectRow | null;
  onDone: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(saveProject, initialState);

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
          {editing ? "Edit Project" : "Tambah Project"}
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
        <label htmlFor="p-title" className={labelCls}>
          Judul *
        </label>
        <input
          id="p-title"
          name="title"
          type="text"
          required
          defaultValue={editing?.title ?? ""}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="p-subtitle" className={labelCls}>
          Subjudul
        </label>
        <input
          id="p-subtitle"
          name="subtitle"
          type="text"
          placeholder="mis. Short Film"
          defaultValue={editing?.subtitle ?? ""}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="p-href" className={labelCls}>
          Link video (opsional)
        </label>
        <input
          id="p-href"
          name="href"
          type="url"
          placeholder="https://youtube.com/..."
          defaultValue={editing?.href ?? ""}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="p-image" className={labelCls}>
          Gambar (16:9) {editing ? "— kosongkan jika tidak diganti" : "*"}
        </label>
        {editing && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={editing.image_url}
            alt={editing.image_alt}
            className="mb-2 h-20 w-36 rounded-lg object-cover"
          />
        )}
        <input
          id="p-image"
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
        {pending ? "Menyimpan..." : editing ? "Perbarui Project" : "Simpan Project"}
      </button>
    </form>
  );
}
