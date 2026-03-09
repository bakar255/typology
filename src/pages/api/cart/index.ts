import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = getAuthUser(req);
  if (!auth) return res.status(401).json({ message: 'Non authentifié' });

  // GET — récupérer le panier
  if (req.method === 'GET') {
    const items = await prisma.cartItem.findMany({
      where: { userId: auth.userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(items);
  }

  // POST — ajouter un article
  if (req.method === 'POST') {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId requis' });

    const item = await prisma.cartItem.upsert({
      where: { userId_productId: { userId: auth.userId, productId } },
      update: { quantity: { increment: quantity } },
      create: { userId: auth.userId, productId, quantity },
      include: { product: true },
    });
    return res.status(200).json(item);
  }

  // DELETE — vider le panier
  if (req.method === 'DELETE') {
    await prisma.cartItem.deleteMany({ where: { userId: auth.userId } });
    return res.status(200).json({ message: 'Panier vidé' });
  }

  return res.status(405).end();
}
