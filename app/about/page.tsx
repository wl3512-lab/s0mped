import About from "@/components/About";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About | sompednyc",
  description: "Meet the artist behind sompednyc, NYC's tooth gem specialist using Swarovski crystals and dental-grade adhesive.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <About />
      </main>
      <Footer />
    </>
  );
}
