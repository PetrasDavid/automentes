"use client";

import { useCallback, useState } from "react";
import { Loader2, MapPin, MessageSquareWarning } from "lucide-react";
import { SITE_PHONE_SMS } from "@/lib/site";

function smsBody(lat: number, lng: number) {
  const maps = `https://www.google.com/maps?q=${lat},${lng}`;
  return `Segítségre van szükségem, itt vagyok: ${maps}`;
}

function smsHref(lat: number, lng: number) {
  const body = smsBody(lat, lng);
  return `sms:${SITE_PHONE_SMS}?body=${encodeURIComponent(body)}`;
}

export function HeroSmsButton() {
  const [phase, setPhase] = useState<"idle" | "loading" | "error" | "ready">("idle");
  const [href, setHref] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setPhase("error");
      return;
    }
    setPhase("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const link = smsHref(latitude, longitude);
        setHref(link);
        setPhase("ready");
        if (typeof window !== "undefined") {
          window.location.href = link;
        }
      },
      () => setPhase("error"),
      { enableHighAccuracy: true, timeout: 14_000, maximumAge: 60_000 },
    );
  }, []);

  if (phase === "ready" && href) {
    return (
      <a
        href={href}
        className="inline-flex h-14 min-h-[3.5rem] w-full max-w-md items-center justify-center gap-2 border-4 border-black bg-zinc-900 px-4 font-heading text-base font-bold uppercase tracking-wide text-accent shadow-[6px_6px_0_0_#000] hover:bg-zinc-800 sm:h-16 sm:text-lg"
      >
        <MapPin className="h-5 w-5 shrink-0" strokeWidth={2.2} aria-hidden />
        SMS megnyitása
      </a>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <button
        type="button"
        onClick={requestLocation}
        disabled={phase === "loading"}
        className="inline-flex h-14 min-h-[3.5rem] items-center justify-center gap-2 border-4 border-black bg-zinc-200 px-4 font-heading text-base font-bold uppercase tracking-wide text-black shadow-[6px_6px_0_0_#000] hover:bg-white disabled:opacity-70 sm:h-16 sm:text-lg"
      >
        {phase === "loading" ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        ) : (
          <MapPin className="h-5 w-5 shrink-0" strokeWidth={2.2} aria-hidden />
        )}
        {phase === "loading" ? "Helyzet lekérése…" : "Helyzetem küldése SMS-ben"}
      </button>
      {phase === "error" ? (
        <p className="flex items-start gap-2 text-sm font-semibold text-red-400">
          <MessageSquareWarning className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          Nem sikerült a helyzet lekérése. Ellenőrizd a böngésző engedélyeit, vagy hívj közvetlenül.
        </p>
      ) : null}
    </div>
  );
}
