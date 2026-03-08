import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product, products } from "@/data/products";

export default function BestSellers() {
    const [bestSellers, setBestSellers] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBestSellers();
    }, []);

    const fetchBestSellers = async () => {
        try {
            const bestSellerProducts = products.filter((p) => p.isBestSeller);
            setBestSellers(bestSellerProducts.sort((a, b) => b.rating - a.rating).slice(0, 6));
        } catch (error) {
            console.error('Error fetching best sellers:', error);
            setBestSellers([]);
        } finally {
            setLoading(false);
        }
    };

    return (
         <div className="py-16 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Best-Sellers</h2>
                <p className="text-gray-600">Découvrez nos produits les plus populaires</p>
            </div>

            {/* Grid */}
            <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 max-w-7xl mx-auto">
                {bestSellers.map((product) => (
                    <div key={product.id} className="h-full">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}        
