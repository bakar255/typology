import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </CartProvider>
  );
}
