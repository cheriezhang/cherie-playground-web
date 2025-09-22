"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components";

import { InvitationForm } from "./invitation_form";

export default function LoginPage() {
  const router = useRouter();

  const goBackHome = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl bg-surface p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h3 className="mb-2 text-xl font-bold text-text-primary">Oops</h3>
          </div>
          <div className="mb-4 text-button text-text-secondary">
            You do not have permission to access this draft page. <br />
            If you want to apply access, please contact the author for the
            invitation code. Will send it to you as soon as possible.
          </div>
          <div className="border-b-1 flex items-center justify-center border-secondary pb-4">
            <Button kind="primary" onClick={goBackHome} className="w-fit">
              No, I just look around
            </Button>
          </div>
          <div className="my-4 text-center text-button text-text-secondary">
            I have the invitation code
          </div>
          <InvitationForm />
        </div>
      </motion.div>
    </div>
  );
}
