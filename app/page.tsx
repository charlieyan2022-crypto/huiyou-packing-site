import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Industries } from "./sections/Industries";
import { Products } from "./sections/Products";
import { About } from "./sections/About";
import { Advantages } from "./sections/Advantages";
import { News } from "./sections/News";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Industries />
        <Products />
        <Advantages />
        <About />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
