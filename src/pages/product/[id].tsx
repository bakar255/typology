import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Plus, Minus, ChevronDown } from "lucide-react";
import Header from "@/components/navbar/header";
import Footer from "@/components/footer";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

const accordions = [
  { id: "description", label: "Description" },
  { id: "ingredients", label: "Ingrédients" },
  { id: "instructions", label: "Instructions d'utilisation" },
];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) fetchProduct(parseInt(id as string));
  }, [id]);

  const fetchProduct = async (productId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) setProduct(await response.json());
      else setProduct(null);
    } catch {
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !product) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b border-gray-900 mx-auto mb-4" />
            <p className="text-sm text-gray-400 tracking-wide">
              {loading ? "Chargement..." : "Produit non trouvé"}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Retour
        </button>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.titre}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
          {product.isBestSeller && (
            <span className="absolute top-4 left-4 bg-black text-white text-[10px] uppercase tracking-widest px-3 py-1">
              Best Seller
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between py-2">
          <div className="space-y-6">

            {/* Title + price */}
            <div>
              <h1 className="playfair-family text-3xl leading-snug text-gray-900 mb-3">
                {product.titre}
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {product.description}
              </p>
              <span className="text-2xl font-light tracking-wide text-gray-900">
                {product.price}€
              </span>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-3">
                Quantité
              </p>
              <div className="flex items-center border border-gray-200 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="px-6 py-3 text-sm border-x border-gray-200 min-w-[48px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={() => addToCart(product, quantity)}
              className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-gray-900 transition-colors cursor-pointer"
            >
              Ajouter au panier
            </button>
          </div>

          {/* Accordions */}
          <div className="mt-10 border-t border-gray-100">
            {accordions.map((item) => (
              <div key={item.id} className="border-b border-gray-100">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === item.id ? null : item.id)
                  }
                  className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
                >
                  <span className="text-xs uppercase tracking-widest text-gray-700 group-hover:text-black transition-colors">
                    {item.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-300 ${
                      openAccordion === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === item.id && (
                  <div className="pb-5 text-sm text-gray-400 italic">
                    Bientôt disponible.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
