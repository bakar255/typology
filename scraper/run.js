import { scrapePage } from "./scrape-page.js";
import { urlConfig } from "./urls-config.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runScraper() {
  for (const config of urlConfig) {
    console.log(`Scraping ${config.url}...`);
    const products = await scrapePage(config.url, config.category, config.subCategory);

    for (const product of products) {
      try {
        await prisma.product.upsert({
          where: { productUrl: product.productUrl },
          update: product,
          create: {
            ...product,
            externalId: product.productUrl, // Use productUrl as externalId
          },
        });
        console.log(`Saved: ${product.name}`);
      } catch (error) {
        console.error(`Error saving ${product.name}:`, error);
      }
    }

    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  await prisma.$disconnect();
  console.log("Scraping completed.");
}

runScraper().catch(console.error);
