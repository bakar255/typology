import { useState } from "react";

const products = [
    {
        id: 1, 
        titre: "Sérum Anti-Âge",
        description: "Sérum hydratant pour une peau plus jeune",
        image: "/makeup.webp",
        price: 45,
        rating: 4.8,
        reviews: 124,
        isBestSeller: true,
    },
    {
        id: 2, 
        titre: "Crème Hydratante",
        description: "Crème hydratante 24h pour tous types de peau",
        image: "/makeup2.jpg",
        price: 32,
        rating: 4.6,
        reviews: 89,
        isBestSeller: true,
    },
    {
        id: 3, 
        titre: "Masque Purifiant",
        description: "Masque détoxifiant aux argiles naturelles",
        image: "/makeup.webp",
        price: 28,
        rating: 4.7,
        reviews: 156,
        isBestSeller: true,
    },
    {
        id: 4, 
        titre: "Huile Visage",
        description: "Huile nourrissante aux huiles essentielles",
        image: "/makeup2.jpg",
        price: 38,
        rating: 4.5,
        reviews: 67,
        isBestSeller: false,
    },
    {
        id: 5, 
        titre: "Gommage Doux",
        description: "Exfoliant doux aux micro-grains",
        image: "/makeup.webp",
        price: 22,
        rating: 4.4,
        reviews: 93,
        isBestSeller: false,
    },
    {
        id: 6, 
        titre: "Toner Équilibrant",
        description: "Toner purifiant et équilibrant le pH",
        image: "/makeup2.jpg",
        price: 18,
        rating: 4.3,
        reviews: 78,
        isBestSeller: false,
    }
]


export default function Proprety() {

    return (
        <div className="container mt-16 mx-auto">
            <div className="text-center flex flex-col items-center justify-center">
            <span className="text-5xl font-bold mb-2">Nos Best-Seller</span>
            <span className="text-2xl font-semibold">Découvrez nos produits les plus vendus</span>
            
            <div className="proprety-grid">

                {products.map((product) => (
                    <div key={product.id} className="proprety-item">
                        <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img 
                                src={product.image} 
                                alt={product.titre} 
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{product.titre}</h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>                        
                            
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-[#fdcd95]">{product.price}€</span>
                                </div>
                            </div>
                            <button className="bg-gray-200 text-center text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center gap-2">
                             Ajouter au panier
                          </button>
                        </div>
                    </div>
                ))}
            </div>

            </div>
        </div>
    )
}