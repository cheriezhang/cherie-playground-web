"use client";
import moment from "moment";
import { motion, Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Heading, Tag, Text } from "@/components";
import type { TArticle, TNote } from "@/lib/types";

const item: Variants = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring", // 使用弹簧效果
      stiffness: 300, // 弹簧刚度（越大越快）
      damping: 20, // 阻尼（越小越“弹”）
    },
  },
};

export const BlogCard = ({ article }: { article: TArticle }) => {
  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="overflow-hidden rounded-2xl bg-surface"
    >
      <Link
        key={article.metadata.title}
        href={`/blogs/${article.metadata.slug}`}
      >
        <div className="relative aspect-[16/9] w-full">
          {article.metadata.cover_image && (
            <Image
              src={article.metadata.cover_image}
              alt={article.metadata.cover_image}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-end gap-2 p-6">
          <Heading component="h4">{article.metadata.title}</Heading>
          <Text component="p" className="my-4">
            {article.metadata.summary}
          </Text>
          <div className="flex gap-1">
            {article.metadata.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const NoteCard = ({
  note,
  maxHeight = 250,
}: {
  note: TNote;
  maxHeight?: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [realHeight, setRealHeight] = useState(0);
  const noteRef = useRef<HTMLDivElement>(null);
  const formatted = moment(note.metadata.date, "YYYY-MM-DD HH:mm:ss").format(
    "h:mmA MMMM,DD",
  );
  const [time, date] = formatted.split(" ");

  useEffect(() => {
    if (noteRef.current) {
      setRealHeight(noteRef.current.scrollHeight);
    }
  }, []);

  return (
    <motion.div
      key={note.id}
      variants={item}
      className="relative flex rounded-2xl bg-surface p-6"
    >
      <div className="items-center pr-8">
        <b>{time}</b>
        <div>{date}</div>
      </div>
      <div className="h-full w-1 bg-border" />
      <div className="prose mx-8 max-w-none rounded-xl">
        <Heading component="h4" className="mb-4">
          {note.metadata.title}
        </Heading>
        <motion.div
          animate={{ maxHeight: expanded ? realHeight : 150 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden"
          ref={noteRef}
        >
          {note.renderedContent}
          {realHeight > maxHeight && !expanded && (
            <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-gradient-to-b from-transparent to-white"></div>
          )}
        </motion.div>
        <div className="mt-6 flex">
          {note.metadata.tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      {realHeight > maxHeight && (
        <button
          className="absolute bottom-6 right-6 rounded bg-accent px-2 py-1 text-label text-white hover:opacity-80"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      )}
    </motion.div>
  );
};
