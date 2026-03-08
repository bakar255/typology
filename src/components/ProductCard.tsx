import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/data/products";

interface ProductCardProps {
    product: Product;
    onAddToCart?: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        setIsAdded(true);
        onAddToCart?.();
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <div className="group relative flex flex-col cursor-pointer justify-between border border-transparent transition-all duration-300 p-6 h-full">
            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 mb-5">
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
                <div className="flex flex-col mb-2">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                        {product.titre}
                    </h3>

                    <span className="text-sm font-semibold whitespace-nowrap gap-2">
                        {product.price.toFixed(2)} €
                    </span>
                </div>

                <p className="text-sm text-gray-500 mb-3 flex-grow line-clamp-2">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-500 mr-2">
                    </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-white border cursor-pointer border-black text-black py-3 px-4 uppercase text-xs tracking-widest font-bold flex items-center justify-center gap-2 group/btn">
                    <span>Ajouter au panier</span>
                </button>
            </div>
        </div>
    );
}
