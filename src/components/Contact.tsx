"use client";

import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { SITE_EMAIL, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/site";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="kapcsolat" className="scroll-mt-20 bg-[#0c0c0e] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
          Kapcsolat
        </h2>
        <p className="mt-4 max-w-lg text-base text-zinc-500">
          Ha sürgős, ne e-mailt írjon először — hívjon, és közben mondja a címet.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="space-y-0 border border-zinc-800">
              <a
                href={SITE_PHONE_TEL}
                className="flex items-center justify-between gap-4 border-b border-zinc-800 p-5 hover:bg-zinc-900/50"
              >
                <span className="font-heading text-xs font-semibold uppercase tracking-widest text-zinc-600">
                  Telefon
                </span>
                <span className="flex items-center gap-2 font-heading text-base font-semibold tabular-nums text-white">
                  <Phone className="h-4 w-4 text-accent" aria-hidden />
                  {SITE_PHONE_DISPLAY}
                </span>
              </a>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="flex items-center justify-between gap-4 border-b border-zinc-800 p-5 hover:bg-zinc-900/50"
              >
                <span className="font-heading text-xs font-semibold uppercase tracking-widest text-zinc-600">
                  E-mail
                </span>
                <span className="flex items-center gap-2 break-all text-right text-sm font-medium text-zinc-300">
                  <Mail className="h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
                  {SITE_EMAIL}
                </span>
              </a>
              <div className="p-5">
                <span className="font-heading text-xs font-semibold uppercase tracking-widest text-zinc-600">
                  Telephely
                </span>
                <p className="mt-2 flex gap-2 text-sm leading-snug text-zinc-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
                  1234 Budapest, Példa utca 1. — ide jöjjön a valós cím és a térkép.
                </p>
              </div>
            </div>

            <div className="mt-4 flex aspect-[16/9] items-center justify-center border border-dashed border-zinc-800 bg-zinc-950/50">
              <p className="px-4 text-center text-xs text-zinc-600">
                Google Maps embed helye
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-zinc-800 bg-zinc-950/30 p-6 sm:p-8"
          >
            <h3 className="font-heading text-lg font-semibold uppercase tracking-wide text-zinc-200">
              Üzenet
            </h3>

            <label className="mt-6 block">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
                Név
              </span>
              <input
                required
                name="name"
                type="text"
                autoComplete="name"
                className="mt-1.5 w-full border border-zinc-700 bg-[#0a0a0b] px-3 py-2.5 text-sm text-white placeholder:text-zinc-700 focus:border-accent focus:outline-none"
                placeholder=""
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
                className="mt-1.5 w-full border border-zinc-700 bg-[#0a0a0b] px-3 py-2.5 text-sm text-white placeholder:text-zinc-700 focus:border-accent focus:outline-none"
                placeholder=""
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
                className="mt-1.5 w-full resize-y border border-zinc-700 bg-[#0a0a0b] px-3 py-2.5 text-sm text-white placeholder:text-zinc-700 focus:border-accent focus:outline-none"
                placeholder="Cím, jármű, mi történt"
              />
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 bg-accent font-heading text-sm font-bold uppercase tracking-wide text-zinc-950 hover:bg-[#f0d060]"
            >
              <Send className="h-4 w-4" aria-hidden />
              Küldés
            </button>

            {sent ? (
              <p className="mt-4 text-center text-sm text-accent" role="status">
                Megkaptuk — hamarosan visszajelzünk. (Demo)
              </p>
            ) : null}

            <p className="mt-4 text-[11px] leading-relaxed text-zinc-700">
              Éles oldalon ide API vagy űrlapszolgáltatás kell.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
