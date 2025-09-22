import fs from "fs";
import matter from "gray-matter";
import path from "path";

import { MDX } from "@/components";

import type { TNote, TNoteMetadata } from "./types";

export async function getLocalNotes(): Promise<TNote[]> {
  const notesDir = path.join(process.cwd(), "src/notes");
  const files = fs.readdirSync(notesDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((name) => {
      const filePath = path.join(notesDir, name);

      const fileContents = fs.readFileSync(filePath, { encoding: "utf-8" });
      const { data, content } = matter(fileContents);

      return {
        id: name.replace(/\.mdx$/, ""),
        metadata: data as TNoteMetadata,
        renderedContent: <MDX content={content} meta={data} />,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime(),
    );
}
