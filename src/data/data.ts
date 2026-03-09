/**
 * slugData — table de correspondance slug ↔ categoryKey (DB)
 *
 * categoryKey doit correspondre exactement (ou être contenu dans)
 * la valeur "category > subCategory" stockée par le scraper.
 *
 * Règle : `prisma.product.findMany({ where: { category: { contains: categoryKey } } })`
 *
 * Les slugs "all-*" utilisent uniquement le nom de la catégorie principale
 * afin de matcher tous les produits de cette catégorie (toutes sous-cats confondues).
 */

export const slugData = [
  // ══════════════════════════════════════════════════════════════════════════
  // BODYCARE
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "all-bodycare",
    title: "Bodycare",
    subtitle: "Tous nos soins pour le corps",
    categoryKey: "Bodycare",
  },

  // Savons & Nettoyants
  {
    slug: "bar-soap",
    title: "Savons en barre",
    subtitle: "Nettoyage doux et naturel",
    categoryKey: "Bodycare > Savons & Nettoyants",
  },
  {
    slug: "body-wash",
    title: "Gels douche",
    subtitle: "Fraîcheur et douceur en un geste",
    categoryKey: "Bodycare > Savons & Nettoyants",
  },
  {
    slug: "body-scrub",
    title: "Gommages corporels",
    subtitle: "Exfoliation douce et régénérante",
    categoryKey: "Bodycare > Savons & Nettoyants",
  },

  // Soins hydratants
  {
    slug: "body-lotion",
    title: "Lotions corporelles",
    subtitle: "Hydratation douce et longue durée",
    categoryKey: "Bodycare > Soins hydratants",
  },
  {
    slug: "body-oils",
    title: "Huiles pour le corps",
    subtitle: "Nutrition intense et peau satinée",
    categoryKey: "Bodycare > Soins hydratants",
  },
  {
    slug: "body-butter",
    title: "Beurres corporels",
    subtitle: "Soin riche pour peaux très sèches",
    categoryKey: "Bodycare > Soins hydratants",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SKINCARE
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "all-skincare",
    title: "Skincare",
    subtitle: "Tous nos soins pour le visage",
    categoryKey: "Skincare",
  },

  // Nettoyants
  {
    slug: "gel-cleanser",
    title: "Nettoyants en gel",
    subtitle: "Fraîcheur et légèreté",
    categoryKey: "Skincare > Nettoyants",
  },
  {
    slug: "foam-cleanser",
    title: "Nettoyants moussants",
    subtitle: "Nettoie en douceur sans agresser",
    categoryKey: "Skincare > Nettoyants",
  },
  {
    slug: "micellar-water",
    title: "Eaux micellaires",
    subtitle: "Démaquillage et nettoyage en un geste",
    categoryKey: "Skincare > Nettoyants",
  },

  // Sérums
  {
    slug: "vitamin-c-serum",
    title: "Sérums à la vitamine C",
    subtitle: "Éclat et protection antioxydante",
    categoryKey: "Skincare > Sérums",
  },
  {
    slug: "hyaluronic-acid",
    title: "Acide hyaluronique",
    subtitle: "Hydratation repulpante et intense",
    categoryKey: "Skincare > Sérums",
  },
  {
    slug: "retinol-serum",
    title: "Sérums au rétinol",
    subtitle: "Anti-âge et renouvellement cellulaire",
    categoryKey: "Skincare > Sérums",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MAQUILLAGE
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "all-maquillage",
    title: "Maquillage",
    subtitle: "Toute notre gamme maquillage",
    categoryKey: "Maquillage",
  },

  // Fond de teint
  {
    slug: "liquid-foundation",
    title: "Fonds de teint liquides",
    subtitle: "Couverture modulable et naturelle",
    categoryKey: "Maquillage > Fond de teint",
  },
  {
    slug: "cream-foundation",
    title: "Fonds de teint crème",
    subtitle: "Confort, couvrance et hydratation",
    categoryKey: "Maquillage > Fond de teint",
  },
  {
    slug: "tinted-moisturizer",
    title: "Hydratants teintés",
    subtitle: "Soin et couleur légère au quotidien",
    categoryKey: "Maquillage > Fond de teint",
  },

  // Rouge à lèvres
  {
    slug: "matte-lipstick",
    title: "Rouges à lèvres mats",
    subtitle: "Couleur intense, fini velouté",
    categoryKey: "Maquillage > Rouge à lèvres",
  },
  {
    slug: "glossy-lipstick",
    title: "Rouges à lèvres brillants",
    subtitle: "Brillance et volume",
    categoryKey: "Maquillage > Rouge à lèvres",
  },
  {
    slug: "tinted-balm",
    title: "Baumes teintés",
    subtitle: "Hydratation et touche de couleur",
    categoryKey: "Maquillage > Rouge à lèvres",
  },

  // Fard à paupières
  {
    slug: "eyeshadow-palette",
    title: "Palettes de fards",
    subtitle: "Multiples nuances pour tous les looks",
    categoryKey: "Maquillage > Fard à paupières",
  },
  {
    slug: "cream-eyeshadow",
    title: "Fards à paupières crème",
    subtitle: "Faciles à appliquer, longue tenue",
    categoryKey: "Maquillage > Fard à paupières",
  },
  {
    slug: "mascara",
    title: "Mascaras",
    subtitle: "Volume, longueur et courbe",
    categoryKey: "Maquillage > Fard à paupières",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PARFUMS
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "all-parfums",
    title: "Parfums",
    subtitle: "Toute notre sélection de fragrances",
    categoryKey: "Parfums",
  },

  // Femme
  {
    slug: "rose-perfume",
    title: "Parfums à la rose",
    subtitle: "Féminité et romantisme",
    categoryKey: "Parfums > Femme",
  },
  {
    slug: "jasmine-perfume",
    title: "Parfums au jasmin",
    subtitle: "Sensualité envoûtante",
    categoryKey: "Parfums > Femme",
  },
  {
    slug: "floral-perfume",
    title: "Parfums floraux",
    subtitle: "Légèreté et fraîcheur printanière",
    categoryKey: "Parfums > Femme",
  },

  // Homme
  {
    slug: "sandalwood",
    title: "Parfums au santal",
    subtitle: "Boisé et raffiné",
    categoryKey: "Parfums > Homme",
  },
  {
    slug: "amber-spice",
    title: "Épices ambrées",
    subtitle: "Caractère et intensité",
    categoryKey: "Parfums > Homme",
  },
  {
    slug: "woody-perfume",
    title: "Parfums boisés",
    subtitle: "Profondeur et élégance masculine",
    categoryKey: "Parfums > Homme",
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LOTS
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "all-lots",
    title: "Lots & Coffrets",
    subtitle: "Tous nos coffrets et ensembles",
    categoryKey: "Lots",
  },

  // Soins de la peau
  {
    slug: "anti-aging-kit",
    title: "Kits anti-âge",
    subtitle: "Routine complète pour peaux matures",
    categoryKey: "Lots > Soins de la peau",
  },
  {
    slug: "brightening-bundle",
    title: "Lots éclaircissants",
    subtitle: "Uniformise et illumine le teint",
    categoryKey: "Lots > Soins de la peau",
  },
  {
    slug: "hydration-pack",
    title: "Packs hydratation",
    subtitle: "Soin intense pour peaux sèches",
    categoryKey: "Lots > Soins de la peau",
  },

  // Coffrets maquillage
  {
    slug: "makeup-gift-set",
    title: "Coffrets maquillage",
    subtitle: "Les plus beaux ensembles beauté",
    categoryKey: "Lots > Maquillage",
  },
  {
    slug: "eye-kit",
    title: "Kits yeux",
    subtitle: "Tout pour sublimer votre regard",
    categoryKey: "Lots > Maquillage",
  },
  {
    slug: "lip-kit",
    title: "Kits lèvres",
    subtitle: "Routine lèvres complète",
    categoryKey: "Lots > Maquillage",
  },
];

export function getProductsBySlug(
  slug: string,
  allProducts: any[]
): { slug: string; title: string; subtitle: string; products: any[] } | null {
  const slugItem = slugData.find((item) => item.slug === slug);
  if (!slugItem) return null;

  const matchedProducts = allProducts.filter((product) =>
    product.category?.includes(slugItem.categoryKey)
  );

  return {
    slug,
    title: slugItem.title,
    subtitle: slugItem.subtitle,
    products: matchedProducts,
  };
}
