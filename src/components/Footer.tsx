import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_TAX_NUMBER,
  siteLegalAddress,
  siteLegalEntity,
} from "@/lib/site";

export function Footer() {
  const entity = siteLegalEntity();
  const address = siteLegalAddress();

  return (
    <footer className="border-t border-zinc-800 bg-[#080809] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div>
            <p className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
              Auto<span className="text-accent">Mentés</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-600">
              Autómentés, bikázás, kerék — Érd, Budapest és Pest megye, 0–24.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-zinc-700">
              {entity}
              {SITE_TAX_NUMBER ? ` · Adószám: ${SITE_TAX_NUMBER}` : null}
              <br />
              {address}
              <br />
              {SITE_PHONE_DISPLAY} · {SITE_EMAIL}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                Oldal
              </p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>
                  <a href="/#szolgaltatasok" className="hover:text-white">
                    Szolgáltatás
                  </a>
                </li>
                <li>
                  <a href="/#miert-minket" className="hover:text-white">
                    Rólunk
                  </a>
                </li>
                <li>
                  <a href="/#galeria" className="hover:text-white">
                    Munkák
                  </a>
                </li>
                <li>
                  <a href="/#kapcsolat" className="hover:text-white">
                    Kapcsolat
                  </a>
                </li>
                <li>
                  <a href={SITE_PHONE_TEL} className="text-accent hover:underline">
                    Közvetlen hívás
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
                  <a href="/adatkezeles" className="hover:text-zinc-300">
                    Adatkezelés
                  </a>
                </li>
                <li>
                  <a href="/aszf" className="hover:text-zinc-300">
                    ÁSZF
                  </a>
                </li>
                <li>
                  <a href="/cookie" className="hover:text-zinc-300">
                    Cookie
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-zinc-900 pt-8 text-center text-[11px] text-zinc-700">
          © {new Date().getFullYear()} {SITE_NAME} — minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}
