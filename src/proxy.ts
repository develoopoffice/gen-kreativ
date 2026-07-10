import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "gk_admin_session";

/**
 * Pemeriksaan optimistik untuk /admin: tanpa session valid → /admin/login.
 * Verifikasi sesungguhnya tetap dilakukan di layout & setiap server action.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  let isAdmin = false;

  if (token && process.env.SESSION_SECRET) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.SESSION_SECRET),
        { algorithms: ["HS256"] },
      );
      isAdmin = payload.admin === true;
    } catch {
      isAdmin = false;
    }
  }

  if (!isAdmin && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isAdmin && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
