// Test script to verify Stripe API configuration
// Run with: node test-stripe-api.js

const https = require('https');
const querystring = require('querystring');

// Your Stripe secret key
const STRIPE_SECRET_KEY = 'sk_test_51SJGXfD7T4aC4oINfT1aP9wLyBnWJkY9zYO8rq3m0jXXRaBw5f3LvbLRGiNCWKLgKnCtEGIWOrxQmbCunOvqix3100l6N3F2qP';

function testStripeAPI() {
  console.log('Testing Stripe API configuration...');
  
  // Test creating a checkout session
  const postData = querystring.stringify({
    mode: 'payment',
    'payment_method_types[0]': 'card',
    'line_items[0][price_data][currency]': 'usd',
    'line_items[0][price_data][product_data][name]': 'Professional Plan',
    'line_items[0][price_data][product_data][description]': 'Professional Plan - monthly',
    'line_items[0][price_data][unit_amount]': '1999', // $19.99
    'line_items[0][quantity]': '1',
    'metadata[planId]': 'professional',
    'metadata[billingCycle]': 'monthly',
    'success_url': 'http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}',
    'cancel_url': 'http://localhost:3000/payment/cancel',
  });

  const options = {
    hostname: 'api.stripe.com',
    port: 443,
    path: '/v1/checkout/sessions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (res.statusCode === 200) {
          console.log('\n✅ Success! Stripe API is working correctly.');
          console.log('Session ID:', response.id);
          console.log('Payment URL:', response.url);
          console.log('\nYou can test the checkout by visiting:');
          console.log(response.url);
        } else {
          console.log('\n❌ Error creating checkout session:');
          console.log('Status Code:', res.statusCode);
          console.log('Response:', response);
          
          if (response.error) {
            console.log('\nError details:');
            console.log('Type:', response.error.type);
            console.log('Message:', response.error.message);
            
            if (response.error.type === 'authentication_error') {
              console.log('\n💡 This is an authentication error. Please check:');
              console.log('1. Your Stripe secret key is correct');
              console.log('2. Your Stripe account is active');
              console.log('3. You have the necessary permissions');
            }
          }
        }
      } catch (error) {
        console.log('\n❌ Error parsing response:', error.message);
        console.log('Raw response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.log('\n❌ Request error:', error.message);
    console.log('\n💡 Possible solutions:');
    console.log('1. Check your internet connection');
    console.log('2. Verify your Stripe secret key');
    console.log('3. Check if Stripe services are operational');
  });

  req.write(postData);
  req.end();
}

// Check if the secret key is valid
if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY.includes('your_secret_key_here')) {
  console.log('❌ Error: Invalid Stripe secret key');
  console.log('\n💡 Please update the STRIPE_SECRET_KEY in this script with your actual Stripe test key');
  console.log('You can get test keys from: https://dashboard.stripe.com/apikeys');
  process.exit(1);
}

console.log('Using Stripe secret key starting with:', STRIPE_SECRET_KEY.substring(0, 7) + '...');
testStripeAPI();