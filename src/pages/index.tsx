import Header from "@/components/navbar/header";
import Hero from "@/components/hero";
import AnimatedHero from "@/components/animations/AnimatedHero";
import SecondProprety from "@/components/secondeProprety";
import Footer from "@/components/footer";
import BestSellers from "@/components/BestSellers";
import ProductList from "@/components/ProductList";

export default function Home() {

  return (
    <div>
      <Header />
      <div>
        <Hero />
        <BestSellers />
        <AnimatedHero />
        <SecondProprety />
        <ProductList />
        <Footer />
      </div>
    </div>
  );
}