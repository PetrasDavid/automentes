"use server";

import { cookies } from "next/headers";

const COOKIE = "admin_session";

function expectedPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD?.trim();
  if (pw) return pw;
  if (process.env.NODE_ENV === "production") return null;
  return "admin123";
}

export async function loginAdmin(formData: FormData) {
  const password = expectedPassword();
  if (!password) {
    return {
      ok: false as const,
      message: "Az admin felület nincs konfigurálva. Állítsd be az ADMIN_PASSWORD környezeti változót.",
    };
  }

  const attempt = String(formData.get("password") ?? "");
  if (attempt !== password) {
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
