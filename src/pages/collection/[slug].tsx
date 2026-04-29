import Footer from "@/components/footer";
import Header from "@/components/navbar/header";
import ProductCard from "@/components/ProductCard";
import { slugData } from "@/data/data";
import { extractVolume, Product } from "@/data/products";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "@/lib/prisma";

interface SlugProps {
  title: string;
  subtitle: string;
  products: Product[];
}

export default function SlugPage({ title, subtitle, products }: SlugProps) {
  const router = useRouter();
  const { slug } = router.query;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    let filtered = products;

    if (query.length > 0) {
      filtered = filtered.filter((product) => {
        const searchable = [
          product.titre,
          product.category,
          product.brand ?? "",
          product.description,
        ]
          .join(" ")
          .toLowerCase();
        return searchable.includes(query);
      });
    }

    if (sortOrder === "price-asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, searchTerm, sortOrder]);

  if (!slug) return null;

  return (
    <div className="">
      <Header />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mt-20 mb-8">
          <h2 className="collection-title text-4xl">{title}</h2>
          <h4 className="collection-subtitle text-sm max-w-xl mx-auto leading-relaxed">{subtitle}</h4>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-gray-200">
          {/* Search */}
          <div className="relative flex-1 min-w-40">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 text-sm bg-white outline-none focus:border-black transition-colors"
              placeholder="Rechercher un produit, une marque ou une catégorie..."
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="pl-9 pr-8 py-2.5 border border-gray-300 text-sm bg-white outline-none focus:border-black transition-colors cursor-pointer appearance-none"
            >
              <option value="default">Nouveautés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>

          {/* Genre */}
          <div className="relative">
            <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select className="pl-9 pr-8 py-2.5 border border-gray-300 text-sm bg-white outline-none focus:border-black transition-colors cursor-pointer appearance-none">
              <option>Tous</option>
            </select>
          </div>

          {/* Count */}
          <span className="ml-auto text-sm text-gray-400 tracking-wide">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid mb-18 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              Aucun produit trouvé pour cette collection.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = slugData.map((item) => ({
    params: { slug: item.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = slugData.find((item) => item.slug === slug);

  if (!data) {
    return { notFound: true };
  }

  let products: Product[] = [];

  try {
    const productsFromDb = await prisma.product.findMany({
      where: data.categoryKey
        ? { category: { contains: data.categoryKey } }
        : {},
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    const nameFilters = (data as any).nameFilters as string[] | undefined;
    const filtered = nameFilters?.length
      ? productsFromDb.filter((p) => {
          const nameLower = p.name.toLowerCase();
          return nameFilters.some((f) => nameLower.includes(f.toLowerCase()));
        })
      : productsFromDb;

    products = filtered.slice(0, 48).map((p) => ({
      id: p.id,
      titre: p.name,
      description: p.description || "",
      image: p.imageUrl ?? "/placeholder.jpg",
      price: p.price ?? 0,
      rating: 4.5,
      reviews: 0,
      category: p.category || "",
      isBestSeller: false,
      volume: extractVolume(p.name),
      brand: p.brand,
    }));
  } catch (error) {
    console.error("Failed to fetch products from database:", error);
    products = [];
  }

  return {
    props: { title: data.title, subtitle: data.subtitle, products },
    revalidate: 3600,
  };
}
