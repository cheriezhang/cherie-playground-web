import { MDXClient as Client } from "next-mdx-remote-client"; // support load mdx from local or db
import type { SerializeResult } from "next-mdx-remote-client/serialize";
import Image from "next/image";
import { Suspense } from "react";

import { allComponents } from "@/lib/mdx/registry";
import { useMDXComponents } from "@/mdx-components";

import CodeBlock from "../code";
import { ErrorComponent } from "../error";
import { Loading } from "../loading";

export const MDXClient = ({
  content,
  metadata,
}: {
  content: SerializeResult;
  metadata: any;
}) => {
  const baseComponents = useMDXComponents();
  const extra = Object.fromEntries(
    (metadata?.components || []).map((name: string) => [
      name,
      allComponents[name],
    ]),
  );
  const compiledSource = (content as any).compiledSource;

  return (
    <Suspense fallback={<Loading />}>
      <Client
        compiledSource={compiledSource}
        components={{
          ...baseComponents,
          ...extra,
          CodeBlock,
          Image,
        }}
        onError={ErrorComponent}
      />
    </Suspense>
  );
};
