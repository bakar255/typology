import { useState } from "react";

const categories = [
  { id: 1, name: "Cosmétique" },
  { id: 2, name: "Maquillages" },
  { id: 3, name: "Parfums" },
  { id: 4, name: "Bodycare" },
  { id: 5, name: "Skincare" },
];

const bundles = [
  { id: 1, name: "Bundle 1", image: "/bundle1.png" },
  { id: 2, name: "Bundle 2", image: "/bundle2.png" },
  { id: 3, name: "Bundle 3", image: "/bundle3.png" },
  { id: 4, name: "Bundle 4", image: "/bundle4.png" },
];

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="py-10">
      {/* Section titres */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Une sélection d'objets de qualité</h1>
        <h2 className="text-3xl mt-2">Choisis pour vous !</h2>
      </div>

      <div className="flex justify-center items-center space-x-5 mb-10 flex-wrap">
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedCategory(item.name)}
            className={`w-40 h-14 cursor-pointer font-bold border py-2.5 px-6 ${
              selectedCategory === item.name
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
        {bundles.map((bundle) => (
          <div
            key={bundle.id}
            className="flex flex-col items-center border border-gray-300 p-4 rounded-lg hover:shadow-lg transition"
          >
            <img
              src={bundle.image}
              alt={bundle.name}
              className="w-56 h-56 object-cover mb-4"
            />
            <span className="text-xl font-semibold">{bundle.name}</span>
            <button className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Voir le produit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
