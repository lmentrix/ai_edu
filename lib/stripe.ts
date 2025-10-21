import Stripe from 'stripe';

// Validate environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not defined in environment variables');
  console.error('Please add STRIPE_SECRET_KEY to your .env.local file');
  console.error('You can get test keys from: https://dashboard.stripe.com/apikeys');
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
  console.error('Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your .env.local file');
  console.error('You can get test keys from: https://dashboard.stripe.com/apikeys');
}

// Initialize Stripe with error handling
let stripe: Stripe | null = null;

try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
    });
    console.log('Stripe initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize Stripe:', error);
}

export { stripe };

export const getStripePlans = () => {
  return {
    starter: {
      price: process.env.STRIPE_STARTER_PRICE_ID,
      name: 'Starter Plan',
    },
    professional: {
      price: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
      name: 'Professional Plan',
    },
    enterprise: {
      price: process.env.STRIPE_ENTERPRISE_PRICE_ID,
      name: 'Enterprise Plan',
    },
  };
};