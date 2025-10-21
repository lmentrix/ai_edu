import { loadStripe } from '@stripe/stripe-js';

export const getStripe = async () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
    throw new Error('Stripe publishable key is not configured');
  }
  
  try {
    const stripe = await loadStripe(publishableKey);
    if (!stripe) {
      throw new Error('Failed to initialize Stripe');
    }
    return stripe;
  } catch (error) {
    console.error('Error loading Stripe:', error);
    throw new Error('Failed to load Stripe payment system');
  }
};

export const createCheckoutSession = async (planId: string, billingCycle: string) => {
  try {
    console.log('Creating checkout session for plan:', planId, 'billing cycle:', billingCycle);
    
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planId,
        billingCycle,
      }),
    });

    // Check if response is HTML (likely a redirect to login page)
    const contentType = response.headers.get('content-type');
    console.log('Response content type:', contentType);
    console.log('Response status:', response.status);
    
    if (!contentType || !contentType.includes('application/json')) {
      // If we're getting HTML instead of JSON, it's likely a redirect
      const text = await response.text();
      console.error('Received HTML instead of JSON:', text.substring(0, 200));
      
      if (response.status === 302 || response.status === 307 || response.status === 301) {
        throw new Error('Redirect detected. You may need to log in first.');
      } else if (response.status === 401) {
        throw new Error('Authentication required. Please log in and try again.');
      } else if (response.status === 403) {
        throw new Error('Access denied. You do not have permission to perform this action.');
      } else {
        throw new Error('Server returned an unexpected response. Please try again later.');
      }
    }

    const data = await response.json();
    console.log('Checkout session response:', data);

    if (!response.ok) {
      console.error('Checkout session creation failed:', data);
      throw new Error(data.error || `Failed to create checkout session (${response.status})`);
    }

    if (!data.sessionId || !data.url) {
      console.error('No session ID or URL in response:', data);
      throw new Error('Invalid response from payment server');
    }

    return {
      sessionId: data.sessionId,
      url: data.url
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create checkout session');
  }
};

export const redirectToCheckout = async (sessionData: { sessionId: string, url: string }) => {
  try {
    console.log('Redirecting to checkout with session ID:', sessionData.sessionId);

    // Validate the session ID - it should start with 'cs_' and be a valid format
    if (!sessionData.sessionId || !sessionData.sessionId.startsWith('cs_')) {
      console.error('Invalid session ID format:', sessionData.sessionId);
      throw new Error('Invalid session ID format');
    }

    // Ensure we're in a browser environment
    if (typeof window === 'undefined') {
      throw new Error('Redirection can only be performed in a browser environment');
    }

    // Direct URL redirect is the most reliable method
    if (sessionData.url && sessionData.url.startsWith('https://checkout.stripe.com/')) {
      console.log('Redirecting to Stripe Checkout URL:', sessionData.url);
      window.location.href = sessionData.url;
      return;
    }

    // If we don't have a valid URL, try using Stripe.js
    const stripe = await getStripe();

    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }

    // Redirect to Stripe Checkout using the session ID
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionData.sessionId,
    });

    if (error) {
      console.error('Stripe redirect error:', error);
      throw new Error(error.message || 'Failed to redirect to Stripe Checkout');
    }

    console.log('Redirect to Stripe Checkout initiated successfully');
  } catch (error) {
    console.error('Error redirecting to checkout:', error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to redirect to payment page');
  }
};