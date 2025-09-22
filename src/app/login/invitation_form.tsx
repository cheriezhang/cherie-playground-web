"use client";

import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button, Input } from "@/components";

export const InvitationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      });

      if (response.ok) {
        // Get redirect URL from query parameters, fallback to "/"
        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      } else {
        setError("Wrong code");
      }
    } catch {
      setError("Request Error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleAdminLogin} className="space-y-4">
      <Input
        id="verify-code"
        type="password"
        placeholder=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
      <Button type="submit" disabled={isLoading} className="w-fit text-center">
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
};
