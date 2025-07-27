// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('your-secret-key-here', {
});

export async function POST(request: Request) {
  try {
    const { name, price } = await request.json();

    // سجلات لتسجيل البيانات المستلمة
    console.log("Received data:", { name, price });

    // التحقق من البيانات
    if (!name || !price) {
      console.error("Missing required fields (name or price)");
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // إنشاء الجلسة في Stripe
    console.log("Creating Stripe session...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name, // اسم اللعبة أو المنتج
            },
            unit_amount: price, // السعر بالـ سنت
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    console.log("Session created:", session.id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error during checkout session creation:", error);

    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error },
      { status: 500 }
    );
  }
}
