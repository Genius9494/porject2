'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 500 }), // $5.00
    });

    const data = await res.json();
    const stripe = await stripePromise;

    if (stripe && data.id) {
      stripe.redirectToCheckout({ sessionId: data.id });
    }

    setLoading(false);
  };

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">اشترِ أرصدة للعبة</h1>
      <button
        onClick={handleCheckout}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'جارٍ التحويل...' : 'اشترِ بـ 5 دولار'}
      </button>
    </main>
  );
}
