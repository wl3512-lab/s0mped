import Booking from "@/components/Booking";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Book | sompednyc",
  description: "Book your custom Swarovski tooth gem appointment with sompednyc — mobile service in NYC, applied safely and painlessly.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <Booking />
      </main>
      <Footer />
    </>
  );
}
