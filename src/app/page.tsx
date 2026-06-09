import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { Gallery } from "@/components/Gallery";
import { LocalSEO } from "@/components/LocalSEO";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { StickyMobileFooter } from "@/components/StickyMobileFooter";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col pb-[5.5rem] sm:pb-0">
        <Hero />
        <Services />
        <WhyUs />
        <Gallery />
        <LocalSEO />
        <Contact />
      </main>
      <Footer />
      <StickyMobileFooter />
    </>
  );
}
