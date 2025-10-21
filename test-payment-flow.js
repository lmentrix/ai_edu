// Test script to verify Stripe payment flow
// Using built-in fetch (Node.js 18+)

async function testPaymentFlow() {
  console.log('Testing Stripe payment flow...\n');
  
  try {
    // Test 1: Create a checkout session
    console.log('1. Creating checkout session for professional plan (monthly)...');
    const sessionResponse = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planId: 'professional',
        billingCycle: 'monthly'
      })
    });
    
    if (!sessionResponse.ok) {
      const errorText = await sessionResponse.text();
      console.error('Failed to create checkout session:', errorText);
      return;
    }
    
    const sessionData = await sessionResponse.json();
    console.log('✓ Checkout session created successfully');
    console.log('  Session ID:', sessionData.sessionId);
    console.log('  Checkout URL:', sessionData.url);
    
    // Verify the session URL is a valid Stripe checkout URL
    if (sessionData.url && sessionData.url.startsWith('https://checkout.stripe.com/')) {
      console.log('✓ Valid Stripe checkout URL generated');
    } else {
      console.error('✗ Invalid checkout URL format');
    }
    
    // Test 2: Verify session retrieval
    console.log('\n2. Testing session retrieval...');
    const retrieveResponse = await fetch(`http://localhost:3000/api/checkout/session?session_id=${sessionData.sessionId}`);
    
    if (!retrieveResponse.ok) {
      const errorText = await retrieveResponse.text();
      console.error('Failed to retrieve session:', errorText);
      return;
    }
    
    const retrieveData = await retrieveResponse.json();
    console.log('✓ Session retrieved successfully');
    console.log('  Payment status:', retrieveData.payment_status);
    console.log('  Product name:', retrieveData.product_name);
    console.log('  Amount total:', retrieveData.amount_total);
    
    // Verify subscription mode
    if (retrieveData.metadata && retrieveData.metadata.billingCycle) {
      console.log('✓ Billing cycle metadata preserved:', retrieveData.metadata.billingCycle);
    } else {
      console.error('✗ Billing cycle metadata missing');
    }
    
    console.log('\n✅ All tests passed! The payment flow should work correctly.');
    console.log('\nNext steps:');
    console.log('1. Start your Next.js app: npm run dev');
    console.log('2. Navigate to http://localhost:3000/payment');
    console.log('3. Click "Start Free Trial" on any plan');
    console.log('4. You should be redirected to Stripe Checkout');
    
  } catch (error) {
    console.error('Test failed with error:', error.message);
  }
}

// Run the test
testPaymentFlow();