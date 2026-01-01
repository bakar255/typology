import Header from "@/components/navbar/header";
import { slugData } from "@/data/data";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/router";

interface SlugProps {
    title: string;
    subtitle: string;
    products: [];
}

export default function slug({title, subtitle, products}: SlugProps)  {

    const router = useRouter();
    const { slug } = router.query;

    if(!slug) return null

    return (
        <div>
          <Header/>
            <div className="text-center space-y-10 relative px-4">
              <span className="absolute right-4"></span>
               <h2 className=" text-4xl heading text-foreground mt-20">{title}</h2>
            <h4 className="">{subtitle}</h4>
              </div>
              <div className="flex mt-5 gap-4 px-4">
                   <div className="btnFilter">
                    <input 
                    type="text" 
                    className="text-black outline-none" 
                    placeholder="Marque"
                    />
                     <Search  size={16} className="ml-5"/>
                   </div>
                  <select className="btnFilter py-5">
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
                    <button className="flex items-center justify-center px-4 py-2 border border-black bg-white text-sm hover:bg-gray-50">
                      Filtrer<Filter size={16} className="ml-2" />
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 border border-black bg-white text-sm hover:bg-gray-50">
                      Trier<ArrowUpDown size={16} className="ml-2" />
                    </button>
                  </div>
              </div>
        </div>
    )
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

  return {
    props: {
      title: data.title,
      subtitle: data.subtitle,
      products: data.products,
    },
  };
}