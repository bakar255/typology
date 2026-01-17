import { Product } from "@/data/products";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative flex flex-col justify-between border border-transparent hover:border-black transition-all duration-300 p-4 h-full">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50 mb-4">
                <img
                    src={product.image}
                    alt={product.titre}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {product.isBestSeller && (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 uppercase tracking-wider">
                        Best Seller
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                        {product.titre}
                    </h3>
                    <span className="text-sm font-semibold whitespace-nowrap ml-2">
                        {product.price.toFixed(2)} €
                    </span>
                </div>

                <p className="text-sm text-gray-500 mb-3 flex-grow line-clamp-2">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-500 mr-2">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-900">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">({product.reviews} avis)</span>
                </div>

                {/* Action Button */}
                <button className="w-full bg-black text-white py-3 px-4 uppercase text-xs tracking-widest font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group/btn">
                    <span>Ajouter au panier</span>
                    <ShoppingCart className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
