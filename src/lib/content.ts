import "server-only";
import { recentProjects as staticProjects } from "@/data/projects";
import { newsItems as staticNews } from "@/data/news";
import {
  isSupabaseConfigured,
  supabasePublic,
  type NewsRow,
  type ProjectRow,
} from "@/lib/supabase";
import type { NewsItem, Project } from "@/types";

/**
 * Lapisan data konten: membaca dari Supabase bila sudah dikonfigurasi dan
 * berisi data; selain itu jatuh kembali ke data statis di src/data agar situs
 * tetap tampil sebelum database di-setup.
 */

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    href: row.href ?? undefined,
    image: { src: row.image_url, alt: row.image_alt || row.title },
  };
}

function mapNews(row: NewsRow, index: number): NewsItem {
  return {
    id: row.id,
    kicker: row.kicker,
    paragraphs: row.paragraphs,
    period: row.period,
    image: { src: row.image_url, alt: row.image_alt || row.kicker },
    // Selang-seling kiri/kanan bila tidak ditentukan eksplisit.
    imageSide: row.image_side ?? (index % 2 === 0 ? "right" : "left"),
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return staticProjects;

  try {
    const { data, error } = await supabasePublic()
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) return staticProjects;
    return (data as ProjectRow[]).map(mapProject);
  } catch {
    return staticProjects;
  }
}

export async function getNewsItems(): Promise<NewsItem[]> {
  if (!isSupabaseConfigured()) return staticNews;

  try {
    const { data, error } = await supabasePublic()
      .from("news_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) return staticNews;
    return (data as NewsRow[]).map(mapNews);
  } catch {
    return staticNews;
  }
}
