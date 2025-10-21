# Stripe Integration Guide

## Problem Fixed
The issue was in the `redirectToCheckout` function in `lib/stripe-client.ts`. The original implementation was using a manual form submission approach to redirect to Stripe Checkout, which is not the recommended way and was causing issues.

## Solution Implemented
We've updated the `redirectToCheckout` function to use Stripe's built-in `redirectToCheckout` method from the Stripe.js library, which is the proper way to redirect to Stripe Checkout.

## Changes Made

### 1. Updated `lib/stripe-client.ts`
- Replaced the manual form submission approach with Stripe's built-in `redirectToCheckout` method
- This ensures proper handling of the checkout session and follows Stripe's best practices

### 2. Updated `app/payment/test/page.tsx`
- Updated the test page to use the same corrected redirect method

## Testing Your Stripe Integration

### Option 1: Using the Test Page
1. Start your Next.js application
2. Navigate to `/payment/test` in your browser
3. Click the buttons to test different aspects of the integration:
   - Check Environment Variables
   - Test Stripe Initialization
   - Test Checkout Session Creation
   - Test Full Payment Flow

### Option 2: Using the HTML Test File
1. Open `stripe-test.html` in your browser
2. This standalone test page allows you to test the Stripe integration without running the full application
3. Note: The session creation and full flow tests require your Next.js app to be running on `http://localhost:3000`

### Option 3: Direct API Testing
1. Run `node test-stripe-api.js` in your terminal
2. This tests the Stripe API directly and confirms your keys are working
3. If successful, it will provide a checkout URL you can visit directly

## Important Notes

1. **Your Stripe Keys Are Valid**: The test confirmed that your Stripe API keys are working correctly.

2. **Environment Variables**: Make sure your `.env.local` file contains:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51SJGXfD7T4aC4oINRWdMYoj2O5dR0YviZkZp7Fb9c1gHyyptETbTvERzgg4Dgpq7UAh3T5OLm2qvtyO9LPjeZ9tE00bacs9KV4
   STRIPE_SECRET_KEY=sk_test_51SJGXfD7T4aC4oINfT1aP9wLyBnWJkY9zYO8rq3m0jXXRaBw5f3LvbLRGiNCWKLgKnCtEGIWOrxQmbCunOvqix3100l6N3F2qP
   ```

3. **Test Mode**: You're using Stripe test keys, which means:
   - No real money will be charged
   - Use Stripe test cards for payment: https://stripe.com/docs/testing#cards
   - The checkout page will show "TEST MODE" at the top

4. **Success and Cancel Pages**: Make sure you have the following pages:
   - `/payment/success` - Handles successful payments
   - `/payment/cancel` - Handles cancelled payments

## Common Test Cards
Use these cards to test different scenarios:
- **Success**: 4242 4242 4242 4242 (any future expiry, any CVC)
- **Requires Authentication**: 4000 0025 0000 3155
- **Card Declined**: 4000 0000 0000 0002

## Troubleshooting

If you encounter issues:

1. Check the browser console for error messages
2. Verify your environment variables are correctly set
3. Ensure your Next.js application is running on `http://localhost:3000`
4. Check that your Stripe account is in test mode

## Next Steps

1. Test the payment flow using one of the methods above
2. Verify that the success and cancel pages work correctly
3. Set up webhooks to handle payment events (recommended for production)
4. Consider creating actual products and prices in your Stripe dashboard instead of using dynamic prices