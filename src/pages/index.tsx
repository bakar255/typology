import Header from "@/components/header";
import Hero  from "@/components/hero";
import Proprety from "@/components/proprety";
import AnimatedHero from "@/components/AnimatedHero";
import SecondProprety from "@/components/secondeProprety";
import Footer from "@/components/footer";

export default function Home() {

  return (
    <div>
      <Header/>
      <Hero />
      <Proprety />
      <AnimatedHero />
      <SecondProprety />
      <Footer />
    </div>
  );
}
