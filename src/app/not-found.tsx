import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-accent">
          404
        </p>
        <h1 className="font-heading mt-4 text-4xl font-bold uppercase text-white sm:text-5xl">
          Nincs ilyen oldal
        </h1>
        <p className="mt-4 max-w-md text-zinc-500">
          A keresett oldal nem található. Ha autómentésre van szüksége, hívjon minket közvetlenül.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center border-4 border-black bg-accent px-8 font-heading text-sm font-bold uppercase text-black"
          >
            Főoldal
          </Link>
          <Link
            href="/#kapcsolat"
            className="inline-flex h-12 items-center justify-center border border-zinc-700 px-8 font-heading text-sm font-semibold uppercase text-zinc-300 hover:border-zinc-500"
          >
            Kapcsolat
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
