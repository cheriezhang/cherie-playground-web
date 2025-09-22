"use client";

import { HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

export type MotionInputProps = HTMLMotionProps<"input"> & {
  id?: string;
  label?: string;
  type?: string;
  className?: string;
};

export const Input = ({
  id,
  label,
  placeholder = "",
  type = "text",
  className = "",
  ...rest
}: MotionInputProps) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div className={`w-full max-w-sm ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <motion.input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none"
        animate={{
          scale: focused ? 1.02 : 1,
          boxShadow: focused
            ? "0px 0px 10px rgba(59, 130, 246, 0.5)" // focus: blue glow
            : "0px 0px 0px rgba(0,0,0,0)",
          borderColor: focused ? "rgb(59, 130, 246)" : "rgb(209, 213, 219)", // blue-500 / gray-300
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
      />
    </div>
  );
};
