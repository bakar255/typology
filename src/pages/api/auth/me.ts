import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const auth = getAuthUser(req);
  if (!auth) return res.status(401).json({ message: 'Non authentifié' });

  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { id: true, email: true, name: true },
    });

    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
}
