"use server";

import { cookies } from "next/headers";

const COOKIE = "admin_session";

function expectedPassword() {
  return process.env.ADMIN_PASSWORD ?? "admin123";
}

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password !== expectedPassword()) {
    return { ok: false as const, message: "Hibás jelszó." };
  }
  const jar = await cookies();
  jar.set(COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
  return { ok: true as const };
}

export async function logoutAdmin() {
  (await cookies()).delete(COOKIE);
}

export async function isAdminSession(): Promise<boolean> {
  return (await cookies()).get(COOKIE)?.value === "1";
}
