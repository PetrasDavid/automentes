import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie (süti) szabályzat",
  robots: { index: true, follow: true },
};

export default function CookiePage() {
  return (
    <LegalLayout title="Cookie (süti) szabályzat">
      <p>
        A {SITE_NAME} weboldal minimális technikai megoldásokat használ. Az alábbiakban
        összefoglaljuk, milyen sütikkel találkozhat.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">
        1. Szükséges sütik
      </h2>
      <p>
        A nyilvános marketing oldal nem helyez el marketing- vagy analitikai sütit.
        Az admin felület (<code className="text-zinc-300">/admin</code>) bejelentkezéshez
        munkamenet-sütit használ — ez kizárólag a belső kezelőfelület működéséhez
        szükséges, és nem érinti a látogatókat.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">
        2. Harmadik felek
      </h2>
      <p>
        A kapcsolati űrlap küldésekor az üzenet e-mailben érkezik a szolgáltatóhoz
        (FormSubmit / Resend / Web3Forms). A térképes beágyazás (Google Maps) a Google
        saját sütijeit használhatja — ezekre a Google adatvédelmi szabályzata vonatkozik.
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">
        3. Sütik kezelése
      </h2>
      <p>
        A böngésző beállításaiban korlátozhatja vagy törölheti a sütiket. A szükséges
        sütik letiltása befolyásolhatja az oldal egyes funkcióit (pl. admin bejelentkezés).
      </p>

      <h2 className="font-heading text-lg font-bold uppercase text-zinc-200">4. Kapcsolat</h2>
      <p>
        Kérdés esetén írjon:{" "}
        <a href={`mailto:${SITE_EMAIL}`} className="text-accent hover:underline">
          {SITE_EMAIL}
        </a>
      </p>

      <p className="border-t border-zinc-800 pt-6 text-zinc-500">
        © {new Date().getFullYear()} {SITE_NAME}
      </p>
    </LegalLayout>
  );
}
