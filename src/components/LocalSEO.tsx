const HIGHWAYS = [
  { name: "M0", desc: "Budapest körgyűrű — gyors kiszállás a főváros környékén." },
  { name: "M1", desc: "Budapest – Győr – Hegyeshalom irány, nemzetközi és belföldi mentés." },
  { name: "M7", desc: "Balaton felé és dél felé — nyári forgalom és leállások." },
  { name: "M5", desc: "Délkelet felé — hosszabb táv, tranzit és belföldi útvonalak." },
  { name: "M6", desc: "Délnyugat — Pécs irány, autópálya és lehajtók." },
] as const;

const CITIES = [
  { name: "Budapest", desc: "Minden kerület, hidak, körutak — 0–24 diszpécser." },
  { name: "Érd", desc: "Budapest agglomeráció — gyors csatlakozás az M7 / M0 felé." },
  { name: "Székesfehérvár", desc: "M7 menti nagyváros — gyakori megállások és átmenő forgalom." },
  { name: "Dunaújváros", desc: "M6 közelében — iparterület és országút is." },
  { name: "Szentendre", desc: "Észak-Buda környéke — keskeny utcák és főút is." },
  { name: "Vecsés", desc: "Liszt Ferenc repülőtér környéke — M0 / gyorsforgalmi csomópontok." },
] as const;

export function LocalSEO() {
  return (
    <section id="helyi-seo" className="border-t border-zinc-800 bg-[#080809] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          Mentés a környéken
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-zinc-500">
          Autópályák és városok, ahol gyakran hívják a szolgáltatást — gyors kiérkezés, ismert útvonalak.
        </p>

        <div className="mt-10">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-accent">Autópályák</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HIGHWAYS.map((item) => (
              <li
                key={item.name}
                className="border-4 border-zinc-800 bg-black p-5 transition-colors hover:border-accent"
              >
                <p className="font-heading text-2xl font-bold uppercase text-white">{item.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-accent">Városok és zónák</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((item) => (
              <li
                key={item.name}
                className="border-4 border-zinc-800 bg-zinc-950 p-5 transition-colors hover:border-accent"
              >
                <p className="font-heading text-xl font-bold uppercase text-white">{item.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
