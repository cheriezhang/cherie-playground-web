// components/CodeEditor.tsx
"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({
  value,
  language = "javascript",
  onChange,
  height = "400px",
  readOnly = false,
}: {
  value: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  height?: string;
  readOnly?: boolean;
}) {
  return (
    <Editor
      height={height}
      defaultLanguage={language}
      defaultValue={value}
      onChange={onChange}
      options={{
        readOnly,
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  );
}
