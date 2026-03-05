import { Product } from "@/data/products";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
    product: Product;
    onAddToCart?: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        setIsAdded(true);
        onAddToCart?.();
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <div className="group relative flex flex-col justify-between bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 h-full">
            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                    src={product.image}
                    alt={product.titre}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isBestSeller && (
                        <span className="inline-block bg-black text-white text-xs px-3 py-1 uppercase tracking-wider font-bold">
                            Best Seller
                        </span>
                    )}
                    {product.rating >= 4.7 && (
                        <span className="inline-block bg-amber-500 text-white text-xs px-3 py-1 uppercase tracking-wider font-bold">
                            ⭐ Top Rated
                        </span>
                    )}
                </div>

                {/* Favorite Button */}
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-all duration-300 shadow-md"
                >
                    <Heart
                        className={`w-5 h-5 transition-all ${
                            isFavorite
                                ? 'fill-red-500 text-red-500'
                                : 'text-gray-400 hover:text-gray-600'
                        }`}
                    />
                </button>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white text-black px-6 py-2 font-bold uppercase text-xs tracking-wider hover:bg-gray-100 transition-colors">
                        Aperçu Rapide
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {product.titre}
                </h3>

                {product.subcategory && (
                    <p className="text-xs text-gray-500 mb-2">{product.subcategory}</p>
                )}

                <p className="text-xs text-gray-600 mb-3 flex-grow line-clamp-2">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                    i < Math.round(product.rating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-2">
                        ({product.reviews})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                        {product.price.toFixed(2)} €
                    </span>
                    {product.price > 50 && (
                        <span className="text-sm text-gray-500 line-through">
                            {(product.price * 1.15).toFixed(2)} €
                        </span>
                    )}
                </div>

                {/* Action Button */}
                <button
                    onClick={handleAddToCart}
                    className={`w-full py-3 px-4 uppercase text-xs tracking-widest font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        isAdded
                            ? 'bg-green-600 text-white'
                            : 'bg-black text-white hover:bg-gray-800 active:scale-95'
                    }`}
                >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{isAdded ? 'Ajouté! ✓' : 'Ajouter'}</span>
                </button>
            </div>
        </div>
    );
}
