import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">
        <div id="hero">
          <h1 className="text-3xl lg:text-5xl font-bold text-center">The QB + Coordinator Intelligence Platform</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}