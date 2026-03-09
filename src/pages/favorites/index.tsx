import Header from "@/components/navbar/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { extractVolume, Product } from "@/data/products";

export default function FavoritesPage() {
  const { isAuthenticated, token } = useAuth();
  const { favoriteIds } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setIsLoading(false);
      return;
    }

    fetch("/api/favorites", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped: Product[] = data.map((f: any) => ({
            id: f.product.id,
            titre: f.product.name,
            description: f.product.description || "",
            image: f.product.imageUrl || "/placeholder.jpg",
            price: f.product.price || 0,
            rating: 4.5,
            reviews: 0,
            category: f.product.category || "",
            isBestSeller: false,
            volume: extractVolume(f.product.name),
            brand: f.product.brand,
          }));
          setProducts(mapped);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [isAuthenticated, token, favoriteIds.length]);

  if (!isAuthenticated) {
    return (
      <div>
        <Header />
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <Heart size={48} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-medium playfair-family mb-3">Vos favoris</h2>
          <p className="text-gray-500 mb-8">Connectez-vous pour retrouver vos produits favoris.</p>
          <Link
            href="/login"
            className="inline-block bg-black text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Se connecter
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium playfair-family mb-3">Mes favoris</h1>
          <p className="text-gray-500 text-sm">{products.length} produit{products.length > 1 ? "s" : ""} sauvegardé{products.length > 1 ? "s" : ""}</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-6">Vous n'avez pas encore de favoris.</p>
            <Link
              href="/"
              className="inline-block border border-black px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
