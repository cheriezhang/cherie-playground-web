import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PreviewFileState {
  file: File | null;
  content: string;
  isParsing: boolean;
  parseError: string | null;
}

interface PreviewFileActions {
  setFile: (file: File | null) => void;
  setContent: (content: string) => void;
  setIsParsing: (isParsing: boolean) => void;
  setParseError: (error: string | null) => void;
  reset: () => void;
}

const initialState: PreviewFileState = {
  file: null,
  content: "",
  isParsing: false,
  parseError: null,
};

export const usePreviewFileStore = create<
  PreviewFileState & PreviewFileActions
>()(
  devtools(
    (set) => ({
      ...initialState,
      setFile: (file) => set({ file }),
      setContent: (content) => set({ content }),
      setIsParsing: (isParsing) => set({ isParsing }),
      setParseError: (parseError) => set({ parseError }),
      reset: () => set(initialState),
    }),
    {
      name: "preview-file-store",
    },
  ),
);
