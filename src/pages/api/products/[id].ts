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
    const { id } = req.query;

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Transformation pour correspondre au format attendu
    const transformedProduct = {
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
      detailedDescription: product.description || '',
    };

    return res.status(200).json(transformedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
