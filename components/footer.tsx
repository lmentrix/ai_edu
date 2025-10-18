"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/50 bg-background/80 backdrop-blur-lg futuristic-footer mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg futuristic-button">
                <span className="text-foreground font-bold text-lg">AE</span>
              </div>
              <span className="font-bold text-xl futuristic-heading">AI Edu</span>
            </div>
            <p className="text-sm text-foreground/70 futuristic-text">
              A modern educational platform powered by AI for coding, math, science, and essay writing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors futuristic-button p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors futuristic-button p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors futuristic-button p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors futuristic-button p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground futuristic-heading">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/code" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Code
                </Link>
              </li>
              <li>
                <Link href="/math" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Math
                </Link>
              </li>
              <li>
                <Link href="/science" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Science
                </Link>
              </li>
              <li>
                <Link href="/essay" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Essay
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground futuristic-heading">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground futuristic-heading">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors futuristic-text">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60 futuristic-text">
              © {currentYear} AI Edu. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="text-sm text-foreground/60 futuristic-text">Made with</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="text-sm text-foreground/60 futuristic-text">by the AI Edu Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}