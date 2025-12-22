import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </CartProvider>
  );
}
