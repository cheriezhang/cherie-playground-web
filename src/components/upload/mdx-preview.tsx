"use client";
import matter from "gray-matter";
import type { SerializeResult } from "next-mdx-remote-client/serialize";
import { serialize } from "next-mdx-remote-client/serialize";
import { useEffect, useState } from "react";

import { Button } from "@/components/button";
import { usePreviewFileStore } from "@/lib/stores/preview-store";

import { Loading } from "../loading";
import { MDXClient } from "../mdx/mdx-client";

interface MDXEditorPreviewProps {
  content: string;
  onContentChange: (content: string) => void;
}
interface ParsedMDX {
  content?: SerializeResult;
  metadata?: Record<string, any>;
}

export function MDXEditorPreview({
  content,
  onContentChange,
}: MDXEditorPreviewProps) {
  const [previewMode, setPreviewMode] = useState<"edit" | "preview">("edit");
  const [parseMDX, setParseMDX] = useState<ParsedMDX>({});
  const { isParsing, parseError, setIsParsing, setParseError } =
    usePreviewFileStore();

  useEffect(() => {
    if (previewMode === "preview") {
      previewContent();
    }
  }, [previewMode]);

  const previewContent = async () => {
    setIsParsing(true);
    setParseError(null);

    try {
      // Parse MDX content directly in the frontend
      const { data: metadata, content: mdxContent } = matter(content);
      const serializeSource = await serialize({ source: mdxContent });
      setParseMDX({
        metadata: {
          slug: metadata.slug,
          title: metadata.title,
          tags: metadata.tags || [],
          cover_image: metadata.cover_image
            ? `/static/blog/${metadata.cover_image}`
            : null,
          draft: metadata.draft || false,
          summary: metadata.summary || "",
          components: metadata.components ?? [],
          created_at: metadata.created_at ?? new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        content: serializeSource,
      });
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Preview failed");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher */}
      <div className="flex gap-2">
        <Button
          kind={previewMode === "edit" ? "primary" : "secondary"}
          onClick={() => setPreviewMode("edit")}
          className="px-4 py-2"
        >
          Edit
        </Button>
        <Button
          kind={previewMode === "preview" ? "primary" : "secondary"}
          onClick={() => setPreviewMode("preview")}
          className="px-4 py-2"
        >
          Preview
        </Button>
      </div>

      {/* Content Area */}
      {previewMode === "edit" && (
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="text-foreground h-96 w-full rounded-lg border bg-background p-4 font-mono text-sm"
            placeholder="Enter your MDX content here..."
          />
        </div>
      )}

      {previewMode === "preview" && (
        <div className="space-y-4">
          {isParsing && (
            <div className="flex items-center justify-center p-8">
              <Loading />
            </div>
          )}
          {parseError && (
            <div className="rounded-lg bg-red-100 p-4 text-red-800">
              {parseError}
            </div>
          )}
          {parseMDX && !isParsing && !parseError && (
            <article className="prose max-w-none">
              <MDXClient
                content={parseMDX.content!}
                metadata={parseMDX.metadata!}
              />
            </article>
          )}
        </div>
      )}
    </div>
  );
}
