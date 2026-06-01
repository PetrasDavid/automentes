"use client";

import { useMemo, useState, useEffect, useTransition } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CloudSun, Fuel, LogOut, PhoneCall, TrendingUp } from "lucide-react";
import callsData from "@/data/calls-by-napszak.json";
import { logoutAdmin } from "@/app/admin/actions";

type CallRow = { period: string; calls: number };

const BUDAPEST_LAT = 47.4979;
const BUDAPEST_LON = 19.0402;

export function AdminDashboard() {
  const [pending, startTransition] = useTransition();
  const chartData = callsData as CallRow[];

  const [revenue, setRevenue] = useState("");
  const [kmDay, setKmDay] = useState("");
  const [fuelCost, setFuelCost] = useState("");

  const revenueN = Number(revenue.replace(/\s/g, "").replace(",", ".")) || 0;
  const fuelN = Number(fuelCost.replace(/\s/g, "").replace(",", ".")) || 0;
  const kmN = Number(kmDay.replace(/\s/g, "").replace(",", ".")) || 0;

  const profit = useMemo(() => revenueN - fuelN, [revenueN, fuelN]);

  const [temp, setTemp] = useState<number | null>(null);
  const [weatherErr, setWeatherErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const u = new URL("https://api.open-meteo.com/v1/forecast");
        u.searchParams.set("latitude", String(BUDAPEST_LAT));
        u.searchParams.set("longitude", String(BUDAPEST_LON));
        u.searchParams.set("current", "temperature_2m");
        const res = await fetch(u.toString());
        const j = (await res.json()) as { current?: { temperature_2m?: number } };
        const t = j.current?.temperature_2m;
        if (!cancelled && typeof t === "number") setTemp(t);
      } catch {
        if (!cancelled) setWeatherErr("Időjárás nem elérhető.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const extremeWeather = temp != null && (temp < 0 || temp > 30);

  function logout() {
    startTransition(async () => {
      await logoutAdmin();
      window.location.href = "/admin";
    });
  }

  return (
    <div className="min-h-screen bg-black pb-24 text-white">
      <header className="border-b-4 border-accent bg-zinc-950 px-4 py-6 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent">AutoMentés</p>
            <h1 className="font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl">Admin irányítópult</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            disabled={pending}
            className="inline-flex items-center gap-2 border-4 border-white bg-black px-5 py-3 font-heading text-sm font-black uppercase tracking-wide text-white hover:bg-zinc-900 disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" aria-hidden />
            Kilépés
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-8">
        {extremeWeather ? (
          <div
            role="status"
            className="border-4 border-black bg-accent px-6 py-5 text-black shadow-[8px_8px_0_0_#000]"
          >
            <p className="font-heading text-xl font-black uppercase leading-snug sm:text-2xl">
              Várhatóan megnövekedett hívásszám az extrém időjárás miatt!
            </p>
            <p className="mt-2 text-lg font-bold">
              Jelenlegi hőmérséklet (Budapest): {temp?.toFixed(1)} °C
            </p>
          </div>
        ) : temp != null ? (
          <div className="flex flex-wrap items-center gap-3 border-4 border-zinc-700 bg-zinc-950 px-5 py-4 text-lg">
            <CloudSun className="h-8 w-8 text-accent" aria-hidden />
            <span className="font-heading font-bold uppercase text-zinc-400">Időjárás</span>
            <span className="font-heading text-2xl font-black tabular-nums text-white">{temp.toFixed(1)} °C</span>
            <span className="text-zinc-500">— nincs extrém riasztás</span>
          </div>
        ) : weatherErr ? (
          <p className="text-zinc-500">{weatherErr}</p>
        ) : (
          <p className="text-zinc-500">Időjárás betöltése…</p>
        )}

        <section className="border-4 border-zinc-800 bg-zinc-950 p-6 sm:p-8">
          <div className="flex items-center gap-3 border-b-4 border-accent pb-4">
            <PhoneCall className="h-10 w-10 text-accent" aria-hidden />
            <div>
              <h2 className="font-heading text-2xl font-black uppercase sm:text-3xl">Hívások napszak szerint</h2>
              <p className="text-base text-zinc-500">Szimulált adat — JSON / belső állapot helyettesíthető valós naplóval.</p>
            </div>
          </div>
          <div className="mt-8 h-[320px] w-full min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#333" />
                <XAxis
                  dataKey="period"
                  tick={{ fill: "#a1a1aa", fontSize: 12, fontWeight: 700 }}
                  interval={0}
                  angle={-12}
                  textAnchor="end"
                  height={70}
                />
                <YAxis tick={{ fill: "#a1a1aa", fontSize: 14, fontWeight: 700 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "#09090b",
                    border: "4px solid #e8c547",
                    borderRadius: 0,
                    fontWeight: 700,
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Bar dataKey="calls" name="Hívások" fill="#e8c547" radius={[0, 0, 0, 0]} maxBarSize={56} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="border-4 border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b-4 border-accent pb-4">
              <Fuel className="h-10 w-10 text-accent" aria-hidden />
              <h2 className="font-heading text-2xl font-black uppercase sm:text-3xl">Üzemanyag vs bevétel</h2>
            </div>
            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-accent">Napi bevétel (Ft)</span>
                <input
                  inputMode="decimal"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  className="mt-2 w-full border-4 border-zinc-700 bg-black px-4 py-4 text-xl font-bold tabular-nums text-white focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-accent">Megtett km (nap)</span>
                <input
                  inputMode="decimal"
                  value={kmDay}
                  onChange={(e) => setKmDay(e.target.value)}
                  className="mt-2 w-full border-4 border-zinc-700 bg-black px-4 py-4 text-xl font-bold tabular-nums text-white focus:border-accent focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-accent">Üzemanyag költség (Ft)</span>
                <input
                  inputMode="decimal"
                  value={fuelCost}
                  onChange={(e) => setFuelCost(e.target.value)}
                  className="mt-2 w-full border-4 border-zinc-700 bg-black px-4 py-4 text-xl font-bold tabular-nums text-white focus:border-accent focus:outline-none"
                />
              </label>
            </form>
          </div>

          <div className="flex flex-col justify-center border-4 border-black bg-accent p-6 text-black shadow-[10px_10px_0_0_#fff] sm:p-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-12 w-12" aria-hidden />
              <p className="font-heading text-sm font-black uppercase tracking-widest">Napi profit (becslés)</p>
            </div>
            <p className="mt-6 font-heading text-4xl font-black tabular-nums sm:text-5xl">
              {profit.toLocaleString("hu-HU")} Ft
            </p>
            <p className="mt-4 text-lg font-bold leading-snug">
              Számítás: napi bevétel − üzemanyag költség. A km csak tájékoztató:{" "}
              {kmN > 0 ? (
                <>
                  üzemanyag / km ≈ <span className="tabular-nums">{(fuelN / kmN).toLocaleString("hu-HU", { maximumFractionDigits: 0 })} Ft</span>
                </>
              ) : (
                "adj meg km-t az arányhoz."
              )}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
