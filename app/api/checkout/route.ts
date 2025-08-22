import { NextResponse } from 'next/server';
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

    // تحويل السعر إلى سنت
    const amount = Math.round(price * 100);

    // استخدام NEXT_PUBLIC_URL أو localhost في التطوير
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
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
