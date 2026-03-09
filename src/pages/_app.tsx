import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <SearchProvider>
            <Component {...pageProps} />
          </SearchProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}
