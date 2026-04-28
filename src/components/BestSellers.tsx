import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";

export default function BestSellers() {
    const [bestSellers, setBestSellers] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBestSellers();
    }, []);

    const fetchBestSellers = async () => {
        try {
            // Sélection naturelle : soins visage (tendance) + parfums (classiques best-sellers beauté)
            const [skincareRes, parfumsRes] = await Promise.all([
                fetch("/api/products?category=Skincare&limit=3"),
                fetch("/api/products?category=Parfums&limit=3"),
            ]);
            const skincare = await skincareRes.json();
            const parfums = await parfumsRes.json();
            
            console.log(skincare)

            const curated = [
                ...skincare.map((p: any) => ({ ...p, isBestSeller: true })),
                ...parfums.map((p: any) => ({ ...p, isBestSeller: true })),
            ];


            setBestSellers(curated);
        } catch (error) {
            console.error("Error fetching best sellers:", error);
            setBestSellers([]);
        } finally {
            setLoading(false);
        }
    };

    return (
         <div className="py-16 max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Best-Sellers</h2>
                <p className="text-gray-600">Découvrez nos produits les plus populaires</p>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement...</p>
                </div>
            ) : (
            <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 max-w-7xl mx-auto">
                {bestSellers.map((product) => (
                    <div key={product.id} className="h-full">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}        
