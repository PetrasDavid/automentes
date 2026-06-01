"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/site";

const nav = [
  ["#szolgaltatasok", "Szolgáltatás"],
  ["#miert-minket", "Rólunk"],
  ["#galeria", "Munkák"],
  ["#kapcsolat", "Kapcsolat"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#0a0a0b]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[3.25rem] max-w-6xl items-center justify-between gap-3 px-4 sm:h-14 sm:px-6">
        <a
          href="#"
          className="group flex shrink-0 items-baseline gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="font-heading text-lg font-bold uppercase tracking-wide text-white sm:text-xl">
            Auto
            <span className="text-accent">Mentés</span>
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-600 sm:inline">
            0–24
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="px-3 py-2 font-heading text-[13px] font-medium uppercase tracking-wide text-zinc-400 decoration-accent decoration-2 underline-offset-8 hover:text-white hover:underline"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE_PHONE_TEL}
            className="inline-flex h-9 items-center justify-center gap-1.5 bg-accent px-3 font-heading text-[11px] font-bold uppercase tracking-wide text-zinc-950 md:hidden"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            Hívás
          </a>
          <a
            href={SITE_PHONE_TEL}
            className="hidden items-center gap-2 font-heading text-[13px] font-semibold uppercase tracking-wide text-zinc-300 tabular-nums hover:text-accent md:inline-flex"
          >
            <Phone className="h-4 w-4 text-accent" aria-hidden />
            {SITE_PHONE_DISPLAY}
          </a>
          <a
            href="#kapcsolat"
            className="hidden h-9 items-center border border-zinc-600 px-3 font-heading text-[11px] font-semibold uppercase tracking-wide text-zinc-200 hover:border-zinc-500 hover:text-white lg:inline-flex"
          >
            Üzenet
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center text-zinc-300 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menü</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-zinc-800 bg-[#0a0a0b] px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col">
            {nav.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-zinc-900 py-3 font-heading text-sm font-medium uppercase tracking-wide text-zinc-300"
              >
                {label}
              </a>
            ))}
            <a
              href={SITE_PHONE_TEL}
              className="mt-3 flex h-11 items-center justify-center gap-2 bg-accent font-heading text-sm font-bold uppercase tracking-wide text-zinc-950"
            >
              <Phone className="h-4 w-4" />
              {SITE_PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
