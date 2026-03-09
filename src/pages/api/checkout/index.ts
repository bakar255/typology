import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const auth = getAuthUser(req);
  if (!auth) return res.status(401).json({ message: 'Non authentifié' });

  const { items } = req.body as {
    items: { name: string; price: number; quantity: number; image?: string }[];
  };

  if (!items?.length) return res.status(400).json({ message: 'Panier vide' });

  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(Math.max(item.price, 0.01) * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      metadata: { userId: auth.userId.toString() },
    });

    // Sauvegarder la commande en statut "pending"
    await prisma.order.create({
      data: {
        userId: auth.userId,
        stripeSessionId: session.id,
        amount: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        currency: 'eur',
        status: 'pending',
        items: items as any,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return res.status(500).json({ message: error.message });
  }
}
