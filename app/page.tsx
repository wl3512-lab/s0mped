import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import InStock from "@/components/InStock";
import Aftercare from "@/components/Aftercare";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Services />
        <InStock />
        <Aftercare />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
