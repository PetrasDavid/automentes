import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_TAX_NUMBER,
  SITE_COMPANY_REG,
  siteLegalAddress,
  siteLegalEntity,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Általános Szerződési Feltételek",
  robots: { index: true, follow: true },
};

export default function AszfPage() {
  const entity = siteLegalEntity();
  const address = siteLegalAddress();

  return (
    <LegalLayout title="Általános Szerződési Feltételek (ÁSZF)">
      <p>
        Jelen dokumentum a <strong>{entity}</strong> autómentő és segélyszolgálat
        igénybevételének általános feltételeit tartalmazza.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">1. Szolgáltató</h2>
      <p>
        Név: {entity}
        <br />
        Telephely: {address}
        {SITE_TAX_NUMBER ? (
          <>
            <br />
            Adószám: {SITE_TAX_NUMBER}
          </>
        ) : null}
        {SITE_COMPANY_REG ? (
          <>
            <br />
            Cégjegyzékszám: {SITE_COMPANY_REG}
          </>
        ) : null}
        <br />
        E-mail: {SITE_EMAIL}
        <br />
        Telefon: {SITE_PHONE_DISPLAY} (0–24)
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">2. Szolgáltatások</h2>
      <p>
        Személygépkocsi mentés, bikázás és kerékcsere Érden, Budapesten és Pest megyében.
        A pontos szolgáltatás a helyszíni egyeztetés alapján kerül megállapításra.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">3. Megrendelés</h2>
      <p>
        Megrendelés telefonon vagy írásban (e-mail, űrlap) történik. A szerződés a
        szolgáltató visszaigazolásával vagy a mentőgépjármű kiindulásával jön létre.
        Sürgős esetben a telefonos megállapodás minősül szerződésnek.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">4. Díjazás</h2>
      <p>
        A szolgáltatás díja a távolság, időpont, jármű típusa és a helyszíni
        körülmények függvénye. A végleges díjat kiérkezés előtt vagy a helyszínen
        egyeztetjük. Az árak forintban értendők, az ÁFA szabályai szerint.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">5. Fizetés</h2>
      <p>
        Fizetés a szolgáltatás teljesítése után, készpénzben vagy az egyeztetett
        módon (átutalás, bankkártya — ha elérhető).
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">
        6. Lemondás, elállás
      </h2>
      <p>
        Ha a megrendelő lemondja a szolgáltatást a mentőgépjármű kiindulása után,
        kiszámlázható a ténylegesen felmerült költség (pl. üres futás). Fogyasztói
        szerződés esetén az elállás szabályai a hatályos jogszabályok szerint érvényesek.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">7. Felelősség</h2>
      <p>
        A szolgáltató a szakszerű teljesítésért felel. A járműben hagyott értéktárgyakért
        felelősséget nem vállalunk — kérjük, vigye magával. Kár esetén a Ptk. rendelkezései
        az irányadók.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">
        8. Vitarendezés
      </h2>
      <p>
        Panasz esetén először keressen minket: {SITE_EMAIL}. Fogyasztói jogvita esetén
        a lakóhelye szerinti békéltető testülethez fordulhat.
      </p>

      <p className="border-t border-zinc-800 pt-6 text-zinc-500">
        © {new Date().getFullYear()} {SITE_NAME}
      </p>
    </LegalLayout>
  );
}
