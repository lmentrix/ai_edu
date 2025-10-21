"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FuturisticBackground } from "@/components/ui/futuristic-background";
import { createCheckoutSession, redirectToCheckout, getStripe } from "@/lib/stripe-client";

export default function PaymentTestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const testStripeConfig = async () => {
    setLoading(true);
    setError("");
    setResult("");
    
    try {
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!publishableKey) {
        setError('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
        return;
      }

      const stripe = await getStripe();
      setResult(`Stripe initialized successfully: ${stripe ? 'Yes' : 'No'}`);
    } catch (err) {
      setError(`Stripe initialization failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testCheckoutSession = async () => {
    setLoading(true);
    setError("");
    setResult("");
    
    try {
      // Test the raw API call to see what we're getting back
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: "professional",
          billingCycle: "monthly",
        }),
      });

      // Get content type to check if we're getting JSON
      const contentType = response.headers.get("content-type");
      setResult(`Response status: ${response.status}, Content-Type: ${contentType}`);

      if (!contentType || !contentType.includes("application/json")) {
        // We're getting HTML instead of JSON
        const text = await response.text();
        setError(`Received HTML instead of JSON. First 200 chars: ${text.substring(0, 200)}...`);
        return;
      }

      const data = await response.json();
      
      if (response.ok) {
        setResult(`Checkout session created successfully: ${data.sessionId}`);
      } else {
        // Handle specific error statuses
        let errorMessage = data.error || `Request failed with status ${response.status}`;
        
        if (response.status === 401) {
          errorMessage = "Authentication failed. Check your Stripe API keys.";
        } else if (response.status === 403) {
          errorMessage = "Access denied. Check your Stripe API permissions.";
        } else if (response.status === 429) {
          errorMessage = "Rate limit exceeded. Please try again later.";
        }
        
        setError(`Checkout session creation failed: ${errorMessage}`);
      }
    } catch (err) {
      setError(`Checkout session creation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testFullFlow = async () => {
    setLoading(true);
    setError("");
    setResult("");
    
    try {
      const sessionData = await createCheckoutSession("professional", "monthly");
      setResult(`Starting checkout with session: ${sessionData.sessionId}`);
      
      // Use the Stripe redirectToCheckout method
      await redirectToCheckout(sessionData);
    } catch (err) {
      setError(`Full payment flow failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testDifferentPlans = async (planId: string, billingCycle: string) => {
    setLoading(true);
    setError("");
    setResult("");
    
    try {
      const sessionData = await createCheckoutSession(planId, billingCycle);
      setResult(`Checkout session created for ${planId} (${billingCycle}): ${sessionData.sessionId}`);
      
      // Verify the session URL is valid
      if (sessionData.url && sessionData.url.startsWith('https://checkout.stripe.com/')) {
        setResult(prev => prev + '\n✓ Valid Stripe checkout URL generated');
      } else {
        setError('Invalid checkout URL format');
        return;
      }
      
      // Ask user if they want to proceed to checkout
      if (window.confirm('Proceed to Stripe Checkout?')) {
        await redirectToCheckout(sessionData);
      }
    } catch (err) {
      setError(`Payment flow failed for ${planId} (${billingCycle}): ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const checkEnvVars = () => {
    setLoading(true);
    setError("");
    setResult("");
    
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const hasKey = !!publishableKey;
    const keyPrefix = publishableKey ? publishableKey.substring(0, 7) + "..." : "Not defined";
    const isPlaceholder = publishableKey && publishableKey.includes('51234567890abcdef');
    
    let result = `Publishable Key: ${keyPrefix}, Defined: ${hasKey}`;
    if (isPlaceholder) {
      result += '\n⚠️ You are using placeholder keys. Please replace them with real test keys.';
    }
    
    setResult(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FuturisticBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 futuristic-heading">Payment System Test</h1>
          
          <div className="space-y-4">
            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>Check if Stripe environment variables are properly configured</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={checkEnvVars} 
                  disabled={loading}
                  className="futuristic-button"
                >
                  Check Environment Variables
                </Button>
              </CardContent>
            </Card>

            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>Stripe Initialization</CardTitle>
                <CardDescription>Test if Stripe can be properly initialized</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testStripeConfig} 
                  disabled={loading}
                  className="futuristic-button"
                >
                  Test Stripe Initialization
                </Button>
              </CardContent>
            </Card>

            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>Checkout Session Creation</CardTitle>
                <CardDescription>Test if checkout sessions can be created</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testCheckoutSession} 
                  disabled={loading}
                  className="futuristic-button"
                >
                  Test Checkout Session
                </Button>
              </CardContent>
            </Card>

            <Card className="futuristic-card">
              <CardHeader>
                <CardTitle>Full Payment Flow</CardTitle>
                <CardDescription>Test the complete payment flow (will redirect to Stripe)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={testFullFlow}
                  disabled={loading}
                  className="futuristic-button bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Test Professional Plan (Monthly)
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => testDifferentPlans("starter", "monthly")}
                    disabled={loading}
                    variant="outline"
                    className="futuristic-button"
                  >
                    Starter - Monthly
                  </Button>
                  <Button
                    onClick={() => testDifferentPlans("starter", "yearly")}
                    disabled={loading}
                    variant="outline"
                    className="futuristic-button"
                  >
                    Starter - Yearly
                  </Button>
                  <Button
                    onClick={() => testDifferentPlans("professional", "monthly")}
                    disabled={loading}
                    variant="outline"
                    className="futuristic-button"
                  >
                    Professional - Monthly
                  </Button>
                  <Button
                    onClick={() => testDifferentPlans("professional", "yearly")}
                    disabled={loading}
                    variant="outline"
                    className="futuristic-button"
                  >
                    Professional - Yearly
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Test different plans and billing cycles. Use test card: 4242 4242 4242 4242
                </p>
              </CardContent>
            </Card>

            {result && (
              <Card className="futuristic-card border-green-500">
                <CardHeader>
                  <CardTitle className="text-green-600">Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </CardContent>
              </Card>
            )}

            {error && (
              <Card className="futuristic-card border-red-500">
                <CardHeader>
                  <CardTitle className="text-red-600">Error</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm">{error}</pre>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}