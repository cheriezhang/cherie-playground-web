"use client";

import { motion } from "motion/react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  children: string;
  language?: string;
  maxHeight?: number;
};

const CodeBlock = ({
  children,
  language = "jsx",
  maxHeight = 300,
}: CodeBlockProps) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className="relative my-4 rounded-xl">
      <motion.div
        layout
        animate={{ maxHeight: expanded ? "none" : maxHeight }}
        transition={{ duration: 0.3 }}
        style={{
          overflowY: expanded ? "visible" : "auto",
          maxHeight: expanded ? "none" : maxHeight,
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={materialLight}
          showLineNumbers
          wrapLines
          customStyle={{
            margin: 0,
            fontSize: "0.85rem",
          }}
          className="bg-background"
        >
          {children.trim()}
        </SyntaxHighlighter>
      </motion.div>
      <button
        className="absolute bottom-2 right-4 rounded bg-accent px-2 py-1 text-label text-white hover:opacity-80"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Collapse" : "Expand"}
      </button>
    </div>
  );
};

export default CodeBlock;
