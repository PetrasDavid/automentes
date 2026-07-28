"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="border border-zinc-800 bg-zinc-950/30 p-6 sm:p-8">
      <h3 className="font-heading text-lg font-semibold uppercase tracking-wide text-zinc-200">
        Üzenet
      </h3>
      <p className="mt-2 text-sm text-zinc-500">
        Nem sürgős kérdés esetén — visszahívjuk a megadott számon.
      </p>

      <label className="mt-6 block">
        <span className="font-heading text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
          Név
        </span>
        <input
          required
          name="name"
          type="text"
          autoComplete="name"
          disabled={pending}
          className="mt-1.5 w-full border border-zinc-700 bg-[#0a0a0b] px-3 py-2.5 text-sm text-white placeholder:text-zinc-700 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-60"
        />
      </label>

      <label className="mt-4 block">
        <span className="font-heading text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
          Telefon
        </span>
        <input
          required
          name="phone"
          type="tel"
          autoComplete="tel"
          disabled={pending}
          className="mt-1.5 w-full border border-zinc-700 bg-[#0a0a0b] px-3 py-2.5 text-sm text-white placeholder:text-zinc-700 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-60"
        />
      </label>

      <label className="mt-4 block">
        <span className="font-heading text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
          Mi a gond?
        </span>
        <textarea
          required
          name="message"
          rows={4}
          disabled={pending}
          placeholder="Cím, jármű, mi történt"
          className="mt-1.5 w-full resize-y border border-zinc-700 bg-[#0a0a0b] px-3 py-2.5 text-sm text-white placeholder:text-zinc-700 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-60"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 bg-accent font-heading text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-[#f0d060] disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden />
        {pending ? "Küldés…" : "Küldés"}
      </button>

      {state.message ? (
        <p
          className={`mt-4 text-center text-sm ${state.ok ? "text-accent" : "text-red-400"}`}
          role="status"
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <p className="mt-4 text-[11px] leading-relaxed text-zinc-600">
        Az adatait kizárólag a megkeresés kezelésére használjuk. Részletek:{" "}
        <a href="/adatkezeles" className="text-zinc-400 underline hover:text-white">
          adatkezelési tájékoztató
        </a>
        .
      </p>
    </form>
  );
}
