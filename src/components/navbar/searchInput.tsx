import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '@/context/SearchContext';
import Image from 'next/image';
import { Product } from '@/data/products';

export default function SearchInput() {
  const { setSearchQuery, searchResults, setSearchResults, isSearchOpen, setIsSearchOpen, performSearch } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Charger les produits au montage pour la recherche
    fetch('/api/products?limit=100')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products for search:', err));
  }, []);

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
    <div className="relative">
      <div className='flex items-center  min-w-80 h-10 py-2 px-2 text-foreground border-b border-[#c4c4c4] '>
        <input
          type="text"
          placeholder="Rechercher un produit..."
          className='outline-none flex-1 leading-5 tracking-wider font-light'
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Search size={16} className='text-foreground'/>
      </div>

      {/* Search Results Dropdown */}
      {isSearchOpen && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-64 overflow-y-auto z-100">
          {searchResults.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
            >
              <Image
                src={product.image}
                alt={product.titre}
                width={20}
                height={20}
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
  );
}