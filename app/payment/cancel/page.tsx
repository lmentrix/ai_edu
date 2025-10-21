"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FuturisticBackground } from "@/components/ui/futuristic-background";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FuturisticBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md futuristic-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-red-600">Payment Cancelled</CardTitle>
            <CardDescription>
              Your payment process was cancelled. No charges were made to your account.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                If you changed your mind, you can always come back and choose a plan that works for you.
              </p>
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team for assistance.
              </p>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button asChild className="w-full futuristic-button bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black">
                <Link href="/payment">Try Again</Link>
              </Button>
              <Button variant="outline" className="w-full futuristic-button text-black" asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}