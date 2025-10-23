import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/futuristic.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DynamicBackgroundWidget } from "@/components/widgets/DynamicBackgroundWidget";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Edu - Modern Learning Platform",
  description: "A modern educational platform powered by AI for coding, math, science, and essay writing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DynamicBackgroundWidget />
        <div className="flex flex-col min-h-screen relative z-10  ">
          <Navbar />
          <main className="flex-1  futuristic-content pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
