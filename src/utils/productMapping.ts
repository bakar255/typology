/**
 * Utilitaires pour le mapping des produits aux slugs
 * Ce fichier centralise toutes les fonctions de mapping produit-slug
 */

import { products, assignSlugsToProducts, getProductsBySlug as getProductsBySlugFromProducts, createSlugProductIndex } from "@/data/products";
import { slugData } from "@/data/data";
import type { Product } from "@/data/products";

/**
 * Interface pour les résultats du mapping
 */
export interface SlugProductMapping {
  slug: string;
  title: string;
  subtitle: string;
  categoryKey: string;
  products: Product[];
  productCount: number;
}

/**
 * Récupère tous les produits mappés avec leurs slugs respectifs
 */
export function getAllProductsWithSlugs(): Product[] {
  return assignSlugsToProducts();
}

/**
 * Récupère les produits pour un slug spécifique avec les métadonnées
 */
export function getSlugProductMapping(slug: string): SlugProductMapping | null {
  const slugData_item = slugData.find((item) => item.slug === slug);
  
  if (!slugData_item) {
    return null;
  }

  const products_list = getProductsBySlugFromProducts(slug);

  return {
    slug,
    title: slugData_item.title,
    subtitle: slugData_item.subtitle,
    categoryKey: slugData_item.categoryKey,
    products: products_list,
    productCount: products_list.length,
  };
}

/**
 * Crée un mappage complet slug -> produits avec métadonnées
 */
export function createCompleteSlugMapping(): SlugProductMapping[] {
  return slugData
    .map((item) => getSlugProductMapping(item.slug))
    .filter((mapping): mapping is SlugProductMapping => mapping !== null);
}

/**
 * Obtient les statistiques de mapping
 */
export function getMappingStatistics() {
  const allProducts = getAllProductsWithSlugs();
  const mappedProducts = allProducts.filter((p) => p.slug);
  const unmappedProducts = allProducts.filter((p) => !p.slug);
  const slugIndex = createSlugProductIndex();

  return {
    totalProducts: allProducts.length,
    mappedCount: mappedProducts.length,
    unmappedCount: unmappedProducts.length,
    mappingPercentage: ((mappedProducts.length / allProducts.length) * 100).toFixed(2),
    slugsWithProducts: Object.keys(slugIndex).length,
    slugWithMostProducts: Object.entries(slugIndex).reduce(
      (acc, [slug, prods]) => (prods.length > acc.count ? { slug, count: prods.length } : acc),
      { slug: "", count: 0 }
    ),
    unmappedProducts: unmappedProducts.map((p) => ({ id: p.id, titre: p.titre, category: p.category })),
  };
}

/**
 * Vérifie si un produit est mappé à un slug
 */
export function isProductMapped(productId: number): boolean {
  const product = getAllProductsWithSlugs().find((p) => p.id === productId);
  return !!product?.slug;
}

/**
 * Obtient le slug d'un produit par son ID
 */
export function getSlugByProductId(productId: number): string | undefined {
  const product = getAllProductsWithSlugs().find((p) => p.id === productId);
  return product?.slug;
}

/**
 * Cherche des produits par mot-clé dans un slug spécifique
 */
export function searchProductsInSlug(slug: string, keyword: string): Product[] {
  const products_list = getProductsBySlugFromProducts(slug);
  const lowerKeyword = keyword.toLowerCase();

  return products_list.filter(
    (p) =>
      p.titre.toLowerCase().includes(lowerKeyword) ||
      p.description.toLowerCase().includes(lowerKeyword) ||
      p.detailedDescription?.toLowerCase().includes(lowerKeyword)
  );
}
