import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

/**
 * Session admin stateless (JWT di cookie httpOnly), mengikuti pola pada guide
 * authentication Next.js. Payload hanya berisi flag admin — tidak ada data
 * sensitif.
 */

const SESSION_COOKIE = "gk_admin_session";
const SESSION_DAYS = 7;

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET belum di-set di .env.local");
  return new TextEncoder().encode(secret);
}

export async function encryptSession(payload: { admin: boolean }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecretKey());
}

export async function decryptSession(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload as { admin?: boolean };
  } catch {
    return null;
  }
}

export async function createSession() {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const token = await encryptSession({ admin: true });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Dipakai server action & layout admin untuk memastikan request sah. */
export async function verifySession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const payload = await decryptSession(token);
  return payload?.admin === true;
}

export { SESSION_COOKIE };
