import { SITE_PHONE_TEL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#080809] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div>
            <p className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
              Auto<span className="text-accent">Mentés</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-600">
              Autómentés, bikázás, kerék. Ha nem tudjuk vállalni, megmondjuk egyből.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                Oldal
              </p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>
                  <a href="#szolgaltatasok" className="hover:text-white">
                    Szolgáltatás
                  </a>
                </li>
                <li>
                  <a href="#miert-minket" className="hover:text-white">
                    Rólunk
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="hover:text-white">
                    Munkák
                  </a>
                </li>
                <li>
                  <a href="#kapcsolat" className="hover:text-white">
                    Kapcsolat
                  </a>
                </li>
                <li>
                  <a href={SITE_PHONE_TEL} className="text-accent hover:underline">
                    Közvetlen hívás
                  </a>
                </li>
                <li>
                  <a href="/admin" className="hover:text-white">
                    Admin
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                Jogi
              </p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-500">
                <li>
                  <a href="#" className="hover:text-zinc-300">
                    Adatkezelés
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-300">
                    ÁSZF
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-zinc-300">
                    Cookie
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-zinc-900 pt-8 text-center text-[11px] text-zinc-700">
          © {new Date().getFullYear()} AutoMentés — tájékoztató jellegű szöveg; a pontos feltételek egyeztetéskor.
        </p>
      </div>
    </footer>
  );
}
