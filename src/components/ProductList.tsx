import { useState } from "react";

const categories = [
  { id: 1, name: "Cosmétique" },
  { id: 2, name: "Maquillages" },
  { id: 3, name: "Parfums" },
  { id: 4, name: "Bodycare" },
  { id: 5, name: "Skincare" },
];

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
         <div className="grid grid-cols-3 sm:grid-cols-5 gap-8 justify-center">
           <div className="flex flex-col gap-2">

            <img src="/bundle.png" alt="bundle" />

            <div className="flex flex-col gap-2">
              <span>Sol de Jainero</span>
              <span>Haute qualité a bas prix </span>
            </div>


            <button className="bg-white text-black border border-black px-2 w-full py-2"> ACHETER </button>
        </div>

      </div>
    </div>
  );
}
