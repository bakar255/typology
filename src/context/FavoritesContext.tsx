import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  favoriteIds: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => Promise<void>;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
};

const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    setIsLoading(true);
    fetch('/api/favorites', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFavoriteIds(data.map((f: any) => f.productId));
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const isFavorite = (productId: number) => favoriteIds.includes(productId);

  const toggleFavorite = async (productId: number) => {
    const token = getToken();
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Optimistic update
    const wasFavorite = favoriteIds.includes(productId);
    setFavoriteIds((prev) =>
      wasFavorite ? prev.filter((id) => id !== productId) : [...prev, productId]
    );

    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Rollback on error
      setFavoriteIds((prev) =>
        wasFavorite ? [...prev, productId] : prev.filter((id) => id !== productId)
      );
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
};
