import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const PRICE_IDS: Record<string, string> = {
  course: import.meta.env.VITE_STRIPE_COURSE_PRICE_ID || '',
  membership: import.meta.env.VITE_STRIPE_MEMBERSHIP_PRICE_ID || '',
  coaching: import.meta.env.VITE_STRIPE_COACHING_PRICE_ID || '',
};

export async function redirectToCheckout(tierId: string) {
  const priceId = PRICE_IDS[tierId];
  if (!priceId) {
    throw new Error(`No price ID configured for tier: ${tierId}`);
  }

  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to load. Check your publishable key.');
  }

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: tierId === 'membership' ? 'subscription' : 'payment',
    successUrl: `${window.location.origin}/payment/success`,
    cancelUrl: `${window.location.origin}/payment/cancel`,
  });

  if (error) {
    throw error;
  }
}
