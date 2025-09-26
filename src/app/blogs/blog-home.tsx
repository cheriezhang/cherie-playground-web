"use client";
import { motion } from "motion/react";
import { Suspense, useEffect, useRef, useState } from "react";

import { BlogCard, Heading, Loading } from "@/components";
import type { TBlogPost } from "@/lib/types";

export default function BlogHome({ articles }: { articles: TBlogPost[] }) {
  const [cols, setCols] = useState<TBlogPost[][]>([]);
  const [columns, setColumns] = useState(3); // 页面中的列数
  const containerRef = useRef<HTMLDivElement>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // 每个子元素依次延迟
      },
    },
  };

  // 响应式列数
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) setColumns(3);
      else if (width >= 1024) setColumns(2);
      else setColumns(1);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // 根据列数分配 Card
  useEffect(() => {
    const tempCols: TBlogPost[][] = Array.from({ length: columns }, () => []);
    const colHeights = Array(columns).fill(0);

    articles.forEach((p) => {
      const minColIndex = colHeights.indexOf(Math.min(...colHeights));
      tempCols[minColIndex].push(p);
      colHeights[minColIndex] += Math.random() * 300 + 200; // 可替换为实际 Card 高度
    });

    setCols(tempCols);
  }, [articles, columns]);

  return (
    <>
      <Heading component="h1" className="mb-8">
        Blogs
      </Heading>
      <Suspense fallback={<Loading />}>
        <div ref={containerRef} className="flex gap-4">
          {cols.map((cols, i) => (
            <motion.div
              key={i}
              className="flex flex-1 flex-col gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {cols.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </motion.div>
          ))}
        </div>
      </Suspense>
    </>
  );
}
