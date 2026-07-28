import { AlertTriangle, Car, MapPin, Phone } from "lucide-react";
import { SITE_ADDRESS_SHORT, SITE_PHONE_TEL } from "@/lib/site";
import { HeroSmsButton } from "@/components/HeroSmsButton";

const callChecklist = [
  {
    icon: MapPin,
    title: "Hol állsz?",
    line: "Pontos cím, autópálya km vagy lehajtó neve.",
  },
  {
    icon: Car,
    title: "Milyen jármű?",
    line: "Típus, szín, rendszám — ha tudod.",
  },
  {
    icon: AlertTriangle,
    title: "Mi történt?",
    line: "Defekt, lerobbanás, baleset, bikázás?",
  },
  {
    icon: Phone,
    title: "Visszahívható szám",
    line: "Ahova elérünk, ha megszakad a vonal.",
  },
] as const;

export function Hero() {
  return (
    <section className="relative border-b-4 border-black bg-[#050505]">
      <div className="absolute left-0 top-0 h-full w-2 bg-accent sm:w-2.5" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:grid lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-7 lg:pl-2">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.35em] text-accent">
            Vészhelyzet · 0–24
          </p>
          <h1 className="font-heading mt-4 text-[clamp(2.75rem,9vw,4.75rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
            Autómentés
            <span className="block text-accent">azonnal</span>
          </h1>
          <p className="mt-6 max-w-[36ch] text-[clamp(1.05rem,2.5vw,1.25rem)] font-medium leading-relaxed text-zinc-400">
            Lerobbanás, defekt, baleset — egy hívás, indulunk. Helyzet megosztása SMS-ben egy koppintással.
          </p>

          <div className="mt-10 flex max-w-xl flex-col gap-4 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-stretch">
            <a
              href={SITE_PHONE_TEL}
              className="inline-flex h-14 min-h-[3.5rem] flex-1 items-center justify-center gap-2 border-4 border-black bg-accent px-6 font-heading text-base font-black uppercase tracking-wide text-black shadow-[6px_6px_0_0_#000] hover:bg-[#f5d55a] sm:h-16 sm:min-w-[240px] sm:text-lg"
            >
              <Phone className="h-6 w-6 shrink-0" strokeWidth={2.4} aria-hidden />
              Azonnali mentés
            </a>
            <HeroSmsButton />
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t-4 border-zinc-800 pt-8 text-base">
            <div>
              <dt className="font-heading text-xs font-bold uppercase tracking-widest text-zinc-600">Diszpécser</dt>
              <dd className="font-heading mt-1 text-xl font-bold text-white">folyamatosan</dd>
            </div>
            <div>
              <dt className="font-heading text-xs font-bold uppercase tracking-widest text-zinc-600">Cél kiérkezés</dt>
              <dd className="font-heading mt-1 text-xl font-bold text-accent">~30 perc</dd>
            </div>
          </dl>
        </div>

        <div className="relative mt-14 lg:col-span-5 lg:mt-0 lg:flex lg:items-stretch">
          <div className="relative flex w-full max-w-md flex-col border-4 border-black bg-zinc-900 p-6 shadow-[10px_10px_0_0_#e8c547] sm:p-8 lg:max-w-none">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Hívás előtt
            </p>
            <p className="mt-3 text-base font-semibold leading-snug text-zinc-300">
              Ha ezeket megmondod, gyorsabban indulhatunk.
            </p>

            <ul className="mt-8 space-y-5">
              {callChecklist.map(({ icon: Icon, title, line }) => (
                <li key={title} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent/80" strokeWidth={1.5} aria-hidden />
                  <div>
                    <p className="font-heading text-sm font-bold uppercase tracking-wide text-white">
                      {title}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-zinc-500">{line}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t-4 border-zinc-800 pt-6">
              <p className="font-heading text-xs font-bold uppercase tracking-widest text-zinc-600">
                Szolgáltatási terület
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-400">{SITE_ADDRESS_SHORT} · 0–24</p>
              <a
                href={SITE_PHONE_TEL}
                className="mt-4 inline-flex font-heading text-sm font-bold uppercase tracking-wide text-accent hover:underline"
              >
                Közvetlen hívás →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
