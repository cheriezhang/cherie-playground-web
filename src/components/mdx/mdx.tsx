import { MDXRemote } from "next-mdx-remote-client/rsc"; // support load mdx from local or db
import Image from "next/image";
import remarkGfm from "remark-gfm";

import { allComponents } from "@/lib/mdx/registry";
import { useMDXComponents } from "@/mdx-components";

import CodeBlock from "../code";
import { ErrorComponent } from "../error";

export const MDX = ({ content, meta }: { content: string; meta: any }) => {
  const baseComponents = useMDXComponents();
  const extra = Object.fromEntries(
    (meta?.components || []).map((name: string) => [name, allComponents[name]]),
  );

  return (
    <MDXRemote
      source={content}
      components={{
        ...baseComponents,
        ...extra,
        CodeBlock,
        Image,
      }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      onError={ErrorComponent}
    />
  );
};
