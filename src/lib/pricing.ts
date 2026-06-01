import { BASE_FEE_HUF, KM_RATE_HUF } from "@/lib/site";

export function priceFromKm(km: number): number {
  return Math.round(BASE_FEE_HUF + km * KM_RATE_HUF);
}

/** Determinisztikus „becsült” távolság két szöveg alapján (ha nincs Google API). */
export function estimateKmPlaceholder(from: string, to: string): number {
  const s = `${from.trim().toLowerCase()}|${to.trim().toLowerCase()}`;
  if (!s || s === "|") return 25;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const positive = h >>> 0;
  return 6 + (positive % 120);
}
