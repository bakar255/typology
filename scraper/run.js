

async function fn() {

const URL = "https://www.lookfantastic.fr/c/health-beauty/new/new-in/eu/"

const response = await fetch(url, {
method: "GET",
});


// Parsing
const parser = DOMParser;
const doc = parser.parseFromString(htmlText, "text/html" );

const produits = querySelectorAll("product-card");

produits.forEach((i, produits) => {
    const productTitle = produits.querySelector('product-item-title')
    const price = produits.querySelector("span.text-[14px]").textContent;
    console.log(price, productTitle);
});


return response.text();
}