import { useState } from "react";

const products = [
    {
        id: 1, 
        titre: "T-26 - Beaume à lèvres",
        description: "Sérum hydratant pour une peau plus jeune",
        image: "/dior6.webp",
        price: 45,
        rating: 4.8,
        reviews: 124,
        isBestSeller: true,
    },
    {
        id: 2, 
        titre: "T-41 - Crème Hydratante",
        description: "Combinaison d'acide + Fond de teint",
        image: "/dior.jpg",
        price: 32,
        rating: 4.6,
        reviews: 89,
        isBestSeller: true,
    },
    {
        id: 3, 
        titre: "T-61 - Rouge à lèvre ",
        description: "Mélange d'acides exotiques + Arômes naturelle",
        image: "/dior5.webp",
        price: 28,
        rating: 4.7,
        reviews: 156,
        isBestSeller: true,
    },
    {
        id: 4, 
        titre: "T-53 - Rouge à lèvre",
        description: "Rouge à lèvre élégant et portatif + Naturel ",
        image: "/dior4.jpg",
        price: 38,
        rating: 4.5,
        reviews: 67,
        isBestSeller: false,
    },
    {
        id: 5, 
        titre: "T-32 - Exofoliant français ",
        description: "Exfoliant doux aux micro-grains",
        image: "/dior3.webp",
        price: 22,
        rating: 4.4,
        reviews: 93,
        isBestSeller: false,
    },
    {
        id: 6, 
        titre: "T-66 - Baume à lèvre",
        description: "Toner purifiant et équilibrant le pH",
        image: "/dior2.jpg",
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
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                    <img 
                    src={product.image} 
                    alt={product.titre} 
                    className="w-full max-h-[1800px] hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="w-full max-w-[1900px] max-h-[1900px] flex flex-col text-left space-y-2.5 justify-between flex-grow p-4">
                    <div>
                        <span className="font-semibold text-black block">{product.titre}</span>  
                        <span className="text-black block">{product.description}</span>
                    </div>
                    <div className="absolute right-1 items-center mt-4">
                        <span className="font-bold text-black">{product.price}€</span>
                    </div>
                    </div>
                    
                    <button className="w-full py-3 rounded-sm text-black border cursor-pointer border-black bg-white   mt-auto">
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