"use client";
import { motion } from "motion/react";

import { NoteCard } from "@/components";
import type { TNote } from "@/lib/types";

export default function NoteList({ notes }: { notes: TNote[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </motion.div>
  );
}
