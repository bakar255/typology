import { useState } from "react";

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
            className={` hover:bg-pink-100 w-40 h-14 cursor-pointer font-bold border py-2.5 px-6 ${
              selectedCategory === item.name
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black"
            }`}

          >
            {item.name}
          </button>
        ))}
      </div>
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
    </div>
  );
}
