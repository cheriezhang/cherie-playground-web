"use client";
import { HTMLMotionProps, motion } from "motion/react";

interface IButton extends HTMLMotionProps<"button"> {
  kind?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  kind = "primary",
  children,
  className,
  disabled,
  ...props
}: IButton) => {
  const baseStyle = "rounded-lg px-4 py-2";
  const typeStyle =
    kind === "primary" ? "bg-primary text-surface" : "bg-surface text-accent";
  const disableStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${typeStyle} ${disableStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};
