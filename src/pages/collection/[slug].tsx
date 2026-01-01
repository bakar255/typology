import Header from "@/components/navbar/header";
import { useRouter } from "next/router";


interface SlugProps {
    title: string;
    subTitle: string;
    products: [];
}

export default function slug({title, subTitle, products}: SlugProps)  {

    const router = useRouter();
    const { slug } = router.query;

    if(!slug) return null

    return (
        <div>
            <Header />
            <h2 className="text-center text-3xl heading mt-20">{title}</h2>
        </div>
    )



}