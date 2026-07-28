import { Phone, Mail, MapPin } from "lucide-react";
import {
  SITE_ADDRESS_DETAIL,
  SITE_ADDRESS_SHORT,
  SITE_EMAIL,
  SITE_MAP_EMBED,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export function Contact() {
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
                  Szolgáltatási terület
                </span>
                <p className="mt-2 flex gap-2 text-sm leading-snug text-zinc-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" aria-hidden />
                  <span>
                    <strong className="text-zinc-300">{SITE_ADDRESS_SHORT}</strong>
                    <br />
                    {SITE_ADDRESS_DETAIL}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 aspect-[16/9] overflow-hidden border border-zinc-800">
              <iframe
                title={`${SITE_ADDRESS_SHORT} — térkép`}
                src={SITE_MAP_EMBED}
                className="h-full w-full border-0 grayscale-[0.3] contrast-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
