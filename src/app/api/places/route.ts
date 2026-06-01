import { NextRequest, NextResponse } from "next/server";

type Suggestion = {
  label: string;
  lat: number;
  lon: number;
};

function normalizeLonLat(lon: number, lat: number) {
  const clampedLon = Math.min(180, Math.max(-180, lon));
  const clampedLat = Math.min(90, Math.max(-90, lat));
  return { lon: clampedLon, lat: clampedLat };
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ suggestions: [] as Suggestion[] });

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "6");
  url.searchParams.set("countrycodes", "hu");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("q", q);

  const res = await fetch(url.toString(), {
    headers: {
      "User-Agent": process.env.OSM_USER_AGENT ?? "automentes/1.0 (contact: info@automentes.hu)",
      "Accept-Language": "hu",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return NextResponse.json({ suggestions: [] as Suggestion[] }, { status: 200 });
  }

  const data = (await res.json()) as Array<{ display_name?: string; lat?: string; lon?: string }>;
  const suggestions: Suggestion[] = [];
  for (const item of data ?? []) {
    if (!item?.display_name || !item?.lat || !item?.lon) continue;
    const lat = Number(item.lat);
    const lon = Number(item.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    const norm = normalizeLonLat(lon, lat);
    suggestions.push({ label: item.display_name, lat: norm.lat, lon: norm.lon });
  }

  return NextResponse.json({ suggestions });
}

