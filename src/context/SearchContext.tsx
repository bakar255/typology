import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/data/products';

interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchResults: Product[];
    setSearchResults: (results: Product[]) => void;
    isSearchOpen: boolean;
    setIsSearchOpen: (open: boolean) => void;
    performSearch: (products: Product[], query: string) => Product[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const performSearch = (products: Product[], query: string): Product[] => {
        if (!query.trim()) return [];
        
        const lowercaseQuery = query.toLowerCase();
        return products.filter(product =>
            product.titre.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery)
        );
    };

    const value: SearchContextType = {
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        isSearchOpen,
        setIsSearchOpen,
        performSearch,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};
