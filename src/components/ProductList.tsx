import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";
import { ChevronDown, Search } from "lucide-react";

const categories = [
  { id: 1, name: "Cosmétique" },
  { id: 2, name: "Maquillages" },
  { id: 3, name: "Parfums" },
  { id: 4, name: "Bodycare" },
  { id: 5, name: "Skincare" },
];

const sortOptions = [
  { id: 1, label: "Pertinence", value: "relevant" },
  { id: 2, label: "Tarif croissant", value: "price-asc" },
  { id: 3, label: "Tarif décroissant", value: "price-desc" },
  { id: 4, label: "Meilleures notes", value: "rating" },
  { id: 5, label: "Nouveautés", value: "newest" },
];

const bundles = [
  {
    id: 1,
    image: "/kayali.webp",
    title: "Kay Ali",
    subtitle: "Cheirosa 91",
    description: "Une nouvelle obsession est en train d'apparaître.",
  },
  {
    id: 2,
    image: "/kilian.png",
    title: "Bundle Premium",
    subtitle: "Collection Exclusive",
    description: "Découvrez notre sélection premium de produits.",
  },
  {
    id: 3,
    image: "/kevin.png",
    title: "Set Découverte",
    subtitle: "Essentiels Beauté",
    description: "Tous les essentiels pour votre routine beauté.",
  },
  {
    id: 4,
    image: "/beauty.png",
    title: "Cerave Collection",
    subtitle: "BodyCare",
    description: "Une collection exclusive pour un soin de qualité.",
  },
];

// Skeleton Loader Component
function ProductSkeleton() {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
      <div className="w-full aspect-[3/4] bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-8 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  );
}

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState("relevant");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchProducts(selectedCategory, selectedSort, searchTerm);
  }, [selectedCategory, selectedSort, searchTerm]);

  const fetchProducts = async (category: string | null, sort: string, search: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (sort) params.append("sort", sort);
      if (search) params.append("search", search);
      params.append("limit", "12");

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Categories Tab Nav */}
        <div className="mb-8 border-b border-gray-200 mx-auto">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`relative pb-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-200 ${
                selectedCategory === null
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.name)}
                className={`relative pb-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-200 ${
                  selectedCategory === cat.name
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          {!selectedCategory ? (
            /* Bundles View */
            <>
              <h2 className="text-2xl font-bold mb-8 text-gray-900">Collections & Bundles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {bundles.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={bundle.image}
                        alt={bundle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="bg-white text-black px-6 py-2 font-bold uppercase text-xs tracking-wider">
                          Découvrir
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{bundle.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 uppercase">{bundle.subtitle}</p>
                        <p className="text-sm text-gray-700">{bundle.description}</p>
                      </div>
                      <button className="w-full bg-black text-white py-2 mt-4 font-bold uppercase text-xs tracking-wider hover:bg-gray-800 transition-colors">
                        Acheter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {/* Products Grid */}
          <div>
            {selectedCategory && (
              <h2 className="text-2xl font-bold mb-8 text-gray-900">{selectedCategory}</h2>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : selectedCategory && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : selectedCategory && products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">Aucun produit trouvé pour cette catégorie.</p>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Voir toutes les collections
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
