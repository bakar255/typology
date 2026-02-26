import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <SearchProvider>
        <AuthProvider>
        <Component {...pageProps} />
        </AuthProvider>
      </SearchProvider>
    </CartProvider>
  );
}
