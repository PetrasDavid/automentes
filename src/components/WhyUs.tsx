import { Clock, BadgeEuro, Truck, Moon } from "lucide-react";

const usps = [
  {
    title: "Kiérkezés",
    line: "Átlag ~30 perc a zónában.",
    icon: Clock,
  },
  {
    title: "Ár",
    line: "Előre beszéljük meg, nincs sunyi felár.",
    icon: BadgeEuro,
  },
  {
    title: "Flotta",
    line: "Karbantartott járművek, rendes rögzítés.",
    icon: Truck,
  },
  {
    title: "Elérhetőség",
    line: "Hétvége, éjszaka — ugyanaz a szám.",
    icon: Moon,
  },
] as const;

export function WhyUs() {
  return (
    <section
      id="miert-minket"
      className="scroll-mt-20 border-b border-zinc-800/80 bg-[#080809] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading max-w-[14ch] text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">
          Miért minket
        </h2>
        <p className="mt-5 max-w-lg text-base text-zinc-500">
          Nem reklámfilm: ahol lehet, gyorsan odaérünk, és nem titkoljuk, mennyibe kerül.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map(({ title, line, icon: Icon }, i) => (
            <article
              key={title}
              className={
                i > 0 ? "lg:border-l lg:border-zinc-800 lg:pl-8" : ""
              }
            >
              <Icon className="h-5 w-5 text-accent/80" strokeWidth={1.25} aria-hidden />
              <h3 className="font-heading mt-5 text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-snug text-zinc-300">{line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
