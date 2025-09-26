import fs from "fs";
import matter from "gray-matter";
import path from "path";

import type { TBlogMetadata, TBlogPost } from "./types";

const articlesDir = path.join(process.cwd(), "src/articles");

export async function getLocalArticles(): Promise<TBlogPost[]> {
  const filenames = fs.readdirSync(articlesDir);
  return filenames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => {
      const fullPath = path.join(articlesDir, name);
      const fileContents = fs.readFileSync(fullPath, "utf-8");

      // 提取 frontmatter，比如 title / date
      const { data, content } = matter(fileContents);

      return {
        metadata: {
          ...(data as TBlogMetadata),
          slug: name.replace(/\.mdx$/, ""),
        },
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.updated_at).getTime() -
        new Date(a.metadata.updated_at).getTime(),
    );
}

export async function getLocalArticleById(id: string): Promise<TBlogPost> {
  const fullPath = path.join(articlesDir, `${id}.mdx`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  return { metadata: data as TBlogMetadata, content };
}
