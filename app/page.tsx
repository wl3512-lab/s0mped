import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import StonesShowcase from "@/components/StonesShowcase";
import Services from "@/components/Services";
import InStock from "@/components/InStock";
import GemSuggestion from "@/components/GemSuggestion";
import Aftercare from "@/components/Aftercare";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <StonesShowcase />
        <Services />
        <InStock />
        <GemSuggestion />
        <Aftercare />
      </main>
      <Footer />
    </>
  );
}
