import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";
import { logout } from "../actions";

/** Layout semua halaman admin (kecuali /admin/login) — wajib ber-session. */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await verifySession())) {
    redirect("/admin/login");
  }

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-2.5">
          <span className="h-5 w-1.5 rounded-full bg-primary" aria-hidden />
          <h1 className="text-lg font-extrabold uppercase tracking-wide text-white">
            Admin Panel
          </h1>
        </div>

        <nav className="flex items-center gap-2 text-xs font-semibold">
          <AdminNavLink href="/admin/projects">Recent Projects</AdminNavLink>
          <AdminNavLink href="/admin/news">News</AdminNavLink>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-white/15 px-4 py-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Keluar
            </button>
          </form>
        </nav>
      </div>

      {children}
    </div>
  );
}

function AdminNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full border border-white/15 px-4 py-2 text-white/70 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}
