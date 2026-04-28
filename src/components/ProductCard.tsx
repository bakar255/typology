import { useState, type MouseEvent } from "react";
import { useRouter } from "next/router";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isAdded, setIsAdded] = useState(false);

  const favorited = isFavorite(product.id);

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col cursor-pointer justify-between transition-all duration-300 h-full bg-white hover:shadow-lg rounded-sm"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f8f6f3] mb-4">
        <img
          src={product.image}
          alt={product.titre}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-black text-white text-[10px] px-3 py-1 uppercase tracking-widest">
            Best Seller
          </span>
        )}
        {/* Bouton favori */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-white transition-colors"
        >
          <Heart
            size={15}
            className={favorited ? "fill-black text-black" : "text-gray-400"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-4 pb-5">
        <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
          {product.brand || product.category}
        </p>
        <h3 className="text-sm font-medium text-gray-900 leading-snug">
          {product.titre}
        </h3>
        {product.volume && (
          <span className="text-xs text-gray-400 mt-0.5 mb-1">{product.volume}</span>
        )}
        <p className="text-xs text-gray-400 mb-2 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <span className="text-base font-bold text-gray-900 mb-3">
          {product.price.toFixed(2)} €
        </span>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-3 px-4 text-[11px] uppercase tracking-widest font-semibold hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
        >
          {isAdded ? "Ajouté ✓" : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
}
