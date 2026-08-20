import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Trust } from "./sections/Trust";
import { Industries } from "./sections/Industries";
import { Products } from "./sections/Products";
import { Advantages } from "./sections/Advantages";
import { About } from "./sections/About";
import { News } from "./sections/News";
import { FAQ } from "./sections/FAQ";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Trust />
        <Industries />
        <Products />
        <Advantages />
        <About />
        <News />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
