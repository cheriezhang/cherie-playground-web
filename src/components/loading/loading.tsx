"use client";
import { motion } from "motion/react";

import { Icon } from "../icons";

export const Loading = () => {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <motion.div
        className="text-accent"
        animate={{
          rotate: [0, 360, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
        }}
      >
        <Icon name="logo" size={36} />
      </motion.div>
    </div>
  );
};
