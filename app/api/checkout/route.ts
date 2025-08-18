import { NextResponse } from 'next/server';
import React from 'react';
import Stripe from 'stripe';

// تأكد أن المفتاح موجود
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("⚠ STRIPE_SECRET_KEY is missing in environment variables!");
}

// تهيئة Stripe مع تحديد الـ API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
});

export async function POST(request: Request) {
  try {
    const { name, price } = await request.json();

    // تحقق من المدخلات
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Invalid product name' }, { status: 400 });
    }
    if (!price || typeof price !== 'number') {
      return NextResponse.json({ error: 'Invalid product price' }, { status: 400 });
    }

    // استخدام NEXT_PUBLIC_URL أو localhost في التطوير
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    // إذا السعر بالدولار نحوله للسنت (stripe يحتاج سنت)
    const price2 = React.useMemo(() => {
        const min = 100;
        const max = 700;
        return +(Math.random() * (max - min) + min).toFixed(2);
      }, []);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name },
            unit_amount: price2,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,

    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Error during checkout session creation:", error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}
