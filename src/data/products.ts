export interface Product {
    id: number;
    titre: string;
    description: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    category: string;
    subcategory?: string;
    isBestSeller: boolean;
    detailedDescription?: string;
    ingredients?: string[];
    benefits?: string[];
    slug?: string;
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
        subcategory: "Sérums",
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
        subcategory: "Sérums",
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
        category: "Maquillage",
        subcategory: "Rouge à lèvres",
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
        category: "Maquillage",
        subcategory: "Rouge à lèvres",
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
        subcategory: "Gommages",
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
        subcategory: "Toniques",
        isBestSeller: false,
        detailedDescription: "Baume à lèvres T-66 avec propriétés tonifiantes pour équilibrer le pH et purifier les lèvres.",
        ingredients: ["Extrait de thé vert", "Acide salicylique", "Menthe", "Vitamine B5"],
        benefits: ["Purifiant", "Équilibre le pH", "Rafraîchissant", "Soin des lèvres"]
    },
    {
        id: 7,
        titre: "Cérave - Crème Hydratante Intensive",
        description: "Soin hydratant riche avec céramides",
        image: "/beauty.png",
        price: 34.99,
        rating: 4.8,
        reviews: 243,
        category: "Skincare",
        subcategory: "Sérums",
        isBestSeller: true,
        detailedDescription: "Crème hydratante intensive Cérave avec 3 céramides essentiels et acide hyaluronique pour une hydratation 24h.",
        ingredients: ["Céramides", "Acide hyaluronique", "Glycérine", "Niacinamide"],
        benefits: ["Hydratation 24h", "Apaise les irritations", "Restaure la barrière cutanée", "Non comédogène"]
    },
    {
        id: 8,
        titre: "Kilian - Good Girl Gone Bad",
        description: "Parfum féminin intense et audacieux",
        image: "/kilian.png",
        price: 89.99,
        rating: 4.7,
        reviews: 156,
        category: "Parfums",
        subcategory: "Parfum Femme",
        isBestSeller: true,
        detailedDescription: "Parfum Kilian Good Girl Gone Bad - un fragrance intense avec notes florales et épicées.",
        ingredients: ["Fleur d'oranger", "Épices", "Musc blanc", "Ambroxan"],
        benefits: ["Longue tenue", "Silage important", "Raffiné et sensuel", "Édition limitée"]
    },
    {
        id: 9,
        titre: "Kayali - Cheirosa 91",
        description: "Eau de Toilette tropicale et fruitée",
        image: "/kayali.webp",
        price: 65.99,
        rating: 4.9,
        reviews: 234,
        category: "Parfums",
        subcategory: "Parfum Femme",
        isBestSeller: true,
        detailedDescription: "Cheirosa 91 de Kayali - un parfum tropical fruitée avec notes de bergamote et polysantol.",
        ingredients: ["Bergamote", "Framboise", "Polysantol", "Cèdre"],
        benefits: ["Frais et fruité", "Parfait pour l'été", "Longue durée", "Unisexe"]
    },
    {
        id: 10,
        titre: "Kevin - Huile de Corps Premium",
        description: "Huile nourrissante anti-vergetures",
        image: "/kevin.png",
        price: 44.50,
        rating: 4.6,
        reviews: 189,
        category: "Bodycare",
        subcategory: "Huiles",
        isBestSeller: true,
        detailedDescription: "Huile de corps premium Kevin - formule riche en huiles essentielles pour nourrir et protéger la peau.",
        ingredients: ["Huile de jojoba", "Vitamine E", "Huile de rose", "Huile d'argan"],
        benefits: ["Anti-vergetures", "Peau satinée", "Arôme délicat", "Absorption rapide"]
    },
    {
        id: 11,
        titre: "Essence - Masque Purifiant",
        description: "Masque détoxifiant à charbon actif",
        image: "/dior3.webp",
        price: 19.99,
        rating: 4.7,
        reviews: 312,
        category: "Skincare",
        subcategory: "Masques",
        isBestSeller: true,
        detailedDescription: "Masque purifiant Essence avec charbon actif pour éliminer les impuretés et ressérrer les pores.",
        ingredients: ["Charbon actif", "Argile", "Extrait de thé noir", "Menthe"],
        benefits: ["Purifiant", "Pores resserrés", "Peau lumineuse", "Effet détoxifiant"]
    },
    {
        id: 12,
        titre: "Paco Rabanne - Fame",
        description: "Eau de Parfum masculine intense",
        image: "/dior.jpg",
        price: 79.99,
        rating: 4.8,
        reviews: 201,
        category: "Parfums",
        subcategory: "Parfum Homme",
        isBestSeller: true,
        detailedDescription: "Fame by Paco Rabanne - un parfum masculin intense avec notes boisées et épicées.",
        ingredients: ["Cardamome", "Cèdre", "Vetiver", "Cuir"],
        benefits: ["Masculin et puissant", "Longue tenue", "Luxueux", "Parfait pour les rendez-vous"]
    },
    {
        id: 13,
        titre: "Niacinamide - Sérum Éclat",
        description: "Sérum concentré pour peau terne",
        image: "/dior5.webp",
        price: 32.99,
        rating: 4.5,
        reviews: 167,
        category: "Skincare",
        subcategory: "Sérums",
        isBestSeller: true,
        detailedDescription: "Sérum éclat enrichi en Niacinamide 10% pour combattre l'terne et unifier le teint.",
        ingredients: ["Niacinamide 10%", "Acide hyaluronique", "Arginine", "Peptides"],
        benefits: ["Peau rayonnante", "Réduit les pores", "Anti-rougeurs", "Boost luminosité"]
    },
    {
        id: 14,
        titre: "Lush - Bombe de Bain Détente",
        description: "Bombe effervescente aromatique pour bain",
        image: "/dior6.webp",
        price: 8.99,
        rating: 4.9,
        reviews: 487,
        category: "Bodycare",
        subcategory: "Lotions",
        isBestSeller: true,
        detailedDescription: "Bombe de bain Lush effervescente avec huiles essentielles naturelles pour une détente totale.",
        ingredients: ["Huiles essentielles", "Beurre de cacao", "Pétales de fleurs", "Colorants naturels"],
        benefits: ["Relaxant", "Peau douce", "Aromathérapie naturelle", "Biodégradable"]
    },
    {
        id: 15,
        titre: "Sunscreen - SPF 50 Invisible",
        description: "Écran solaire sans résidu blanc",
        image: "/dior4.jpg",
        price: 27.99,
        rating: 4.8,
        reviews: 156,
        category: "Skincare",
        subcategory: "Sérums",
        isBestSeller: true,
        detailedDescription: "Écran solaire SPF 50 transparent et invisible sur la peau pour une protection UV complète.",
        ingredients: ["Octinoxate", "Oxyde de zinc", "Antioxydants", "Vitamine E"],
        benefits: ["Protection UVA/UVB", "Sans résidu blanc", "Hydratant", "Matifiant"]
    }
];

