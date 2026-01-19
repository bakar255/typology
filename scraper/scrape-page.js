import * as cheerio from "cheerio";

export async function scrapePage(url, category, subCategory) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const html = await response.text();
  const $ = cheerio.load(html);

  const products = [];

  $(".product-card").each((i, el) => {
    const title = $(el)
      .find(".product-item-title")
      .text()
      .trim();

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


    products.push({
      title,
       oldPrice,
       currentPrice,
      image,
      category,
      subCategory,
    });
  });


  return products;
}
