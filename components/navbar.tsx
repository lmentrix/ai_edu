"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg futuristic-navbar">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/public" className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg futuristic-button">
                <span className="text-foreground font-bold text-lg">AE</span>
              </div>
              <span className="font-bold text-xl sm:text-2xl futuristic-heading">AI Edu</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/code" className="text-sm font-medium text-foreground/90 transition-colors hover:text-primary relative group futuristic-text px-3 py-2 rounded-md hover:bg-accent/50">
              Code
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/math" className="text-sm font-medium text-foreground/90 transition-colors hover:text-primary relative group futuristic-text px-3 py-2 rounded-md hover:bg-accent/50">
              Math
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/science" className="text-sm font-medium text-foreground/90 transition-colors hover:text-primary relative group futuristic-text px-3 py-2 rounded-md hover:bg-accent/50">
              Science
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/essay" className="text-sm font-medium text-foreground/90 transition-colors hover:text-primary relative group futuristic-text px-3 py-2 rounded-md hover:bg-accent/50">
              Essay
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-foreground/90 transition-colors hover:text-primary relative group futuristic-text px-3 py-2 rounded-md hover:bg-accent/50">
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden lg:flex h-9 w-9 futuristic-button text-foreground/80 hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="sr-only">Notifications</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden lg:flex h-9 w-9 futuristic-button text-foreground/80 hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
              <span className="sr-only">Settings</span>
            </Button>

            <Button asChild className="hidden lg:flex h-9 px-4 futuristic-button bg-primary/10 hover:bg-primary/20 border border-primary/20 text-foreground">
              <Link href="/auth">Sign In</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 futuristic-button text-foreground/80 hover:text-foreground" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12"></path>
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18"></path>
                )}
              </svg>
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/80 backdrop-blur-lg futuristic-navbar">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 gap-1">
              <Link
                href="/code"
                className="flex items-center py-3 px-4 text-sm font-medium text-foreground/90 rounded-md transition-colors hover:bg-accent/70 hover:text-accent-foreground futuristic-text"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">💻</span>
                Code
              </Link>
              <Link
                href="/math"
                className="flex items-center py-3 px-4 text-sm font-medium text-foreground/90 rounded-md transition-colors hover:bg-accent/70 hover:text-accent-foreground futuristic-text"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">🧮</span>
                Math
              </Link>
              <Link
                href="/science"
                className="flex items-center py-3 px-4 text-sm font-medium text-foreground/90 rounded-md transition-colors hover:bg-accent/70 hover:text-accent-foreground futuristic-text"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">🔬</span>
                Science
              </Link>
              <Link
                href="/essay"
                className="flex items-center py-3 px-4 text-sm font-medium text-foreground/90 rounded-md transition-colors hover:bg-accent/70 hover:text-accent-foreground futuristic-text"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">📝</span>
                Essay
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center py-3 px-4 text-sm font-medium text-foreground/90 rounded-md transition-colors hover:bg-accent/70 hover:text-accent-foreground futuristic-text"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">📊</span>
                Dashboard
              </Link>
              <div className="pt-4 mt-2 border-t">
                <Button asChild className="w-full justify-center futuristic-button bg-primary/10 hover:bg-primary/20 border border-primary/20 text-foreground">
                  <Link href="/auth" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}