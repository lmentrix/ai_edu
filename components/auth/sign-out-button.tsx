"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {
  variant?: "default" | "ghost" | "outline";
  className?: string;
}

export default function SignOutButton({ variant = "ghost", className }: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
    setIsLoading(false);
  };

  const defaultClassName = variant === "ghost"
    ? "h-9 px-4 futuristic-button text-foreground/80 hover:text-foreground hover:bg-accent/50"
    : "w-full justify-center futuristic-button bg-primary/10 hover:bg-primary/20 border border-primary/20 text-foreground";

  return (
    <Button
      variant={variant}
      onClick={handleSignOut}
      disabled={isLoading}
      className={className || defaultClassName}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing out...
        </>
      ) : (
        "Sign Out"
      )}
    </Button>
  );
}