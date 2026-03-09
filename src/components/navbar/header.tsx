import { useEffect, useRef, useState } from 'react';
import { CircleUserIcon, Heart, LogOut, ShoppingBag, User } from 'lucide-react';
import { ButtonHeader } from '../ui/headerButton';
import Cart from './cart';
import SearchInput from './searchInput';
import NavigationSection from './navigationSection';
import Logo from '../ui/logo';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import Link from 'next/link';

export default function Header() {
  const { user, isAuthenticated, login, logout, isLoading, token } = useAuth();
  const { getTotalItems } = useCart();
  const { favoriteIds } = useFavorites();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch profile on mount if token exists but user not loaded
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      const savedToken = localStorage.getItem('token');
      if (!savedToken) return;
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${savedToken}` } })
        .then((r) => r.json())
        .then((data) => {
          if (data.user) login(data.user, savedToken);
          else logout();
        })
        .catch(() => logout());
    }
  }, [isLoading, isAuthenticated]);

  // Fermer le menu au clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  const cartCount = getTotalItems();
  const favCount = favoriteIds.length;

  return (
    <div className="w-full">
      <div className="py-4 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-[1700px] mx-auto relative">

          <SearchInput />
          <Logo />

          <div className="absolute top-4 right-5 flex items-center gap-4">

            {/* Favoris */}
            <Link href="/favorites" className="relative p-1 hover:text-gray-500 transition-colors">
              <Heart size={20} />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {favCount > 9 ? '9+' : favCount}
                </span>
              )}
            </Link>

            {/* Panier */}
            <Cart />

            {/* Utilisateur */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => isAuthenticated ? setUserMenuOpen((v) => !v) : router.push('/login')}
                className="flex items-center gap-2 hover:bg-gray-100 py-1.5 px-3 rounded transition-colors"
              >
                <CircleUserIcon size={20} />
                {isAuthenticated && user ? (
                  <span className="font-medium text-sm hidden md:block">{user.name || user.email}</span>
                ) : (
                  <span className="font-medium text-sm hidden md:block">Se connecter</span>
                )}
              </button>

              {/* Dropdown menu */}
              {isAuthenticated && userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link
                    href="/favorites"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <Heart size={15} />
                    Mes favoris {favCount > 0 && `(${favCount})`}
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <ShoppingBag size={15} />
                    Mon panier {cartCount > 0 && `(${cartCount})`}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                  >
                    <LogOut size={15} />
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <NavigationSection />
    </div>
  );
}
