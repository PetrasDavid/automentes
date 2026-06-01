"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calculator, Route } from "lucide-react";
import { BASE_FEE_HUF, KM_RATE_HUF } from "@/lib/site";
import { estimateKmPlaceholder, priceFromKm } from "@/lib/pricing";

type PlaceSuggestion = { label: string; lat: number; lon: number };
type PickedPlace = { label: string; lat: number; lon: number } | null;

function splitLabel(label: string): { primary: string; secondary: string } {
  const parts = label.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length <= 1) return { primary: label, secondary: "" };
  return { primary: parts[0]!, secondary: parts.slice(1).join(", ") };
}

function highlightParts(text: string, query: string): Array<{ t: string; hit: boolean }> {
  const q = query.trim();
  if (q.length < 2) return [{ t: text, hit: false }];
  const idx = text.toLocaleLowerCase("hu-HU").indexOf(q.toLocaleLowerCase("hu-HU"));
  if (idx < 0) return [{ t: text, hit: false }];
  const before = text.slice(0, idx);
  const hit = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  const out: Array<{ t: string; hit: boolean }> = [];
  if (before) out.push({ t: before, hit: false });
  if (hit) out.push({ t: hit, hit: true });
  if (after) out.push({ t: after, hit: false });
  return out;
}

function usePlacesAutocomplete(query: string) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<number | null>(null);
  const cacheRef = useRef<Map<string, PlaceSuggestion[]>>(new Map());

  useEffect(() => {
    const q = query.trim();
    setError(null);

    if (debounceRef.current != null) window.clearTimeout(debounceRef.current);
    abortRef.current?.abort();

    if (q.length < 2) {
      setLoading(false);
      setSuggestions([]);
      return;
    }

    const cacheKey = q.toLocaleLowerCase("hu-HU");
    const cached = cacheRef.current.get(cacheKey);
    if (cached) {
      setSuggestions(cached);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = window.setTimeout(async () => {
      const ac = new AbortController();
      abortRef.current = ac;
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(q)}`, { signal: ac.signal });
        if (!res.ok) throw new Error("Nem sikerült a címjavaslatok lekérése.");
        const data = (await res.json()) as { suggestions?: PlaceSuggestion[] };
        const next = Array.isArray(data.suggestions) ? data.suggestions : [];
        cacheRef.current.set(cacheKey, next);
        // Keep cache bounded (simple LRU-ish trimming).
        if (cacheRef.current.size > 50) {
          const firstKey = cacheRef.current.keys().next().value as string | undefined;
          if (firstKey) cacheRef.current.delete(firstKey);
        }
        setSuggestions(next);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setSuggestions([]);
        setError(e instanceof Error ? e.message : "Ismeretlen hiba.");
      } finally {
        setLoading(false);
      }
    }, 110);

    return () => {
      if (debounceRef.current != null) window.clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, [query]);

  return { suggestions, loading, error };
}

export function PriceCalculator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [km, setKm] = useState<number | null>(null);
  const [source, setSource] = useState<"google" | "osrm" | "estimate" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fromPicked, setFromPicked] = useState<PickedPlace>(null);
  const [toPicked, setToPicked] = useState<PickedPlace>(null);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const fromAuto = usePlacesAutocomplete(from);
  const toAuto = usePlacesAutocomplete(to);

  const placeholderPrice = useMemo(() => {
    if (!from.trim() || !to.trim()) return null;
    return priceFromKm(estimateKmPlaceholder(from, to));
  }, [from, to]);

  async function calculate() {
    setError(null);
    if (!from.trim() || !to.trim()) {
      setError("Add meg a Honnan és Hova mezőket.");
      setKm(null);
      setSource(null);
      return;
    }
    setLoading(true);
    try {
      const q = new URLSearchParams({ from: from.trim(), to: to.trim() });
      if (fromPicked) {
        q.set("fromLat", String(fromPicked.lat));
        q.set("fromLon", String(fromPicked.lon));
      }
      if (toPicked) {
        q.set("toLat", String(toPicked.lat));
        q.set("toLon", String(toPicked.lon));
      }
      const res = await fetch(`/api/distance?${q.toString()}`);
      if (!res.ok) {
        const j = (await res.json()) as { error?: string };
        throw new Error(j.error ?? "Hiba történt.");
      }
      const data = (await res.json()) as { km: number; source: "google" | "osrm" | "estimate" };
      setKm(data.km);
      setSource(data.source);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ismeretlen hiba.");
      const fallback = estimateKmPlaceholder(from, to);
      setKm(fallback);
      setSource("estimate");
    } finally {
      setLoading(false);
    }
  }

  const price = km != null ? priceFromKm(km) : null;

  return (
    <section
      id="arkalkulator"
      className="scroll-mt-20 border-y-4 border-black bg-[#0c0c0d] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end gap-4 border-b-4 border-accent pb-6">
          <Calculator className="h-12 w-12 text-accent" strokeWidth={1.5} aria-hidden />
          <div>
            <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              Árkalkulátor
            </h2>
            <p className="mt-2 max-w-2xl text-lg text-zinc-400">
              Becsült díj: alapdíj ({BASE_FEE_HUF.toLocaleString("hu-HU")} Ft) + km × {KM_RATE_HUF.toLocaleString("hu-HU")}{" "}
              Ft. A távolságot a Google Distance Matrix számolja, ha be van állítva a szerveren a kulcs — egyébként
              becsült érték.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-5 lg:col-span-6">
            <label className="block">
              <span className="font-heading text-sm font-bold uppercase tracking-widest text-accent">Honnan</span>
              <div className="relative mt-2">
                <input
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setFromPicked(null);
                    setFromOpen(true);
                  }}
                  onFocus={() => setFromOpen(true)}
                  onBlur={() => window.setTimeout(() => setFromOpen(false), 150)}
                  placeholder="pl. irányítószám / település / utca"
                  autoComplete="off"
                  className="w-full border-4 border-zinc-600 bg-black px-4 py-4 font-sans text-lg text-white placeholder:text-zinc-600 focus:border-accent focus:outline-none"
                />

                {fromOpen && (fromAuto.suggestions.length > 0 || fromAuto.loading || fromAuto.error) ? (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-md border-2 border-zinc-700 bg-zinc-950 shadow-[0_12px_28px_rgba(0,0,0,0.65)]">
                    {fromAuto.loading ? <div className="px-4 py-2 text-xs text-zinc-400">Keresés…</div> : null}
                    {fromAuto.error ? <div className="px-4 py-2 text-xs text-red-400">{fromAuto.error}</div> : null}
                    {fromAuto.suggestions.map((s) => {
                      const { primary, secondary } = splitLabel(s.label);
                      const primaryParts = highlightParts(primary, from);
                      const secondaryParts = secondary ? highlightParts(secondary, from) : [];
                      return (
                        <button
                          key={`${s.lat},${s.lon},${s.label}`}
                          type="button"
                          className="flex w-full items-start gap-3 border-t border-zinc-800 px-4 py-3 text-left hover:bg-zinc-900/70"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setFrom(s.label);
                            setFromPicked(s);
                            setFromOpen(false);
                          }}
                        >
                          <span className="mt-0.5 text-zinc-400" aria-hidden>
                            ⌖
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm text-zinc-100">
                              {primaryParts.map((p, i) =>
                                p.hit ? (
                                  <span key={i} className="font-semibold text-white">
                                    {p.t}
                                  </span>
                                ) : (
                                  <span key={i}>{p.t}</span>
                                ),
                              )}
                            </span>
                            {secondary ? (
                              <span className="mt-0.5 block truncate text-xs text-zinc-400">
                                {secondaryParts.map((p, i) =>
                                  p.hit ? (
                                    <span key={i} className="font-semibold text-zinc-200">
                                      {p.t}
                                    </span>
                                  ) : (
                                    <span key={i}>{p.t}</span>
                                  ),
                                )}
                              </span>
                            ) : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </label>
            <label className="block">
              <span className="font-heading text-sm font-bold uppercase tracking-widest text-accent">Hova</span>
              <div className="relative mt-2">
                <input
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    setToPicked(null);
                    setToOpen(true);
                  }}
                  onFocus={() => setToOpen(true)}
                  onBlur={() => window.setTimeout(() => setToOpen(false), 150)}
                  placeholder="pl. irányítószám / település / utca"
                  autoComplete="off"
                  className="w-full border-4 border-zinc-600 bg-black px-4 py-4 font-sans text-lg text-white placeholder:text-zinc-600 focus:border-accent focus:outline-none"
                />

                {toOpen && (toAuto.suggestions.length > 0 || toAuto.loading || toAuto.error) ? (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-md border-2 border-zinc-700 bg-zinc-950 shadow-[0_12px_28px_rgba(0,0,0,0.65)]">
                    {toAuto.loading ? <div className="px-4 py-2 text-xs text-zinc-400">Keresés…</div> : null}
                    {toAuto.error ? <div className="px-4 py-2 text-xs text-red-400">{toAuto.error}</div> : null}
                    {toAuto.suggestions.map((s) => {
                      const { primary, secondary } = splitLabel(s.label);
                      const primaryParts = highlightParts(primary, to);
                      const secondaryParts = secondary ? highlightParts(secondary, to) : [];
                      return (
                        <button
                          key={`${s.lat},${s.lon},${s.label}`}
                          type="button"
                          className="flex w-full items-start gap-3 border-t border-zinc-800 px-4 py-3 text-left hover:bg-zinc-900/70"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setTo(s.label);
                            setToPicked(s);
                            setToOpen(false);
                          }}
                        >
                          <span className="mt-0.5 text-zinc-400" aria-hidden>
                            ⌖
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm text-zinc-100">
                              {primaryParts.map((p, i) =>
                                p.hit ? (
                                  <span key={i} className="font-semibold text-white">
                                    {p.t}
                                  </span>
                                ) : (
                                  <span key={i}>{p.t}</span>
                                ),
                              )}
                            </span>
                            {secondary ? (
                              <span className="mt-0.5 block truncate text-xs text-zinc-400">
                                {secondaryParts.map((p, i) =>
                                  p.hit ? (
                                    <span key={i} className="font-semibold text-zinc-200">
                                      {p.t}
                                    </span>
                                  ) : (
                                    <span key={i}>{p.t}</span>
                                  ),
                                )}
                              </span>
                            ) : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </label>
            <button
              type="button"
              onClick={calculate}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 border-4 border-black bg-accent py-4 font-heading text-lg font-bold uppercase tracking-wide text-black shadow-[6px_6px_0_0_#000] hover:bg-[#f0d060] disabled:opacity-60 sm:w-auto sm:min-w-[220px] sm:px-10"
            >
              <Route className="h-5 w-5" aria-hidden />
              {loading ? "Számolás…" : "Becsült ár számolása"}
            </button>
            {error ? <p className="text-sm font-semibold text-red-400">{error}</p> : null}
          </div>

          <div className="border-4 border-black bg-zinc-900 p-6 shadow-[8px_8px_0_0_#e8c547] lg:col-span-6">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Eredmény</p>
            {price != null ? (
              <>
                <p className="mt-4 font-heading text-4xl font-bold tabular-nums text-accent sm:text-5xl">
                  ~{price.toLocaleString("hu-HU")} Ft
                </p>
                <p className="mt-3 text-base text-zinc-400">
                  Becsült távolság:{" "}
                  <span className="font-semibold text-white">{km} km</span>
                  {source === "google" ? (
                    <span className="ml-2 text-accent">(Google)</span>
                  ) : source === "osrm" ? (
                    <span className="ml-2 text-accent">(útvonal)</span>
                  ) : (
                    <span className="ml-2 text-zinc-500">(becslés)</span>
                  )}
                </p>
              </>
            ) : (
              <p className="mt-6 text-lg text-zinc-500">
                Azonnali tájékoztató: kitöltött címekkel a háttérben számolt becslés{" "}
                {placeholderPrice != null ? (
                  <>
                    kb. <span className="font-heading text-2xl text-white">{placeholderPrice.toLocaleString("hu-HU")} Ft</span>
                  </>
                ) : (
                  "— add meg a Honnan / Hova mezőket."
                )}
              </p>
            )}
            <p className="mt-6 border-t border-zinc-800 pt-4 text-sm leading-relaxed text-zinc-600">
              A végleges díj mindig egyeztetés után érvényes. Defekt, baleset, járműtípus és várakozás módosíthatja az
              árat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
