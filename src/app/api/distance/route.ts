import { NextRequest, NextResponse } from "next/server";
import { estimateKmPlaceholder } from "@/lib/pricing";

type LonLat = { lon: number; lat: number };

function parseNumber(s: string | null): number | null {
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function clampCoord(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function normalizeLonLat(lon: number, lat: number): LonLat {
  return { lon: clampCoord(lon, -180, 180), lat: clampCoord(lat, -90, 90) };
}

async function geocodeHungary(q: string): Promise<LonLat | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "hu");
  url.searchParams.set("addressdetails", "0");
  url.searchParams.set("q", q);

  const res = await fetch(url.toString(), {
    headers: {
      // Nominatim usage policy: provide a valid UA; add contact email if you have one.
      "User-Agent": process.env.OSM_USER_AGENT ?? "automentes/1.0 (contact: info@automentes.hu)",
      "Accept-Language": "hu",
    },
    // Query is user-specific; avoid caching surprises.
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as Array<{ lat?: string; lon?: string }>;
  const first = data?.[0];
  if (!first?.lat || !first?.lon) return null;
  const lat = Number(first.lat);
  const lon = Number(first.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return normalizeLonLat(lon, lat);
}

async function routeKmOSRM(from: LonLat, to: LonLat): Promise<number | null> {
  const base = process.env.OSRM_BASE_URL ?? "https://router.project-osrm.org";
  const url = new URL(`${base.replace(/\/+$/, "")}/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}`);
  url.searchParams.set("overview", "false");
  url.searchParams.set("alternatives", "false");
  url.searchParams.set("steps", "false");

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return null;
  const data = (await res.json()) as { routes?: Array<{ distance?: number }> };
  const meters = data?.routes?.[0]?.distance;
  if (typeof meters !== "number" || !Number.isFinite(meters) || meters <= 0) return null;
  const km = Math.max(1, Math.round(meters / 1000));
  return km;
}

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from")?.trim() ?? "";
  const to = req.nextUrl.searchParams.get("to")?.trim() ?? "";
  if (!from || !to) {
    return NextResponse.json({ error: "Honnan és Hova megadása kötelező." }, { status: 400 });
  }

  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (key) {
    try {
      const u = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");
      u.searchParams.set("origins", from);
      u.searchParams.set("destinations", to);
      u.searchParams.set("key", key);
      const res = await fetch(u.toString(), { next: { revalidate: 3600 } });
      const data = (await res.json()) as {
        rows?: Array<{ elements?: Array<{ status?: string; distance?: { value?: number } }> }>;
      };
      const meters = data.rows?.[0]?.elements?.[0];
      if (meters?.status === "OK" && typeof meters.distance?.value === "number") {
        const km = Math.max(1, Math.round(meters.distance.value / 1000));
        return NextResponse.json({ km, source: "google" as const });
      }
    } catch {
      /* fallback */
    }
  }

  // If the client already selected autocomplete suggestions, it can send coords too.
  const fromLat = parseNumber(req.nextUrl.searchParams.get("fromLat"));
  const fromLon = parseNumber(req.nextUrl.searchParams.get("fromLon"));
  const toLat = parseNumber(req.nextUrl.searchParams.get("toLat"));
  const toLon = parseNumber(req.nextUrl.searchParams.get("toLon"));

  try {
    const fromCoord =
      fromLat != null && fromLon != null ? normalizeLonLat(fromLon, fromLat) : await geocodeHungary(from);
    const toCoord = toLat != null && toLon != null ? normalizeLonLat(toLon, toLat) : await geocodeHungary(to);

    if (fromCoord && toCoord) {
      const km = await routeKmOSRM(fromCoord, toCoord);
      if (km != null) return NextResponse.json({ km, source: "osrm" as const });
    }
  } catch {
    /* fallback */
  }

  const km = estimateKmPlaceholder(from, to);
  return NextResponse.json({ km, source: "estimate" as const });
}
