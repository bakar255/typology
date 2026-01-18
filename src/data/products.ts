export interface Product {
    id: number;
    titre: string;
    description: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    category?: string;
    isBestSeller: boolean;
    detailedDescription?: string;
    ingredients?: string[];
    benefits?: string[];
}

export const products: Product[] = [
    {
        id: 1, 
        titre: "T-26 - Beaume à lèvres",
        description: "Sérum hydratant pour une peau plus jeune",
        image: "/dior6.webp",
        price: 45.99,
        rating: 4.8,
        reviews: 124,
        category: "Skincare",
        isBestSeller: true,
        detailedDescription: "Notre baume à lèvres T-26 est formulé avec des ingrédients naturels pour hydrater et protéger vos lèvres toute la journée. Enrichi en beurre de karité et vitamine E.",
        ingredients: ["Beurre de karité", "Vitamine E", "Cire d'abeille", "Huile de coco"],
        benefits: ["Hydratation 24h", "Protection UV", "Effet repulpant", "Goût naturel"]
    },
    {
        id: 2, 
        titre: "T-41 - Crème Hydratante",
        description: "Combinaison d'acide + Fond de teint",
        image: "/dior.jpg",
        price: 59.99,
        rating: 4.6,
        reviews: 89,
        category: "Skincare",
        isBestSeller: true,
        detailedDescription: "Notre crème hydratante T-41 combine des acides naturels avec un fond de teint léger pour une peau parfaite et hydratée toute la journée.",
        ingredients: ["Acide hyaluronique", "Vitamine C", "Aloe vera", "Extrait de thé vert"],
        benefits: ["Hydratation intense", "Anti-âge", "Teint unifié", "Protection SPF"]
    },
    {
        id: 3, 
        titre: "T-61 - Rouge à lèvre",
        description: "Mélange d'acides exotiques + Arômes naturelle",
        image: "/dior5.webp",
        price: 28.50,
        rating: 4.7,
        reviews: 156,
        category: "Maquillages",
        isBestSeller: true,
        detailedDescription: "Rouge à lèvres T-61 avec des acides exotiques et des arômes naturels pour des lèvres colorées et soignées.",
        ingredients: ["Acides de fruits", "Arômes naturels", "Cire végétale", "Pigments minéraux"],
        benefits: ["Couleur intense", "Longue tenue", "Arômes naturels", "Soin des lèvres"]
    },
    {
        id: 4, 
        titre: "T-53 - Rouge à lèvre",
        description: "Rouge à lèvre élégant et portatif + Naturel",
        image: "/dior4.jpg",
        price: 39.99,
        rating: 4.5,
        reviews: 67,
        category: "Maquillages",
        isBestSeller: false,
        detailedDescription: "Rouge à lèvres T-53 élégant et portable, formulé avec des ingrédients naturels pour un look sophistiqué.",
        ingredients: ["Pigments naturels", "Cire d'abeille", "Huile d'argan", "Vitamine E"],
        benefits: ["Couleur élégante", "Portable", "Ingrédients naturels", "Longue tenue"]
    },
    {
        id: 5, 
        titre: "T-32 - Exfoliant français",
        description: "Exfoliant doux aux micro-grains",
        image: "/dior3.webp",
        price: 22.99,
        rating: 4.4,
        reviews: 93,
        category: "Bodycare",
        isBestSeller: false,
        detailedDescription: "Exfoliant T-32 aux micro-grains français pour une peau douce et lisse. Formule douce et efficace.",
        ingredients: ["Micro-grains français", "Aloe vera", "Huile de jojoba", "Extrait de lavande"],
        benefits: ["Exfoliation douce", "Peau lisse", "Micro-grains français", "Apaisant"]
    },
    {
        id: 6, 
        titre: "T-66 - Baume à lèvre",
        description: "Toner purifiant et équilibrant le pH",
        image: "/dior2.jpg",
        price: 18.23,
        rating: 4.3,
        reviews: 78,
        category: "Skincare",
        isBestSeller: false,
        detailedDescription: "Baume à lèvres T-66 avec propriétés tonifiantes pour équilibrer le pH et purifier les lèvres.",
        ingredients: ["Extrait de thé vert", "Acide salicylique", "Menthe", "Vitamine B5"],
        benefits: ["Purifiant", "Équilibre le pH", "Rafraîchissant", "Soin des lèvres"]
    }
];
