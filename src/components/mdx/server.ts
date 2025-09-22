import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export interface TTOC {
  text: string;
  level: number;
  id: string;
}

export function extractHeadings(content: string): TTOC[] {
  const tree = unified().use(remarkParse).parse(content);

  const headings: TTOC[] = [];

  visit(tree, "heading", (node: any) => {
    const text = node.children
      .filter((c: any) => c.type === "text")
      .map((c: any) => c.value)
      .join("");
    const id = text.toLowerCase().replace(/\s+/g, "-");
    if (node.depth <= 3) {
      headings.push({ text, level: node.depth, id });
    }
  });

  return headings;
}
