import Header from "@/components/navbar/header";
import Footer from "@/components/footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            name: item.titre,
            price: item.price,
            quantity: item.quantity,
            image: item.image?.startsWith("http") ? item.image : undefined,
          })),
        }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || "Erreur lors du paiement");
      }
    } catch {
      alert("Erreur de connexion");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-medium playfair-family mb-3">Votre panier est vide</h2>
          <p className="text-gray-500 mb-8">Découvrez nos produits et ajoutez vos favoris au panier.</p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Continuer mes achats
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const total = getTotalPrice();
  const shipping = total >= 50 ? 0 : 4.99;

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-medium playfair-family mb-10">Mon panier</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Articles */}
          <div className="flex-1">
            <div className="border-b border-gray-200 pb-3 mb-4 hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 text-xs uppercase tracking-widest text-gray-400">
              <span>Produit</span>
              <span className="text-center">Quantité</span>
              <span className="text-right">Prix</span>
              <span></span>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="py-6 grid grid-cols-[auto_1fr] md:grid-cols-[auto_2fr_1fr_1fr_auto] gap-4 items-center"
                >
                  {/* Image */}
                  <div className="w-20 h-24 bg-[#f8f6f3] overflow-hidden shrink-0">
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.titre}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                      {item.brand || item.category}
                    </p>
                    <p className="text-sm font-medium leading-snug">{item.titre}</p>
                    {item.volume && (
                      <p className="text-xs text-gray-400 mt-0.5">{item.volume}</p>
                    )}
                    <p className="text-sm font-bold mt-1 md:hidden">{item.price.toFixed(2)} €</p>
                  </div>

                  {/* Quantité */}
                  <div className="flex items-center gap-2 justify-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Prix unitaire */}
                  <p className="text-sm font-medium text-right hidden md:block">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>

                  {/* Supprimer */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-black transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-xs uppercase tracking-widest text-gray-400 underline hover:text-black transition-colors"
              >
                Vider le panier
              </button>
              <Link
                href="/"
                className="text-xs uppercase tracking-widest underline hover:text-gray-600 transition-colors"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>

          {/* Résumé commande */}
          <div className="lg:w-80 shrink-0">
            <div className="border border-gray-200 p-6">
              <h3 className="text-sm uppercase tracking-widest font-medium mb-6">
                Résumé de la commande
              </h3>

              <div className="flex flex-col gap-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Sous-total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Livraison</span>
                  <span>{shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">
                    Livraison gratuite dès 50 €
                  </p>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span>{(total + shipping).toFixed(2)} €</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
              >
                {isCheckingOut ? "Redirection..." : "Passer commande"}
              </button>

              {!isAuthenticated && (
                <p className="text-xs text-gray-500 text-center mt-3">
                  Vous devrez vous connecter pour payer
                </p>
              )}

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>Paiement sécurisé par</span>
                <span className="font-semibold text-gray-600">Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
