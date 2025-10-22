"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FuturisticBackground } from "@/components/ui/futuristic-background";
import { createCheckoutSession, redirectToCheckout, getStripe } from "@/lib/stripe-client";
import ContactUs from "@/components/widgets/contact/ContactUs";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const handlePlanSelection = async (planId: string) => {
    setLoading(true);
    
    try {
      const sessionData = await createCheckoutSession(planId, billingCycle);
      
      // Verify the session URL is valid
      if (sessionData.url && sessionData.url.startsWith('https://checkout.stripe.com/')) {
        // Redirect to Stripe checkout
        await redirectToCheckout(sessionData);
      } else {
        console.error('Invalid checkout URL format');
      }
    } catch (err) {
      console.error(`Payment flow failed for ${planId} (${billingCycle}): ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
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
      highlighted: false,
      color: "from-blue-500 to-blue-600",
    },
    {
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
      highlighted: true,
      color: "from-purple-500 to-purple-600",
    },
    {
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
      highlighted: false,
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FuturisticBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center futuristic-heading">Payment Plans</h1>
          
          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted/50 p-1 rounded-lg futuristic-card">
              <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}>
                <TabsList className="grid w-full grid-cols-2 bg-transparent">
                  <TabsTrigger value="monthly" className="data-[state=active]:bg-background">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly" className="data-[state=active]:bg-background">
                    Yearly
                    <Badge className="ml-2 bg-green-500 text-white">Save 17%</Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative futuristic-card ${
                  plan.highlighted
                    ? "border-2 border-primary shadow-2xl transform scale-105"
                    : "border-border"
                } transition-all duration-300 hover:shadow-xl`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 futuristic-button">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      ${billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(2)} per year
                    </p>
                  )}
                </CardHeader>
                
                <CardContent className="pb-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start opacity-70">
                        <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button
                    className={`w-full futuristic-button text-black ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                        : "bg-primary/10 hover:bg-primary/20 border border-primary/20"
                    }`}
                    size="lg"
                    onClick={() => plan.id === "enterprise"
                      ? (window.location.href = "mailto:sales@aiedu.com?subject=Enterprise Plan Inquiry")
                      : handlePlanSelection(plan.id)
                    }
                    disabled={loading || plan.id === "enterprise"}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : plan.id === "enterprise" ? (
                      "Contact Sales"
                    ) : (
                      "Start Free Trial"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

        </div>
      </div>
        <ContactUs/>
    </div>

  );
}