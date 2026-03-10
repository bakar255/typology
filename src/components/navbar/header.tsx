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
    <div className="w-full sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="py-4 px-4">
        <div className="max-w-[1700px] mx-auto">

          <div className="flex items-center">

            <div className="flex-1 flex">
              <div className="hidden md:block w-72 xl:w-80">
                <SearchInput />
              </div>
            </div>

            <Logo />

            <div className="flex-1 flex justify-end items-center gap-1">

            {/* Panier */}
            <Cart />

            {/* Utilisateur */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => isAuthenticated ? setUserMenuOpen((v) => !v) : router.push('/login')}
                className="flex items-center gap-2 font-medium  py-2 px-3 rounded transition-colors cursor-pointer"
              >
                <CircleUserIcon size={28} />
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

          {/* Mobile search: full width below the top row */}
          <div className="md:hidden mt-2">
            <SearchInput />
          </div>

        </div>
      </div>

      <NavigationSection />
    </div>
  );
}
