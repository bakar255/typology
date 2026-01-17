import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function BestSellers() {
    const bestSellers = products.filter((product) => product.isBestSeller);

    return (
        <div className="py-16 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Best-Sellers</h2>
                <p className="text-gray-600">Découvrez nos produits les plus populaires</p>
            </div>

            {/* Grid */}
            <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
                {bestSellers.map((product) => (
                    <div key={product.id} className="h-full">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
