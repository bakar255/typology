import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Product } from "@/data/products";

const categories = [
  { id: 1, name: "Cosmétique" },
  { id: 2, name: "Maquillages" },
  { id: 3, name: "Parfums" },
  { id: 4, name: "Bodycare" },
  { id: 5, name: "Skincare" },
];

const bundles = [
  {
    id: 1,
    image: "/bundle.png",
    title: "Black Opium",
    subtitle: "Cheirosa 91",
    description: "Une nouvelle obsession est en train d'apparaître.",
  },
  {
    id: 2,
    image: "/bundle1.png",
    title: "Bundle Premium",
    subtitle: "Collection Exclusive",
    description: "Découvrez notre sélection premium de produits.",
  },
  {
    id: 3,
    image: "/bundle2.png",
    title: "Set Découverte",
    subtitle: "Essentiels Beauté",
    description: "Tous les essentiels pour votre routine beauté.",
  },
  {
    id: 4,
    image: "/bundle3.png",
    title: "Collection Luxe",
    subtitle: "Édition Limitée",
    description: "Une collection exclusive pour une beauté exceptionnelle.",
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
    <div className="py-10">
      {/* Section titres */}
      <div className="text-center mb-5">
        <h1 className="text-4xl font-bold">Une sélection d'objets de qualité</h1>
        <h2 className="text-3xl mt-2">Choisis pour vous !</h2>
      </div>

      <div className="flex justify-center items-center space-x-5 mb-0 flex-wrap">
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedCategory(item.name)}
            className={` hover:bg-pink-100 w-40 h-14 cursor-pointer font-bold border py-2.5 px-6 ${selectedCategory === item.name
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black"
              }`}

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
                className="bg-amber-100 w-full h-64 object-cover" 
              />

              <div className="flex flex-col gap-2 justify-center items-center text-center">
                <span className="font-bold">{product.titre}</span>
                <span className="text-sm text-gray-600">{product.description}</span>
                {product.price && (
                  <span className="font-semibold text-lg">{product.price}€</span>
                )}
              </div>

              <button 
                className="bg-white cursor-pointer text-black border border-black px-2 w-full py-2 mt-7"
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
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-start mt-10">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="flex flex-col gap-2 w-full py-5 items-center">
              <img src={bundle.image} alt={bundle.title} className="bg-amber-100 w-66 " />

              <div className="flex flex-col gap-5 justify-center items-center">
                <span className="font-bold text-center">{bundle.title}</span>
                <span className="text-sm text-center">{bundle.subtitle}</span>
                <span className="text-sm text-center">{bundle.description}</span>
              </div>

              <button className="bg-white cursor-pointer text-black border border-black px-2 w-full py-2 mt-7">
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
