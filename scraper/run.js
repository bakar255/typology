import { scrapePage } from "./scrape-page.js";

async function fn() {
  const url = "https://www.lookfantastic.fr/c/health-beauty/parfum/voir-tout/";
  const category = "Parfums";
  const subCategory = "Fragrances";

  const parfums = await scrapePage(url, category, subCategory);

  console.log(parfums);
}

fn();
