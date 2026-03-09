import Footer from "@/components/footer";
import Header from "@/components/navbar/header";
import ProductCard from "@/components/ProductCard";
import { slugData } from "@/data/data";
import { extractVolume, Product } from "@/data/products";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
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

  if (!slug) return null;

  return (
    <div className="">
      <Header />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mt-20 mb-8">
          <h2 className="collection-title text-4xl">{title}</h2>
          <h4 className="collection-subtitle text-sm max-w-xl mx-auto leading-relaxed">{subtitle}</h4>
        </div>

        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-200">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              className="pl-9 pr-4 py-2.5 w-64 border border-gray-300 text-sm bg-white outline-none focus:border-black transition-colors"
              placeholder="Rechercher une marque..."
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select className="pl-9 pr-8 py-2.5 border border-gray-300 text-sm bg-white outline-none focus:border-black transition-colors cursor-pointer appearance-none">
              <option>Nouveautés</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Popularité</option>
            </select>
          </div>

          {/* Genre */}
          <div className="relative">
            <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select className="pl-9 pr-8 py-2.5 border border-gray-300 text-sm bg-white outline-none focus:border-black transition-colors cursor-pointer appearance-none">
              <option>Tous</option>
              <option>Femme</option>
              <option>Homme</option>
              <option>Unisexe</option>
            </select>
          </div>

          {/* Count */}
          <span className="ml-auto text-sm text-gray-400 tracking-wide">
            {products.length} produit{products.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid mb-18 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.length === 0 && (
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
      take: 48,
    });

    products = productsFromDb.map((p) => ({
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
