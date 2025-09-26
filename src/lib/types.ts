import { JSX } from "react";

// for page render
export type TBlogMetadata = {
  slug: string;
  title: string;
  summary: string;
  tags?: string[];
  components?: string[];
  cover_image?: string;
  draft?: boolean;
  created_at: string;
  updated_at: string;
};

// for database
export type TBlogPost = TBlogMetadata & {
  id?: string;
  content?: string;
};

export type TNoteMetadata = {
  title: string;
  date: string;
  tags: string[];
};

export type TNote = {
  id: string;
  metadata: TNoteMetadata;
  renderedContent: JSX.Element;
};
