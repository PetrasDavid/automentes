import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_TAX_NUMBER,
  siteLegalAddress,
  siteLegalEntity,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  robots: { index: true, follow: true },
};

export default function AdatkezelesPage() {
  const entity = siteLegalEntity();
  const address = siteLegalAddress();

  return (
    <LegalLayout title="Adatkezelési tájékoztató">
      <p>
        <strong>Hatályos:</strong> {new Date().getFullYear()}. január 1-től
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">1. Adatkezelő</h2>
      <p>
        Adatkezelő: <strong>{entity}</strong>
        <br />
        Telephely: {address}
        {SITE_TAX_NUMBER ? (
          <>
            <br />
            Adószám: {SITE_TAX_NUMBER}
          </>
        ) : null}
        <br />
        E-mail:{" "}
        <a href={`mailto:${SITE_EMAIL}`} className="text-accent hover:underline">
          {SITE_EMAIL}
        </a>
        <br />
        Telefon: {SITE_PHONE_DISPLAY}
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">
        2. Kezelt adatok köre
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Kapcsolati űrlap: név, telefonszám, üzenet szövege.</li>
        <li>Telefonos / SMS megkeresés: hívó szám, helyszín (ha megadja).</li>
        <li>Technikai napló: IP-cím, böngésző típusa (tárhelyszolgáltató naplózása).</li>
      </ul>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">
        3. Adatkezelés célja és jogalapja
      </h2>
      <p>
        Az adatokat kizárólag megkeresés kezelésére, ajánlatadásra és szolgáltatás
        teljesítésére használjuk. Jogalap: az Ön hozzájárulása (űrlap kitöltése) és a
        szerződés előkészítése / teljesítése (GDPR 6. cikk (1) a) és b) pont).
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">4. Megőrzési idő</h2>
      <p>
        Megkeresések adatait legfeljebb 2 évig őrizzük, hacsak jogszabály hosszabb
        megőrzést nem ír elő. Lezárult ügyek esetén töröljük vagy anonimizáljuk az
        adatokat.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">
        5. Adattovábbítás
      </h2>
      <p>
        Adatokat harmadik félnek csak szolgáltatás teljesítéséhez szükséges mértékben
        továbbítunk (pl. űrlap-feldolgozó, tárhely). Nem értékesítjük az adatokat.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">6. Az Ön jogai</h2>
      <p>
        Ön kérhet tájékoztatást, helyesbítést, törlést, adatkezelés korlátozását,
        tiltakozhat, valamint panaszt tehet a Nemzeti Adatvédelmi és Információszabadság
        Hatóságnál (naih.hu). Kérését az {SITE_EMAIL} címre küldheti.
      </p>

      <p className="border-t border-zinc-800 pt-6 text-zinc-500">
        © {new Date().getFullYear()} {SITE_NAME}
      </p>
    </LegalLayout>
  );
}
