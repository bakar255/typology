import * as cheerio from "cheerio";

export async function scrapePage(url, category, subCategory) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      console.warn(`⚠️ HTTP ${response.status} pour ${url} - Skipping...`);
      return [];
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const products = [];

    // Essayer différents sélecteurs pour les cartes produit
    const productElements = $("[data-testid='product-tile']").length > 0 
      ? $("[data-testid='product-tile']")
      : $("[class*='ProductCard']").length > 0
      ? $("[class*='ProductCard']")
      : $(".product-card").length > 0
      ? $(".product-card")
      : $("[class*='product']");

    if (productElements.length === 0) {
      console.warn(`⚠️ Aucun produit trouvé sur ${url}`);
      return [];
    }

    productElements.each((i, el) => {
      // Extraire le titre avec plusieurs stratégies
      let title = $(el)
        .find("h2, h3, [class*='title'], [class*='name']")
        .first()
        .text()
        .trim();

      if (!title) {
        title = $(el)
          .find("a")
          .first()
          .attr("title") || $(el)
          .find("a")
          .first()
          .text()
          .trim();
      }

      const brand = $(el)
        .find("[class*='brand']")
        .text()
        .trim() || null;

      const productUrl = $(el)
        .find("a")
        .first()
        .attr("href");

      // Chercher les prix de plusieurs manières
      const rawPrice = $(el)
        .find("[class*='price'], span:contains('€')")
        .first()
        .text()
        .trim();

      // Nettoyage
      const cleanPrice = rawPrice.replace(/\s+/g, " ");

      // Regex pour extraire les prix
      const priceMatch = cleanPrice.match(/([\d,]+)\s*€/);
      const currentPrice = priceMatch ? parseFloat(priceMatch[1].replace(",", ".")) : null;

      // Chercher l'image
      let imageUrl = null;
      const imgSrc = $(el)
        .find("img")
        .first()
        .attr("src") || $(el)
        .find("img")
        .first()
        .attr("data-src");

      if (imgSrc) {
        if (imgSrc.startsWith('http')) {
          imageUrl = imgSrc;
        } else if (imgSrc.startsWith('//')) {
          imageUrl = 'https:' + imgSrc;
        } else if (imgSrc.startsWith('/')) {
          imageUrl = 'https://www.lookfantastic.fr' + imgSrc;
        } else {
          imageUrl = 'https://www.lookfantastic.fr/' + imgSrc;
        }
      }

      // Sauvegarder si on a titre et prix
      if (title && currentPrice) {
        products.push({
          name: title,
          brand,
          price: currentPrice,
          currency: "EUR",
          imageUrl: imageUrl || 'https://via.placeholder.com/300x400?text=' + encodeURIComponent(title),
          productUrl: productUrl ? (productUrl.startsWith('http') ? productUrl : `https://www.lookfantastic.fr${productUrl}`) : null,
          category: `${category} > ${subCategory}`,
          description: null,
          pricePerUnit: null,
          fuild: false,
        });
      }
    });

    return products;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return [];
  }
}
