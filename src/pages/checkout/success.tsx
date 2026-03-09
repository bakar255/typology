import Header from "@/components/navbar/header";
import Footer from "@/components/footer";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <CheckCircle size={56} className="mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl font-medium playfair-family mb-4">Commande confirmée !</h1>
        <p className="text-gray-500 mb-2">
          Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
        </p>
        <p className="text-sm text-gray-400 mb-10">
          Un récapitulatif de votre commande vous sera envoyé par email.
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
      <Footer />
    </div>
  );
}
