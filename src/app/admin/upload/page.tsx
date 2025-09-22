"use client";

import { motion } from "motion/react";
import { useCallback, useState } from "react";

import { Button } from "@/components/button";
import { FileUpload } from "@/components/upload/file-upload";
import { MDXEditorPreview } from "@/components/upload/mdx-preview";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleFileSelect = useCallback(async (file: File) => {
    setSelectedFile(file);
    setError("");
    setUploadResult(null);

    try {
      const content = await file.text();
      setFileContent(content);
    } catch {
      setError("Failed to read file content");
    }
  }, []);

  const handleContentChange = useCallback((content: string) => {
    setFileContent(content);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile || !fileContent) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Create a new File object with the updated content
      const updatedFile = new File([fileContent], selectedFile.name, {
        type: selectedFile.type,
        lastModified: Date.now(),
      });

      const formData = new FormData();
      formData.append("file", updatedFile);

      const response = await fetch("/api/blogs/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();
      setUploadResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileContent("");
    setUploadResult(null);
    setError("");
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Upload MDX Article
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload and preview your MDX files before publishing
          </p>
        </div>

        {/* Upload Area */}
        {!selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FileUpload
              onFileSelect={handleFileSelect}
              accept=".mdx"
              label="Drop your MDX file here or click to select"
            />
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900 dark:text-red-200"
          >
            {error}
          </motion.div>
        )}

        {/* Success Message */}
        {uploadResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-green-100 p-4 text-green-800 dark:bg-green-900 dark:text-green-200"
          >
            <p className="font-semibold">{uploadResult.message}</p>
            <p className="mt-1 text-sm">
              Article {uploadResult.action}: {uploadResult.slug}
            </p>
          </motion.div>
        )}

        {/* Editor and Preview */}
        {selectedFile && fileContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* File Info */}
            <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <Button kind="secondary" onClick={handleReset}>
                Change File
              </Button>
            </div>

            {/* Editor/Preview Tabs */}
            <MDXEditorPreview
              content={fileContent}
              onContentChange={handleContentChange}
            />

            {/* Upload Button */}
            <div className="flex justify-center">
              <Button
                kind="primary"
                onClick={handleUpload}
                disabled={isUploading || !!error}
                className="px-8 py-3"
              >
                {isUploading ? "Uploading..." : "Upload Article"}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
