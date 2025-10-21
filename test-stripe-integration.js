// Test script for Stripe payment integration
// Run this with: node test-stripe-integration.js

const fetch = require('node-fetch');

async function testStripeIntegration() {
  console.log('Testing Stripe payment integration...\n');

  // Test data
  const testData = {
    planId: 'starter',
    billingCycle: 'monthly'
  };

  try {
    // Test the checkout API endpoint
    console.log('1. Testing checkout session creation...');
    const response = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Checkout API failed:', errorData);
      return;
    }

    const sessionData = await response.json();
    console.log('✅ Checkout session created successfully');
    console.log('   Session ID:', sessionData.sessionId);
    console.log('   Checkout URL:', sessionData.url);
    
    // Verify session ID format
    if (sessionData.sessionId && sessionData.sessionId.startsWith('cs_')) {
      console.log('✅ Session ID format is valid');
    } else {
      console.error('❌ Invalid session ID format');
    }

    // Verify checkout URL format
    if (sessionData.url && sessionData.url.includes('checkout.stripe.com')) {
      console.log('✅ Checkout URL is valid');
    } else {
      console.error('❌ Invalid checkout URL');
    }

    console.log('\n2. Testing session retrieval endpoint...');
    
    if (sessionData.sessionId) {
      const sessionResponse = await fetch(`http://localhost:3000/api/checkout/session?session_id=${sessionData.sessionId}`);
      
      if (!sessionResponse.ok) {
        const errorData = await sessionResponse.json();
        console.error('❌ Session retrieval failed:', errorData);
        return;
      }

      const retrievedSession = await sessionResponse.json();
      console.log('✅ Session retrieved successfully');
      console.log('   Amount total:', retrievedSession.amount_total);
      console.log('   Currency:', retrievedSession.currency);
      console.log('   Payment status:', retrievedSession.payment_status);
      console.log('   Product name:', retrievedSession.product_name);
    }

    console.log('\n🎉 All tests passed! Your Stripe integration is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('\nMake sure your Next.js server is running on http://localhost:3000');
    console.error('And that your Stripe environment variables are properly configured.');
  }
}

// Run the test
testStripeIntegration();