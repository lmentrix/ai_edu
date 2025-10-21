"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FuturisticBackground } from "@/components/ui/futuristic-background";
import { loadStripe } from "@stripe/stripe-js";

export default function PaymentIdPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.id as string;
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const plans = {
    starter: {
      id: "starter",
      name: "Starter",
      description: "Perfect for students just getting started",
      price: {
        monthly: 9.99,
        yearly: 99.99,
      },
      features: [
        "Access to basic math tools",
        "100 AI assistant queries per month",
        "Basic formula library",
        "Community support",
        "Mobile app access",
      ],
      limitations: [
        "Limited to 3 projects",
        "Standard processing speed",
      ],
      color: "from-blue-500 to-blue-600",
    },
    professional: {
      id: "professional",
      name: "Professional",
      description: "Ideal for serious learners and professionals",
      price: {
        monthly: 19.99,
        yearly: 199.99,
      },
      features: [
        "Access to all educational tools",
        "Unlimited AI assistant queries",
        "Advanced formula library",
        "Priority support",
        "Mobile & desktop apps",
        "Advanced analytics dashboard",
        "Custom study plans",
      ],
      limitations: [],
      color: "from-purple-500 to-purple-600",
    },
    enterprise: {
      id: "enterprise",
      name: "Enterprise",
      description: "For institutions and large teams",
      price: {
        monthly: 49.99,
        yearly: 499.99,
      },
      features: [
        "Everything in Professional",
        "Team collaboration tools",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security features",
        "White-label options",
        "SLA guarantee",
      ],
      limitations: [],
      color: "from-amber-500 to-amber-600",
    },
  };

  useEffect(() => {
    if (planId && plans[planId as keyof typeof plans]) {
      setPlan(plans[planId as keyof typeof plans]);
    } else {
      router.push("/payment");
    }
    setLoading(false);
  }, [planId, router]);

  const handleSubscribe = async (billingCycle: "monthly" | "yearly") => {
    if (planId === "enterprise") {
      // For enterprise plan, redirect to contact page or show a modal
      window.location.href = "mailto:sales@aiedu.com?subject=Enterprise Plan Inquiry";
      return;
    }

    setProcessing(true);
    try {
      console.log(`Starting payment process for plan: ${planId}, billing: ${billingCycle}`);
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          billingCycle,
        }),
      });

      const data = await response.json();
      console.log("Checkout API response:", data);

      if (!response.ok) {
        console.error("Checkout API error:", data);
        throw new Error(data.error || `Failed to create checkout session (${response.status})`);
      }

      if (!data.sessionId) {
        console.error("No session ID in response:", data);
        throw new Error("Invalid response from payment server");
      }

      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      if (!publishableKey) {
        throw new Error("Stripe is not configured properly");
      }
      
      console.log("Redirecting to Stripe checkout with session:", data.sessionId);
      
      // Create a hidden form and submit it to redirect to Stripe Checkout
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://checkout.stripe.com/pay';
      
      // Add the session ID as a hidden field
      const sessionIdField = document.createElement('input');
      sessionIdField.type = 'hidden';
      sessionIdField.name = 'session_id';
      sessionIdField.value = data.sessionId;
      form.appendChild(sessionIdField);
      
      // Add the publishable key as a hidden field
      const publishableKeyField = document.createElement('input');
      publishableKeyField.type = 'hidden';
      publishableKeyField.name = 'pk';
      publishableKeyField.value = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
      form.appendChild(publishableKeyField);
      
      // Submit the form to redirect to Stripe Checkout
      document.body.appendChild(form);
      form.submit();
      
      // Clean up the form
      document.body.removeChild(form);
    } catch (error) {
      console.error("Payment error:", error);
      let errorMessage = "Payment failed. Please try again.";
      
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        
        // Provide more specific error messages
        if (error.message.includes('Stripe is not configured')) {
          errorMessage = "Payment system is not configured properly. Please contact support.";
        } else if (error.message.includes('Failed to create checkout session')) {
          errorMessage = "Unable to create payment session. Please try again later.";
        } else if (error.message.includes('Failed to load Stripe')) {
          errorMessage = "Payment system is temporarily unavailable. Please try again later.";
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <FuturisticBackground />
        <div className="relative z-10 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg">Loading plan details...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <FuturisticBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Plan Not Found</h1>
          <Button asChild className="futuristic-button">
            <Link href="/payment">Back to Pricing</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FuturisticBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/payment" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Pricing
            </Link>
          </div>

          {/* Plan Header */}
          <div className="text-center mb-8">
            <Badge className={`mb-4 bg-gradient-to-r ${plan.color} text-white px-4 py-1`}>
              {plan.name} Plan
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 futuristic-heading">
              {plan.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {plan.description}
            </p>
          </div>

          {/* Pricing Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className={`futuristic-card ${plan.id === "professional" ? "border-2 border-primary" : ""}`}>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Monthly Billing</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price.monthly}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full futuristic-button text-black"
                  onClick={() => handleSubscribe("monthly")}
                  disabled={processing}
                >
                  {processing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Subscribe Monthly"
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className={`futuristic-card ${plan.id === "professional" ? "border-2 border-primary" : ""}`}>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Yearly Billing</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price.yearly}</span>
                  <span className="text-muted-foreground">/year</span>
                </div>
                <p className="text-sm text-green-600 font-medium">
                  Save ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(2)} per year
                </p>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full futuristic-button bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black"
                  onClick={() => handleSubscribe("yearly")}
                  disabled={processing}
                >
                  {processing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Subscribe Yearly"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Features */}
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="text-2xl">What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation: string, index: number) => (
                  <li key={index} className="flex items-start opacity-70">
                    <svg className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              14-day free trial • Cancel anytime • 24/7 support
            </p>
            {plan.id === "enterprise" && (
              <Button 
                size="lg" 
                className="futuristic-button bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                onClick={() => window.location.href = "mailto:sales@aiedu.com?subject=Enterprise Plan Inquiry"}
              >
                Contact Sales
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}