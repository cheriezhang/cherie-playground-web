"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/button";

export default function AdminDashboard() {
  const router = useRouter();

  const adminFeatures = [
    {
      title: "Upload MDX Articles",
      description:
        "Upload and preview MDX files before publishing them to blog",
      href: "/admin/upload",
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-h1 font-bold text-text-primary">
                Admin Dashboard
              </h1>
              <p className="text-lg text-text-secondary">
                Manage your blogs and notes
              </p>
            </div>
            <Button kind="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {adminFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border-2 border-border bg-surface p-8`}
            >
              <div className="space-y-4">
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Link href={feature.href}>
                    <Button kind="primary" className="w-full">
                      {feature.title}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
