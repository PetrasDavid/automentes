"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/admin/actions";
import { Lock } from "lucide-react";

type LoginState = { ok: boolean; message?: string } | null;

async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  return loginAdmin(formData);
}

export function AdminLoginForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.ok) router.refresh();
  }, [state, router]);

  return (
    <div className="min-h-screen bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-md border-4 border-accent bg-zinc-950 p-8 shadow-[12px_12px_0_0_#e8c547]">
        <div className="flex items-center gap-3 border-b-4 border-zinc-800 pb-6">
          <Lock className="h-10 w-10 text-accent" aria-hidden />
          <div>
            <h1 className="font-heading text-3xl font-black uppercase tracking-tight">Admin</h1>
            <p className="text-sm text-zinc-500">Jelszóval védett irányítópult</p>
          </div>
        </div>
        <form action={formAction} className="mt-8 space-y-5">
          <label className="block">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-accent">Jelszó</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full border-4 border-zinc-700 bg-black px-4 py-4 text-lg text-white focus:border-accent focus:outline-none"
            />
          </label>
          {state?.ok === false && state.message ? (
            <p className="text-sm font-bold text-red-400">{state.message}</p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full border-4 border-black bg-accent py-4 font-heading text-lg font-black uppercase tracking-wide text-black shadow-[6px_6px_0_0_#fff] hover:bg-[#f0d060] disabled:opacity-60"
          >
            {pending ? "Belépés…" : "Belépés"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-zinc-600">
          Fejlesztői alapértelmezés: állítsd be az <span className="text-zinc-400">ADMIN_PASSWORD</span> környezeti változót.
        </p>
      </div>
    </div>
  );
}
