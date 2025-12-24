import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";
import { products, Product } from "@/data/products";
import Image from "next/image";
import { useState } from "react";


export default function Proprety() {

    const [slide, setSlide] = useState([]);

    const router = useRouter();
    const { addToCart } = useCart();

    const handleProductClick = (productId: number) => {
        router.push(`/product/${productId}`);
    };

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation(); // Empêche la navigation vers la page détail
        addToCart(product, 1);
    };

    return (
        <div className="">
            <div className="text-center flex flex-col items-center justify-center mt-12">
                <span className="text-4xl font-bold mb-2 playfair-family">Nos Best-Seller</span>
                <span className="text-2xl font-semibold playfair-family">Découvrez nos produits les plus vendus</span>
                
                <div className="proprety-grid">
                {products.map((product) => (
                    <div 
                        key={product.id} 
                        className="proprety-item cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                    >
                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                        <Image 
                        src={product.image} 
                        alt={product.titre} 
                        width={400}
                        height={300}
                        className="w-full max-h-[1800px] hover:scale-105 transition-transform duration-300 object-cover" 
                        />
                        <div className=" font-medium w-full max-w-[2000px] max-h-[2000px] flex flex-col text-left space-y-2.5 justify-between flex-grow p-4">
                        <div>
                            <span className=" text-foreground block">{product.titre}</span>  
                            <span className="text-foreground block">{product.description}</span>
                        </div>
                        <div className="absolute right-2 bottom-18 items-center mt-4">
                            <span className="font-medium">{product.price}€</span>
                        </div>
                        </div>
                        
                        <button 
                            className="w-full py-3 p-5 rounded-sm text-black border cursor-pointer border-black bg-white"
                            onClick={(e) => handleAddToCart(e, product)}
                        >
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