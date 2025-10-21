"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FuturisticBackground } from "@/components/ui/futuristic-background";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) return;

      try {
        const response = await fetch(`/api/checkout/session?session_id=${sessionId}`);
        const data = await response.json();
        setSessionData(data);
      } catch (error) {
        console.error("Error fetching session data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <FuturisticBackground />
        <div className="relative z-10 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FuturisticBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md futuristic-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">Payment Successful!</CardTitle>
            <CardDescription>
              Thank you for subscribing to AI Edu. Your account has been upgraded.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            {sessionData && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Order Details</p>
                <p className="font-semibold">{sessionData.product_name}</p>
                <p className="text-lg font-bold">${(sessionData.amount_total / 100).toFixed(2)}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                You now have access to all the features included in your plan.
              </p>
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to your registered email address.
              </p>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button asChild className="w-full futuristic-button bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" className="w-full futuristic-button text-black" asChild>
                <Link href="/payment">View Other Plans</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}