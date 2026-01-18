import * as cheerio from "cheerio";

async function fn() {
    const url = "https://www.lookfantastic.fr/c/health-beauty/new/new-in/eu/";

    const response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const produits = $(".product-card");

    produits.each((i, produit) => {
        const title = $(produit)
            .find(".product-item-title")
            .text()
            .trim();
         
        const image = $(produit)
            .find("img.item-image")
            .attr("src");

        const price = $(produit)
            .find(".product-item-price")
            .first()
            .text()
            .trim();

        console.log(
            `Titre: ${title} \n Image: ${image} \n Prix: ${price} \n`
        );
    });
}

fn();
