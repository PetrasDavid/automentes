/** Nyilvános webcím — élesben állítsd be: NEXT_PUBLIC_SITE_URL */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://automentes.vercel.app";

export const SITE_NAME = "AutoMentés";
export const SITE_TAGLINE = "Gyors autómentés 0–24";

export const SITE_PHONE_DISPLAY = "06 20 324 9909";
export const SITE_PHONE_TEL = "tel:+36203249909";
/** SMS linkekhez (nemzetközi formátum, szóköz nélkül). */
export const SITE_PHONE_SMS = "+36203249909";
export const SITE_EMAIL = "nyistvan76@gmail.com";

/** Kapcsolati űrlap értesítések címzettje. */
export const SITE_CONTACT_FORM_TO = "nyistvan76@gmail.com";

/** Szolgáltatási terület — nem ügyfélforgalmi iroda. Telephely: Érd. */
export const SITE_ADDRESS_SHORT = "Érd, Budapest és Pest megye";
export const SITE_ADDRESS_DETAIL =
  "Telephelyünk Érden van — kiérkezünk a helyszínre a fővárosban és az agglomerációban, nincs ügyfélforgalmi iroda.";

/** Google Maps beágyazás — Érd központ, tágabb szolgáltatási terület. */
export const SITE_MAP_EMBED =
  "https://maps.google.com/maps?q=%C3%89rd%2C+Magyarorsz%C3%A1g&z=10&output=embed";

/** Érd GPS — JSON-LD geo. */
export const SITE_GEO = { lat: 47.3918, lng: 18.9132 } as const;

/**
 * Autópályák / főutak — helyi SEO (látható tartalom + schema).
 * Prioritás: Érd közelében lévő, nagy forgalmú útvonalak.
 */
export const SERVICE_HIGHWAYS = [
  {
    name: "M0",
    desc: "Budapest körgyűrű — Érdről percek alatt elérhető, gyakori leállások a déli és nyugati szakaszon.",
  },
  {
    name: "M7",
    desc: "Érd mellett megy el a Balaton felé — nyári forgalom, balesetek, defekt a lehajtóknál.",
  },
  {
    name: "M1",
    desc: "Budaörs / Törökbálint csomópontoktól nyugatra — nemzetközi és belföldi mentés.",
  },
  {
    name: "M6",
    desc: "Érd–Százhalombatta térségtől délre — Pécs irány, ipari forgalom.",
  },
  {
    name: "6-os út",
    desc: "Érd – Százhalombatta – Ercsi tengely — agglomerációs főút, mindennapos mozgás.",
  },
  {
    name: "7-es út",
    desc: "Érd – Martonvásár – Székesfehérvár irány — párhuzamos az M7-tel.",
  },
] as const;

/**
 * Városok és zónák — Érd telephely körül, nagy keresési volumennel.
 * A sorrend: otthoni bázis → szomszédos települések → főváros → távolabbi, de gyakori célok.
 */
export const SERVICE_CITIES = [
  {
    name: "Érd",
    desc: "Telephelyünk itt van — a leggyorsabb kiérkezés Érden és a belvárosi / parkvárosi részeken.",
  },
  {
    name: "Diósd",
    desc: "Érd szomszédja — perceken belüli mentés, M0 / 7-es út csatlakozás.",
  },
  {
    name: "Tárnok",
    desc: "Nyugat–Érd agglomeráció — lakóövezet és országút, gyors kiszállás.",
  },
  {
    name: "Százhalombatta",
    desc: "Erőmű és iparterület mellett — gyakori hívások, 6-os út és M6 közelség.",
  },
  {
    name: "Halásztelek",
    desc: "Csepel-sziget északi része — Érdről rövid út, családi házas övezet.",
  },
  {
    name: "Szigetszentmiklós",
    desc: "Nagy agglomerációs város — Csepel-sziget, M0 déli szakasz, éjjel-nappal.",
  },
  {
    name: "Szigethalom",
    desc: "Szigetszentmiklós szomszédja — lakóövezet, gyors helyi mentés.",
  },
  {
    name: "Tököl",
    desc: "Csepel-sziget — repülőtér környéke és település belseje.",
  },
  {
    name: "Budaörs",
    desc: "Nyugati kapu Budapest felé — M1 / M7 / M0 csomópontok, plázák, irodaparkok.",
  },
  {
    name: "Törökbálint",
    desc: "Budaörs mellett — M0 / M1 lehajtók, ipari parkok, lakóparkok.",
  },
  {
    name: "Biatorbágy",
    desc: "M1 menti növekvő település — Érdről jól elérhető nyugati zóna.",
  },
  {
    name: "Sóskút",
    desc: "Érd–Tárnok vonal — kisebb település, gyors helyi kiszállás.",
  },
  {
    name: "Martonvásár",
    desc: "M7 / 7-es út — Érd és Székesfehérvár között, átmenő forgalom.",
  },
  {
    name: "Ercsi",
    desc: "Duna-parti település Érdtől délre — 6-os út, gyors kiérkezés.",
  },
  {
    name: "Dunaharaszti",
    desc: "Pest déli agglomeráció — M0, Soroksár irány, gyakori leállások.",
  },
  {
    name: "Budapest XXII. (Budafok–Tétény)",
    desc: "Érdhez legközelebbi kerület — Budatétény, Nagytétény, gyors belvárosi csatlakozás.",
  },
  {
    name: "Budapest XI. (Újbuda)",
    desc: "Kelenföld, Gazdagrét, Sasad — Érdről gyakori útvonal a fővárosba.",
  },
  {
    name: "Budapest XXI. (Csepel)",
    desc: "Csepel-sziget — Érd / Halásztelek felől rövid, ismert útvonal.",
  },
  {
    name: "Budapest",
    desc: "Teljes főváros — kerületek, hidak, körutak, 0–24 diszpécser.",
  },
  {
    name: "Vecsés",
    desc: "Liszt Ferenc repülőtér környéke — M0 keleti szakasz, tranzitforgalom.",
  },
  {
    name: "Gyál",
    desc: "Pest délkeleti agglomeráció — M0 / 5-ös út, gyors csatlakozás.",
  },
  {
    name: "Gárdony / Velence",
    desc: "Velencei-tó — nyári forgalom, M7 menti mentések.",
  },
  {
    name: "Székesfehérvár",
    desc: "M7 menti nagyváros — hosszabb táv, de gyakori átmenő megállások.",
  },
  {
    name: "Dunaújváros",
    desc: "M6 közelében — iparterület és országút, dél-pesti irány.",
  },
] as const;
/**
 * Jogi adatok (egyéni vállalkozó — nincs cégnév / cégjegyzékszám).
 * Adószámot később lehet pótolni, ha rendelkezésre áll.
 */
export const SITE_LEGAL_NAME = "Nyárs István egyéni vállalkozó";
export const SITE_LEGAL_ADDRESS = "2030 Érd, Kármentő utca 14.";
export const SITE_TAX_NUMBER = "";
export const SITE_COMPANY_REG = "";

export function siteLegalEntity(): string {
  return SITE_LEGAL_NAME.trim() || SITE_NAME;
}

export function siteLegalAddress(): string {
  return SITE_LEGAL_ADDRESS.trim() || SITE_ADDRESS_SHORT;
}

/** Galéria — ha van kép a public/gallery/ mappában, add hozzá az elérési utat. */
export const GALLERY_ITEMS = [
  { label: "Személygépkocsi mentés", image: null as string | null },
  { label: "Éjszakai mentés", image: null },
  { label: "Bikázás", image: null },
  { label: "Kerékcsere", image: null },
  { label: "Autópálya", image: null },
] as const;
