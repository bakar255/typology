import * as cheerio from "cheerio";

export async function scrapePage(url, category, subCategory) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const products = [];

    $(".product-card").each((i, el) => {
      const title = $(el)
        .find(".product-item-title")
        .text()
        .trim();

      const brand = $(el)
        .find(".product-item-brand")
        .text()
        .trim() || null;

      const productUrl = $(el)
        .find("a")
        .attr("href");

      const rawPrice = $(el)
        .find(".price")
        .text()
        .trim();


      // Nettoyage (supprime espaces invisibles)
      const cleanPrice = rawPrice.replace(/\s+/g, " ");

      // Regex
      const oldPriceMatch = cleanPrice.match(/Prix de vente\s*:?([\d,]+)\s*€/i);
      const currentPriceMatch = cleanPrice.match(/Prix\s*actuel\s*:?([\d,]+)\s*€/i);
      const singlePriceMatch = cleanPrice.match(/([\d,]+)\s*€/);

      // Conversion
      const toNumber = (p) => (p ? parseFloat(p.replace(",", ".")) : null);

      let oldPrice = null;
      let currentPrice = null;

      if (currentPriceMatch) {
        // CAS PROMO
        oldPrice = toNumber(oldPriceMatch?.[1]);
        currentPrice = toNumber(currentPriceMatch[1]);
      } else if (singlePriceMatch) {
        // CAS PRIX UNIQUE
        currentPrice = toNumber(singlePriceMatch[1]);
      }

      const image = $(el)
        .find("img")
        .attr("src");

      const description = $(el)
        .find(".product-item-description")
        .text()
        .trim() || null;

      if (title && currentPrice) {
        products.push({
          name: title,
          brand,
          price: currentPrice,
          oldPrice,
          currency: "EUR",
          imageUrl: image,
          productUrl: productUrl ? `https://www.lookfantastic.fr${productUrl}` : null,
          category: `${category} > ${subCategory}`,
          description,
        });
      }
    });

    return products;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return [];
  }
}
