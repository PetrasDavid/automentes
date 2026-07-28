# AutoMentés — marketing weboldal

Next.js alapú, egyoldalas autómentő weboldal magyar nyelven. Telefonos és SMS CTA, kapcsolati űrlap, SEO, jogi oldalak.

## Fejlesztés

```bash
npm install
npm run dev
```

Nyisd meg: [http://localhost:3000](http://localhost:3000)

## Élesítés előtt

1. **Környezeti változók** — másold az `.env.example` fájlt `.env.local` néven (opcionális):
   - `NEXT_PUBLIC_SITE_URL` — a végleges domain (pl. `https://automentes.hu`)
   - `RESEND_API_KEY` — éles e-mail küldéshez ([resend.com](https://resend.com))
   - `WEB3FORMS_ACCESS_KEY` — alternatíva ([web3forms.com](https://web3forms.com))
   - `ADMIN_PASSWORD` — erős jelszó az `/admin` felülethez (élesben kötelező)

   **Kapcsolati űrlap:** alapból FormSubmit-et használ, címzett: `SITE_CONTACT_FORM_TO` a `src/lib/site.ts`-ben. Első tesztnél a FormSubmit aktiváló e-mailt küld — kattints az „Activate Form” linkre, utána működik.

2. **Jogi adatok** — `src/lib/site.ts` (név, telephely, e-mail kitöltve; adószám pótolható):
   - `SITE_LEGAL_NAME`, `SITE_LEGAL_ADDRESS`, `SITE_TAX_NUMBER`, `SITE_COMPANY_REG`

3. **Galéria fotók** — tedd a képeket a `public/gallery/` mappába, majd add hozzá az elérési utakat a `GALLERY_ITEMS` tömbhöz ugyanebben a fájlban.

4. **E-mail** — nyilvános és űrlap címzett: `nyistvan76@gmail.com` (`SITE_EMAIL` / `SITE_CONTACT_FORM_TO`).

## Parancsok

| Parancs | Leírás |
|---------|--------|
| `npm run dev` | Fejlesztői szerver |
| `npm run build` | Production build |
| `npm run start` | Production szerver |
| `npm run lint` | ESLint |

## Deploy (Vercel)

1. GitHub repo csatlakoztatása
2. Környezeti változók beállítása a Vercel dashboardon
3. Deploy — a domain automatikusan frissül

## Oldalstruktúra

- `/` — főoldal (Hero, szolgáltatások, galéria, kapcsolat)
- `/adatkezeles` — adatkezelési tájékoztató
- `/aszf` — ÁSZF
- `/cookie` — süti szabályzat
- `/admin` — belső admin (noindex, jelszóval védett)

## Tech

- Next.js 16 (App Router)
- React 19, TypeScript, Tailwind CSS 4
- Lucide ikonok, Recharts (admin)
