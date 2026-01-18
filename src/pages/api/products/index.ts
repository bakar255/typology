import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { category, subCategory, limit } = req.query;

    let where: any = {};

    // Filtrage par catégorie
    if (category) {
      if (subCategory) {
        // Format: "Catégorie > Sous-catégorie"
        where.category = {
          contains: `${category} > ${subCategory}`,
        };
      } else {
        // Recherche par catégorie seule (commence par "Catégorie >")
        where.category = {
          startsWith: `${category} >`,
        };
      }
    }

    const products = await prisma.product.findMany({
      where,
      take: limit ? parseInt(limit as string) : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transformation des données pour correspondre au format attendu
    const transformedProducts = products.map((product) => ({
      id: product.id,
      titre: product.name,
      description: product.description || '',
      image: product.imageUrl || '/placeholder.jpg',
      price: product.price || 0,
      rating: 4.5,
      reviews: 0,
      category: product.category || undefined,
      isBestSeller: false,
      brand: product.brand,
      currency: product.currency,
      productUrl: product.productUrl,
    }));

    return res.status(200).json(transformedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
