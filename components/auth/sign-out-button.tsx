"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
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

  return (
    <Button 
      variant="outline" 
      onClick={handleSignOut}
      disabled={isLoading}
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