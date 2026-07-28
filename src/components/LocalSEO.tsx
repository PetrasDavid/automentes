import { SERVICE_CITIES, SERVICE_HIGHWAYS } from "@/lib/site";

export function LocalSEO() {
  return (
    <section id="helyi-seo" className="border-t border-zinc-800 bg-[#080809] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          Autómentés Érden és környékén
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-zinc-500">
          Telephelyünk Érden van — innen érjük el gyorsan Budapestet, a dél–nyugati
          agglomerációt és a környező autópályákat. Ha lerobbantál Érden, Diósdon,
          Százhalombattán, Budaörsön vagy a fővárosban, hívd a számot.
        </p>

        <div className="mt-10">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-accent">
            Autópályák és főutak
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_HIGHWAYS.map((item) => (
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
          <p className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-accent">
            Városok és zónák
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CITIES.map((item) => (
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
