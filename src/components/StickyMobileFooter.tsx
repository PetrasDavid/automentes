import { Phone } from "lucide-react";
import { SITE_PHONE_TEL } from "@/lib/site";

/** Csak mobilon: fix alsó sáv, nagy sárga hívás gomb. */
export function StickyMobileFooter() {
  return (
    <a
      href={SITE_PHONE_TEL}
      className="fixed bottom-0 left-0 right-0 z-40 flex min-h-[4.5rem] items-center justify-center gap-3 border-t-4 border-black bg-accent px-4 py-3 font-heading text-[clamp(1.15rem,4.5vw,1.5rem)] font-black uppercase tracking-wide text-black shadow-[0_-6px_0_0_rgba(0,0,0,0.35)] sm:hidden"
      aria-label="Hívás most"
    >
      <Phone className="h-7 w-7 shrink-0" strokeWidth={2.5} aria-hidden />
      Hívás most
    </a>
  );
}
