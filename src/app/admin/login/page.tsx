import type { Metadata } from "next";
import { LogoMark } from "@/components/layout/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-soft p-8">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <LogoMark className="h-12 w-12" />
          <div>
            <h1 className="text-lg font-extrabold text-white">Admin Panel</h1>
            <p className="mt-1 text-xs text-white/55">
              Masuk untuk mengelola Recent Projects & News
            </p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
