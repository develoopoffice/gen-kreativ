-- ============================================================================
-- Gen Kreativ — skema database Supabase
-- Jalankan sekali di Supabase Dashboard → SQL Editor → New query.
-- ============================================================================

-- ── Tabel: projects (carousel "Recent Projects" di homepage) ────────────────
create table if not exists public.projects (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  subtitle   text not null default '',
  href       text,                        -- link video/YouTube saat kartu diklik
  image_url  text not null,               -- URL publik gambar di Storage
  image_alt  text not null default '',
  sort_order int  not null default 0,     -- urutan tampil (kecil = lebih dulu)
  created_at timestamptz not null default now()
);

-- ── Tabel: news_items (halaman News & Collaboration) ────────────────────────
create table if not exists public.news_items (
  id         uuid primary key default gen_random_uuid(),
  kicker     text not null,               -- judul kecil, mis. "WIRAGAMA GRANT"
  paragraphs text[] not null default '{}',-- isi berita, satu elemen per paragraf
  period     text not null default '',    -- mis. "February – June 2026."
  image_url  text not null,
  image_alt  text not null default '',
  image_side text not null default 'left' check (image_side in ('left', 'right')),
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);

-- ── Row Level Security ───────────────────────────────────────────────────────
-- Publik hanya boleh MEMBACA. Semua tulisan dilakukan server memakai
-- service-role key (melewati RLS), jadi tidak perlu policy insert/update.
alter table public.projects   enable row level security;
alter table public.news_items enable row level security;

create policy "Public read projects"
  on public.projects for select using (true);

create policy "Public read news"
  on public.news_items for select using (true);

-- ── Storage: bucket publik untuk gambar upload ──────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Publik boleh melihat file; upload/hapus hanya lewat service-role (server).
create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');
