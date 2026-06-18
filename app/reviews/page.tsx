import Reviews from "@/components/Reviews";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Reviews | sompednyc",
  description: "Real reviews from sompednyc clients — see what people say about their Swarovski tooth gems, and leave your own.",
};

export default function ReviewsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
