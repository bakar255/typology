import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Product } from "@/data/products";

const categories = [
  { id: 1, name: "Cosmétique" },
  { id: 2, name: "Maquillages" },
  { id: 3, name: "Parfums" },
  { id: 4, name: "Bodycare" },
  { id: 5, name: "Skincare" },
  {id: 6, name: "Crème de jour"}
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

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (category: string | null) => {
    setLoading(true);
    try {
      const url = category 
        ? `/api/products?category=${encodeURIComponent(category)}&limit=12`
        : `/api/products?limit=12`;
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Section titres */}
      <div className="text-center mb-5">
        <h1 className="text-5xl mb-2 font-bold playfair-family">Une sélection d'objets de qualité</h1>
        <h2 className="text-3xl mt-8 font-medium">Choisis pour vous !</h2>
      </div>

      <div className="flex justify-center items-center space-x-5 mb-0 flex-wrap mt-6">
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedCategory(item.name)}
            className="rounded-full border border-black py-2 px-4 cursor-pointer ml-4 mt-4 shadow-sm"
          >
            {item.name}
          </button>
        ))}
      </div>
      
      {/* Affichage des produits ou bundles selon la catégorie sélectionnée */}
      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      ) : selectedCategory && products.length > 0 ? (
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-start mt-10">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex flex-col gap-2 w-full py-5 items-center cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <img 
                src={product.image || "/placeholder.jpg"} 
                alt={product.titre} 
                className="bg-amber-100 w-full h-72 object-cover" 
              />

              <div className="flex flex-col gap-2 justify-center items-center text-center">
                <span className="font-bold text-xl">{product.titre}</span>
                <span className="text-sm text-gray-600">{product.description}</span>
                {product.price && (
                  <span className="font-semibold text-lg">{product.price}€</span>
                )}
              </div>

              <button 
                className="bg-white cursor-pointer text-black border border-black w-40 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick(product.id);
                }}
              >
                ACHETER
              </button>
            </div>
          ))}
        </div>
      ) : !selectedCategory ? (
        <div className="px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-center items-start mt-10 mb-12">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="flex flex-col gap-2 w-full py-5 items-center">
              <img src={bundle.image} alt={bundle.title} className="bg-amber-100 w-72" />

              <div className="flex flex-col gap-2 justify-center items-center">
                <span className="font-bold text-center text-2xl">{bundle.title}</span>
                <span className="text-sm text-center text-2xl uppercase mt-2 ">{bundle.subtitle}</span>
                <span className="text-center text-1xl ">{bundle.description}</span>
              </div>

              <button className="bg-white cursor-pointer text-black border border-black px-2 w-30 py-2 mt-12">
                ACHETER
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">Aucun produit trouvé pour cette catégorie.</p>
        </div>
      )}
    </div>
  );
}
