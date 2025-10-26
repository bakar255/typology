import { useState } from 'react';
import { User, Search, ChevronDown, ShoppingBasketIcon, X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSearch } from '@/context/SearchContext';
import { products } from '@/data/products';
import Image from 'next/image';

export default function Header() {
  const { cartItems, removeFromCart, updateQuantity, getTotalItems } = useCart();
  const { setSearchQuery, searchResults, setSearchResults, isSearchOpen, setIsSearchOpen, performSearch } = useSearch();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = performSearch(products, query);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
      setSearchResults([]);
    }
  };

  const handleProductClick = (productId: number) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    // Navigation vers la page produit
    window.location.href = `/product/${productId}`;
  };

  return (
    <div className="fixed top-0 left-0 w-full py-1 p-5 bg-white z-50 shadow-sm">
        <div className="flex items-center justify-between max-w-[1700px] mx-auto">
         
          <div className="flex items-center gap-4">
            <span className="text-[19px] font-medium cursor-pointer">Acceuil</span>
            <button className="text-[19px] font-medium ml-2 cursor-pointer border border-black py-1 p-6 text-blakc rounded-sm">Produits <ChevronDown size={24} className='inline-block text-black'/> </button>
          </div>

          <div className="items-center flex flex-col gap-1">
            <span className="font-bold text-2xl text-black mr-15">Typeaulogy</span>
            <span className="text-black font-semibold text-2xl mr-16">Paris</span>
          </div>

          <div className="flex items-center gap-7">
           {/* Selection langues*/}
          <label htmlFor="languages" className="block font-semibold mb-1">
            Français <ChevronDown size={26} className=" inline-block ml-1 text-black"/>
          </label>
            
            {/* Search */}
            <div className="relative">
              <div className="flex items-center">
                
                <Search size={20} className="cursor-pointer text-black ml-2" />
              </div>
              
              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-64 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                    >
                      <Image
                        src={product.image}
                        alt={product.titre}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <p className="font-medium text-sm">{product.titre}</p>
                        <p className="text-gray-600 text-xs">{product.price}€</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <User size={26} className=" cursor-pointer text-black"/>
            
            {/* Cart */}
            <div className="relative">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative cursor-pointer"
              >
                <ShoppingBasketIcon size={26} className='cursor-pointer mx-5'/>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-80 max-h-96 overflow-y-auto z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Panier ({getTotalItems()} articles)</h3>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
                    ) : (
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 p-2 border-b border-gray-100">
                            <Image
                              src={item.image}
                              alt={item.titre}
                              width={50}
                              height={50}
                              className="rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.titre}</p>
                              <p className="text-gray-600 text-xs">{item.price}€</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold">Total:</span>
                            <span className="font-bold">
                              {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}€
                            </span>
                          </div>
                          <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                            Commander
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
} 