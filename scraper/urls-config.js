/**
 * Configuration des URLs à scraper avec leurs catégories et sous-catégories
 * 
 * Format:
 * {
 *   url: "URL à scraper",
 *   category: "Catégorie principale",
 *   subCategory: "Sous-catégorie"
 * }
 * 
 * La catégorie sera stockée au format "Catégorie > Sous-catégorie" dans la base de données
 */

export const urlConfig = [
  // Cosmétique
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/new/new-in/eu/",
    category: "Cosmétique",
    subCategory: "Nouveautés",
  },

  // Maquillages
  {
    url: "https://www.lookfantastic.fr/c/maquillage/rouge-a-levres/eu/",
    category: "Maquillages",
    subCategory: "Rouge à lèvres",
  },
  {
    url: "https://www.lookfantastic.fr/c/maquillage/fond-de-teint/eu/",
    category: "Maquillages",
    subCategory: "Fond de teint",
  },
  {
    url: "https://www.lookfantastic.fr/c/maquillage/mascara/eu/",
    category: "Maquillages",
    subCategory: "Mascara",
  },

  // Parfums
  {
    url: "https://www.lookfantastic.fr/c/health-beauty/parfum/voir-tout/",
    category: "Parfums",
    subCategory: "Fragrances",
  },

  // Bodycare
  {
    url: "https://www.lookfantastic.fr/c/bodycare/body-care/eu/",
    category: "Bodycare",
    subCategory: "Soins du corps",
  },

  // Skincare
  {
    url: "https://www.lookfantastic.fr/c/skincare/face-care/eu/",
    category: "Skincare",
    subCategory: "Soins visage",
  },
  {
    url: "https://www.lookfantastic.fr/c/skincare/cleansers/eu/",
    category: "Skincare",
    subCategory: "Nettoyants",
  },

];
