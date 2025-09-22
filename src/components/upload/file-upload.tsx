"use client";

import { ChangeEvent, DragEvent, useCallback, useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  label?: string;
}

export function FileUpload({
  onFileSelect,
  accept = ".mdx",
  maxSize = 10 * 1024 * 1024, // 10MB default
  label = "Drop file here or click to select",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      setError("");

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        validateAndProcessFile(files[0]);
      }
    },
    [onFileSelect, maxSize, accept],
  );

  const handleFileSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        validateAndProcessFile(files[0]);
      }
    },
    [onFileSelect, maxSize, accept],
  );

  const validateAndProcessFile = (file: File) => {
    // Check file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    // Check file type
    const acceptedExtensions = accept.split(",").map((ext) => ext.trim());
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

    if (!acceptedExtensions.some((ext) => fileExtension.endsWith(ext))) {
      setError(`Only ${accept} files are allowed`);
      return;
    }

    setError("");
    onFileSelect(file);
  };

  return (
    <div className="w-full">
      <div
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200 ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
        } `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <div className="flex flex-col items-center space-y-2">
          <svg
            className="h-12 w-12 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {accept} • Max {maxSize / (1024 * 1024)}MB
          </p>
        </div>
      </div>

      <input
        id="file-input"
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
