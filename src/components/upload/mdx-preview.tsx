"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/button";
import { MDX } from "@/components/mdx/mdx";

interface MDXPreviewProps {
  content: string;
  metadata: any;
}

export function MDXPreview({ content, metadata }: MDXPreviewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading preview...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Article Header */}
      <motion.div
        className="overflow-hidden rounded-2xl bg-surface p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-4">
          {metadata.cover_image && (
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={metadata.cover_image}
                alt={metadata.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {metadata.title}
            </h1>

            {metadata.summary && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {metadata.summary}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {metadata.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>Slug: {metadata.slug}</span>
              {metadata.draft && (
                <span className="rounded-full bg-yellow-100 px-2 py-1 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Draft
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* MDX Content */}
      <motion.div
        className="overflow-hidden rounded-2xl bg-surface p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="prose prose-lg max-w-none">
          <MDX content={content} meta={metadata} />
        </div>
      </motion.div>
    </div>
  );
}

interface MDXEditorPreviewProps {
  content: string;
  onContentChange: (content: string) => void;
}

export function MDXEditorPreview({
  content,
  onContentChange,
}: MDXEditorPreviewProps) {
  const [previewMode, setPreviewMode] = useState<"edit" | "preview" | "split">(
    "edit",
  );
  const [parsedContent, setParsedContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (previewMode === "preview" || previewMode === "split") {
      previewContent();
    }
  }, [content, previewMode]);

  const previewContent = () => {
    setIsLoading(true);
    setError("");

    fetch("/api/blogs/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error || "Preview failed");
          });
        }
        return response.json();
      })
      .then((result) => {
        setParsedContent(result);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Preview failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        <Button
          kind={previewMode === "split" ? "primary" : "secondary"}
          onClick={() => setPreviewMode("split")}
          className="px-4 py-2"
        >
          Split
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
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <div className="text-gray-500">Loading preview...</div>
            </div>
          )}
          {error && (
            <div className="rounded-lg bg-red-100 p-4 text-red-800">
              {error}
            </div>
          )}
          {parsedContent && !isLoading && !error && (
            <MDXPreview
              content={parsedContent.content}
              metadata={parsedContent.metadata}
            />
          )}
        </div>
      )}

      {previewMode === "split" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Edit</h3>
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="text-foreground h-96 w-full rounded-lg border bg-background p-4 font-mono text-sm"
              placeholder="Enter your MDX content here..."
            />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Preview</h3>
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <div className="text-gray-500">Loading preview...</div>
              </div>
            )}
            {error && (
              <div className="rounded-lg bg-red-100 p-4 text-red-800">
                {error}
              </div>
            )}
            {parsedContent && !isLoading && !error && (
              <div className="max-h-96 overflow-y-auto rounded-lg border p-4">
                <MDXPreview
                  content={parsedContent.content}
                  metadata={parsedContent.metadata}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
