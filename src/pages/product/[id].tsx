import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingCart, Heart, Plus, Minus } from "lucide-react";
import Header from "@/components/navbar/header";
import Footer from "@/components/footer";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

export default function ProductDetail() {
     const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
     const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

     useEffect(() => {
        if (id) {
            fetchProduct(parseInt(id as string));
        }
    }, [id]);

    const fetchProduct = async (productId: number) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/products/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
            } else {
                setProduct(null);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !product) {
        return (
            <div>
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-gray-600">
                            {loading ? 'Chargement du produit...' : 'Produit non trouvé'}
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour aux produits
                </button>
            </div>

            {/* Product Detail */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src={product.image}
                                alt={product.titre}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        
                        {/* Thumbnails */}
                        <div className="flex space-x-2">
                            {[product.image, product.image].map((img, index) => (
                                <div 
                                    key={index}
                                    className="w-20 h-20 relative cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-300 transition-colors"
                                    onClick={() => {}}
                                >
                                    <Image src={img} alt="" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                {product.isBestSeller && (
                                    <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full">
                                        Best Seller
                                    </span>
                                )}
                            </div>
                            
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.titre}</h1>
                            <p className="text-xl text-gray-600 mb-4">{product.description}</p>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600">({product.reviews} avis)</span>
                            </div>

                            {/* Price */}
                            <div className="text-3xl font-bold text-gray-900 mb-6">
                                {product.price}€
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <span className="font-semibold">Quantité :</span>
                                <div className="flex items-center border rounded-lg">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-4 py-2">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button 
                                    onClick={() => addToCart(product, quantity)}
                                    className="flex-1 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Ajouter au panier</span>
                                </button>
                                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Detailed Description */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Description</h3>
                            <p className="text-gray-600">{product.detailedDescription}</p>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Bénéfices</h3>
                            <ul className="grid grid-cols-2 gap-2">
                                {product.benefits?.map((benefit, index) => (
                                    <li key={index} className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-gray-600">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Ingredients */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Ingrédients</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.ingredients?.map((ingredient, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                        {ingredient}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <span className="flex text-center items-center justify-center text-gray-500"> disclaimer: Les données sont généré automatiquement </span>
            <Footer />
        </div>
    );
}