import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Hydrater depuis localStorage au montage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) setCartItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Persister dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // Sync DB si connecté
    const token = getToken();
    if (token) {
      fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: product.id, quantity }),
      }).catch(console.error);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== productId));

    const token = getToken();
    if (token) {
      fetch(`/api/cart/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(console.error);
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );

    const token = getToken();
    if (token) {
      fetch(`/api/cart/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ quantity }),
      }).catch(console.error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');

    const token = getToken();
    if (token) {
      fetch('/api/cart', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(console.error);
    }
  };

  const getTotalItems = () => cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
