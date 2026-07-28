import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type LegalLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex flex-1 flex-col py-12 sm:py-16">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/"
            className="font-heading text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-accent"
          >
            ← Vissza a főoldalra
          </Link>
          <h1 className="font-heading mt-6 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-zinc-400">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
