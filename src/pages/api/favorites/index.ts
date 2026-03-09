import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = getAuthUser(req);
  if (!auth) return res.status(401).json({ message: 'Non authentifié' });

  // GET — récupérer les favoris
  if (req.method === 'GET') {
    const favorites = await prisma.favorite.findMany({
      where: { userId: auth.userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(favorites);
  }

  // POST — toggle favori (ajoute ou retire)
  if (req.method === 'POST') {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId requis' });

    const existing = await prisma.favorite.findUnique({
      where: { userId_productId: { userId: auth.userId, productId } },
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return res.status(200).json({ favorited: false });
    }

    await prisma.favorite.create({ data: { userId: auth.userId, productId } });
    return res.status(201).json({ favorited: true });
  }

  return res.status(405).end();
}
