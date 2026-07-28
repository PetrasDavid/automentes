import { Car, Battery, CircleDot } from "lucide-react";

const main = {
  title: "Személygépkocsi mentés",
  desc: "Roncsmentő vagy plató — ahogy a helyzet kéri. A járművet rögzítjük, nem „vonszoljuk”.",
  icon: Car,
} as const;

const rest = [
  {
    title: "Bikázás",
    desc: "Akkumulátor indítás a helyszínen.",
    icon: Battery,
  },
  {
    title: "Kerékcsere",
    desc: "Defektnél pótkerék, ha van nála.",
    icon: CircleDot,
  },
] as const;

export function Services() {
  const MainIcon = main.icon;

  return (
    <section
      id="szolgaltatasok"
      className="scroll-mt-20 border-b border-zinc-800/80 bg-[#0c0c0e] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 border-b border-zinc-800 pb-8 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-heading text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              Amit csinálunk
            </h2>
            <p className="mt-3 max-w-md text-base text-zinc-500">
              Egy helyről intézhető, nem kell öt külön számot tárcsázni.
            </p>
          </div>
          <p className="max-w-xs text-sm leading-snug text-zinc-600">
            Az árat előre egyeztetjük — így nincs „véletlenül” duplázódó tétel.
          </p>
        </div>

        <div className="mt-10 border border-zinc-800">
          <div className="grid gap-6 border-b border-zinc-800 bg-zinc-950/50 p-6 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-8">
            <MainIcon
              className="h-9 w-9 text-accent sm:h-11 sm:w-11"
              strokeWidth={1.15}
              aria-hidden
            />
            <div>
              <h3 className="font-heading text-xl font-semibold uppercase tracking-wide text-white sm:text-2xl">
                {main.title}
              </h3>
              <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-zinc-500">
                {main.desc}
              </p>
            </div>
          </div>

          <ul className="grid sm:grid-cols-2">
            {rest.map(({ title, desc, icon: Icon }, i) => (
              <li
                key={title}
                className={`flex gap-4 p-6 sm:p-7 ${
                  i % 2 === 0 ? "border-b border-zinc-800 sm:border-b-0 sm:border-r" : ""
                }`}
              >
                <Icon
                  className="mt-0.5 h-6 w-6 shrink-0 text-zinc-600"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <div>
                  <h3 className="font-heading text-[15px] font-semibold uppercase tracking-wide text-zinc-200">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