/**
 * Mappage des catégories/sous-catégories aux slugs
 */
const categoryToSlugMap: Record<string, Record<string, string>> = {
  Skincare: {
    "Nettoyants": "foam-cleanser",
    "Sérums": "hyaluronic-acid",
    "Toniques": "toners",
    "Masques": "clay-mask",
  },
  Bodycare: {
    "Savons": "soap",
    "Gommages": "scrubs",
    "Lotions": "body-lotion",
    "Huiles": "body-oils",
  },
  Maquillage: {
    "Rouge à lèvres": "matte-lipstick",
    "Fond de teint": "liquid-foundation",
    "Fard à paupières": "eyeshadow-palette",
  },
  Parfums: {
    "Parfum Femme": "rose-perfume",
    "Parfum Homme": "vanilla-essence",
  },
  Lots: {
    "Ensembles soins": "anti-aging-kit",
  },
};

/**
 * Assigne automatiquement un slug à chaque produit basé sur sa catégorie et sous-catégorie
 */
export function assignSlugsToProducts(): Product[] {
  return products.map((product) => ({
    ...product,
    slug: categoryToSlugMap[product.category]?.[product.subcategory || ""] || undefined,
  }));
}

/**
 * Récupère tous les produits associés à un slug spécifique
 */
export function getProductsBySlug(slug: string): Product[] {
  const productsWithSlugs = assignSlugsToProducts();
  return productsWithSlugs.filter((product) => product.slug === slug);
}

/**
 * Crée un index mappant chaque slug aux produits correspondants
 */
export function createSlugProductIndex(): Record<string, Product[]> {
  const productsWithSlugs = assignSlugsToProducts();
  const index: Record<string, Product[]> = {};

  productsWithSlugs.forEach((product) => {
    if (product.slug) {
      if (!index[product.slug]) {
        index[product.slug] = [];
      }
      index[product.slug].push(product);
    }
  });

  return index;
}
