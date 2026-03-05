import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";
import { ArrowRight } from "lucide-react";

// Skeleton Loader Component
function ProductCardSkeleton() {
    return (
        <div className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
            <div className="w-full aspect-[3/4] bg-gray-200"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-10 bg-gray-200 rounded mt-4"></div>
            </div>
        </div>
    );
}

export default function BestSellers() {
    const [bestSellers, setBestSellers] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(6);
    const router = useRouter();

    useEffect(() => {
        fetchBestSellers();
    }, []);

    const fetchBestSellers = async () => {
        try {
            const response = await fetch('/api/products?limit=12&sort=rating');
            const products = await response.json();
            // Marquer les top produits comme best sellers
            setBestSellers(
                products.slice(0, 12).map((p: any, index: number) => ({
                    ...p,
                    isBestSeller: index < 6,
                }))
            );
        } catch (error) {
            console.error('Error fetching best sellers:', error);
            setBestSellers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleViewAll = () => {
        router.push('/collection');
    };

    const handleLoadMore = () => {
        setDisplayCount((prev) => Math.min(prev + 3, bestSellers.length));
    };

    const visibleProducts = bestSellers.slice(0, displayCount);
    const hasMoreProducts = displayCount < bestSellers.length;

    return (
        <div className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6">
                        <div>
                            <div className="inline-block bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                Populaires
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                                Nos Best-Sellers
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Découvrez les produits les plus aimés par nos clients
                            </p>
                        </div>
                        <button
                            onClick={handleViewAll}
                            className="mt-6 md:mt-0 flex items-center gap-2 px-6 py-3 bg-black text-white font-bold uppercase text-sm tracking-wider rounded-lg hover:bg-gray-800 transition-all duration-300 hover:gap-3"
                        >
                            <span>Tous les produits</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 pt-6 border-t border-gray-200">
                        <div>
                            <div className="text-3xl font-bold text-gray-900">+5000</div>
                            <div className="text-sm text-gray-600">Clients satisfaits</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900">4.8/5</div>
                            <div className="text-sm text-gray-600">Note moyenne</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900">100%</div>
                            <div className="text-sm text-gray-600">Produits authentiques</div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : bestSellers.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visibleProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={() => {
                                        console.log('Added to cart:', product.titre);
                                        // Vous pouvez ajouter une animation toast ici
                                    }}
                                />
                            ))}
                        </div>

                        {/* Load More Button */}
                        {hasMoreProducts && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={handleLoadMore}
                                    className="px-8 py-3 border-2 border-black text-black font-bold uppercase text-sm tracking-wider rounded-lg hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    Charger plus ({displayCount}/{bestSellers.length})
                                </button>
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="mt-16 p-8 bg-black text-white rounded-lg text-center">
                            <h3 className="text-2xl font-bold mb-2">Vous ne trouvez pas ce que vous cherchez?</h3>
                            <p className="text-gray-300 mb-6">Parcourez notre collection complète de plus de 100 produits</p>
                            <button
                                onClick={handleViewAll}
                                className="px-6 py-3 bg-white text-black font-bold uppercase text-sm tracking-wider rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Explorer le catalogue
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">Aucun produit disponible pour le moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
