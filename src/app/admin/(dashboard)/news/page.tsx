import type { Metadata } from "next";
import { isSupabaseConfigured, supabaseAdmin, type NewsRow } from "@/lib/supabase";
import { NewsManager } from "./NewsManager";
import { SetupNotice } from "../SetupNotice";

export const metadata: Metadata = {
  title: "Admin — News",
  robots: { index: false, follow: false },
};

export default async function AdminNewsPage() {
  if (!isSupabaseConfigured()) return <SetupNotice />;

  const { data, error } = await supabaseAdmin()
    .from("news_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return (
      <p className="rounded-lg bg-red-500/10 px-3.5 py-2.5 text-xs text-red-400">
        Gagal memuat data: {error.message}. Pastikan skema SQL sudah dijalankan.
      </p>
    );
  }

  return <NewsManager rows={(data ?? []) as NewsRow[]} />;
}
