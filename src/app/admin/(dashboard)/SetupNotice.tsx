/** Ditampilkan di halaman admin saat env Supabase belum diisi. */
export function SetupNotice() {
  return (
    <div className="rounded-2xl border border-amber-400/25 bg-amber-500/5 p-6 text-sm leading-relaxed text-amber-200/90">
      <p className="font-bold">Supabase belum dikonfigurasi.</p>
      <ol className="mt-3 list-decimal space-y-1.5 pl-5">
        <li>
          Buat project di{" "}
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            supabase.com
          </a>
          .
        </li>
        <li>
          Jalankan isi <code className="rounded bg-white/10 px-1">docs/supabase-schema.sql</code>{" "}
          di SQL Editor.
        </li>
        <li>
          Salin URL + anon key + service role key (Project Settings → API) ke{" "}
          <code className="rounded bg-white/10 px-1">.env.local</code>.
        </li>
        <li>Restart dev server.</li>
      </ol>
    </div>
  );
}
