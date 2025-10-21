import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    console.log('Checkout API called');
    
    // Check if Stripe is initialized
    if (!stripe) {
      console.error('Stripe is not initialized');
      return NextResponse.json(
        { error: 'Payment service is not configured properly. Please check your environment variables.' },
        { status: 500 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { planId, billingCycle } = body;
    
    console.log('Received request for plan:', planId, 'billing cycle:', billingCycle);
    
    if (!planId || !billingCycle) {
      console.error('Missing required fields:', { planId, billingCycle });
      return NextResponse.json(
        { error: 'Missing plan ID or billing cycle' },
        { status: 400 }
      );
    }

    // Determine price based on plan and billing cycle
    let unitAmount;
    let planName;
    switch (planId) {
      case 'starter':
        unitAmount = billingCycle === 'monthly' ? 999 : 9999; // $9.99 or $99.99
        planName = 'Starter Plan';
        break;
      case 'professional':
        unitAmount = billingCycle === 'monthly' ? 1999 : 19999; // $19.99 or $199.99
        planName = 'Professional Plan';
        break;
      case 'enterprise':
        unitAmount = billingCycle === 'monthly' ? 4999 : 49999; // $49.99 or $499.99
        planName = 'Enterprise Plan';
        break;
      default:
        console.error('Unknown plan ID:', planId);
        return NextResponse.json(
          { error: 'Unknown plan ID' },
          { status: 400 }
        );
    }

    console.log('Creating Stripe session with price:', unitAmount);

    // Get the origin for success and cancel URLs
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Create Stripe checkout session following the official example
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planName,
              description: `${planName} - ${billingCycle}`,
            },
            unit_amount: unitAmount,
            recurring: {
              interval: billingCycle === 'monthly' ? 'month' : 'year',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        planId,
        billingCycle,
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel`,
    });

    console.log('Stripe session created successfully:', session.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      
      // Check for specific Stripe errors
      if (error.message.includes('API key') || error.message.includes('Invalid API Key')) {
        return NextResponse.json(
          { error: 'Payment service configuration error. Invalid API key.' },
          { status: 401 }
        );
      }
      
      if (error.message.includes('authentication') || error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { error: 'Payment service authentication failed. Please check your API keys.' },
          { status: 401 }
        );
      }
      
      if (error.message.includes('permission') || error.message.includes('Forbidden')) {
        return NextResponse.json(
          { error: 'Payment service access denied. Please check your API permissions.' },
          { status: 403 }
        );
      }
      
      if (error.message.includes('rate limit') || error.message.includes('Too Many Requests')) {
        return NextResponse.json(
          { error: 'Payment service rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create payment session. Please try again later.' },
      { status: 500 }
    );
  }
}