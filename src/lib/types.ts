import { JSX } from "react";

// for page render
export type TArticleMetadata = {
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

export type TArticle = {
  id?: string;
  metadata: TArticleMetadata;
  content?: string;
};

// for database
export type TBlogPost = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  content: string;
  tags?: string[];
  components?: string[];
  cover_image?: string;
  draft: boolean;
  created_at: string;
  updated_at: string;
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
