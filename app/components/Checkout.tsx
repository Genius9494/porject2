// components/Checkout.tsx

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-public-key-here');  // استخدم مفتاح الـ public الخاص بك هنا

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    setIsProcessing(true);

    try {
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        setErrorMessage(error.message);
      } else {
        const response = await fetch('/api/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token.id }),
        });

        const data = await response.json();

        if (data.success) {
          alert('Payment successful!');
        } else {
          setErrorMessage(data.message);
        }
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <CardElement />
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <button disabled={isProcessing || !stripe}>Pay</button>
    </form>
  );
};

const Checkout: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
