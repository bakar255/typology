import { useState, useRef, useEffect } from 'react';
import { ShoppingBasketIcon, X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleCartClick = () => {
    if (window.innerWidth < 768) {
      router.push('/cart');
    } else {
      setIsCartOpen(!isCartOpen);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={cartRef}>
      <button
        onClick={handleCartClick}
        className="flex items-center gap-2 font-medium py-2 px-3 rounded transition-colors cursor-pointer relative"
      >
        <ShoppingBasketIcon size={28} />
        <span className='font-medium hidden md:block'>Panier</span>
      </button>

      {/* Cart Dropdown */}
      {isCartOpen && (
        <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-80 max-h-96 overflow-y-auto z-[100]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="">Panier ({getTotalItems()} articles)</h3>
              <button
                onClick={(e) => { e.stopPropagation(); setIsCartOpen(false); }}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
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
                    <img
                      src={item.image}
                      alt={item.titre}
                      className="w-12 h-12 object-cover rounded shrink-0"
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
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full bg-black text-white py-2 px-4 text-center hover:bg-gray-800 transition-colors"
                  >
                    Commander
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
