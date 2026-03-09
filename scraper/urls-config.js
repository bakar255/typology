/**
 * Configuration des URLs à scraper avec leurs catégories et sous-catégories
 *
 * Format stocké en DB : "Category > SubCategory"
 * Ce format doit correspondre exactement aux categoryKey dans src/data/data.ts
 */

export const urlConfig = [
  // ── BODYCARE ─────────────────────────────────────────────────────────────
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/body/bath-shower/",
    category: "Bodycare",
    subCategory: "Savons & Nettoyants",
  },
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/body/moisturisers/creams/",
    category: "Bodycare",
    subCategory: "Soins hydratants",
  },

  // ── SKINCARE ──────────────────────────────────────────────────────────────
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/face/skincare-products/cleansers/",
    category: "Skincare",
    subCategory: "Nettoyants",
  },
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/face/skincare-products/specific-care/serums/",
    category: "Skincare",
    subCategory: "Sérums",
  },

  // ── MAQUILLAGE ────────────────────────────────────────────────────────────
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/make-up/complexion/foundations/",
    category: "Maquillage",
    subCategory: "Fond de teint",
  },
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/make-up/lips/lipsticks/",
    category: "Maquillage",
    subCategory: "Rouge à lèvres",
  },
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/make-up/eyes/palettes/",
    category: "Maquillage",
    subCategory: "Fard à paupières",
  },

  // ── PARFUMS ───────────────────────────────────────────────────────────────
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/parfum/femme/shop-all/",
    category: "Parfums",
    subCategory: "Femme",
  },
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/parfum/homme/",
    category: "Parfums",
    subCategory: "Homme",
  },

  // ── LOTS ──────────────────────────────────────────────────────────────────
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/gifting/skincare/",
    category: "Lots",
    subCategory: "Soins de la peau",
  },
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/gifting/makeup/",
    category: "Lots",
    subCategory: "Maquillage",
  },
];
