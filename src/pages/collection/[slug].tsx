import Footer from "@/components/footer";
import Header from "@/components/navbar/header";
import { slugData } from "@/data/data";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/router";
import { prisma } from "@/lib/prisma";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  brand?: string | null;
}

interface SlugProps {
  title: string;
  subtitle: string;
  products: ProductCardProps[];
}

export default function SlugPage({ title, subtitle, products }: SlugProps) {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return null;

  return (
    <div>
      <Header />
      <div className="text-center space-y-10 relative px-4">
        <span className="absolute right-4"></span>

        <h2 className=" text-4xl heading font-medium playfair-family mt-20">{title}</h2>
        <h4 className="font-medium ">{subtitle}</h4>

      </div>
      <div className="flex mt-5 gap-4 px-6">
        <div className="btnFilter">
          <input
            type="text"
            className="text-black outline-none"
            placeholder="Marque"
          />
          <Search size={16} className="ml-5" />
        </div>
        <select className="btnFilter py-5 px-5">
          <option>Préparation cheveux</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
        <select className="btnFilter relative">
          <option>Genre</option>
          <option>Homme</option>
          <option>Femme</option>
          <option>Unisexe</option>
        </select>
        <div className="ml-auto flex gap-2">
          <button className="flex cursor-pointer items-center justify-center px-4 py-2 border border-black bg-white text-sm hover:bg-gray-50">
            Filtrer
            <Filter size={16} className="ml-2" />
          </button>
          <button className="flex items-center cursor-pointer justify-center px-4 py-2 border border-black bg-white text-sm hover:bg-gray-50">
            Trier
            <ArrowUpDown size={16} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Grid des produits réels depuis la DB */}
      <div className="px-4 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <img
              src={product.imageUrl || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-64 object-cover bg-amber-50"
            />
            <div className="p-4 flex flex-col gap-2">
              {product.brand && (
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {product.brand}
                </span>
              )}
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <span className="font-medium">{product.price.toFixed(2)} €</span>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            Aucun produit trouvé pour cette collection.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = slugData.map((item) => ({
    params: { slug: item.slug },
  }));

  return { paths, fallback: false }; // false = 404
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = slugData.find((item) => item.slug === slug);

  if (!data) {
    return { notFound: true };
  }

  // On récupère les produits réels depuis la DB en filtrant par categoryKey
  const productsFromDb = await prisma.product.findMany({
    where: data.categoryKey
      ? {
          category: {
            contains: data.categoryKey,
          },
        }
      : {},
    orderBy: {
      createdAt: "desc",
    },
    take: 24,
  });

  const products = productsFromDb.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price ?? 0,
    imageUrl: p.imageUrl ?? "/placeholder.jpg",
    brand: p.brand,
  }));

  return {
    props: {
      title: data.title,
      subtitle: data.subtitle,
      products,
    },
  };
}