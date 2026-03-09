import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = getAuthUser(req);
  if (!auth) return res.status(401).json({ message: 'Non authentifié' });

  const productId = parseInt(req.query.productId as string);
  if (isNaN(productId)) return res.status(400).json({ message: 'productId invalide' });

  // PATCH — mettre à jour la quantité
  if (req.method === 'PATCH') {
    const { quantity } = req.body;
    if (quantity <= 0) {
      await prisma.cartItem.deleteMany({ where: { userId: auth.userId, productId } });
      return res.status(200).json({ message: 'Article supprimé' });
    }
    const item = await prisma.cartItem.update({
      where: { userId_productId: { userId: auth.userId, productId } },
      data: { quantity },
      include: { product: true },
    });
    return res.status(200).json(item);
  }

  // DELETE — supprimer un article
  if (req.method === 'DELETE') {
    await prisma.cartItem.deleteMany({ where: { userId: auth.userId, productId } });
    return res.status(200).json({ message: 'Article supprimé' });
  }

  return res.status(405).end();
}
