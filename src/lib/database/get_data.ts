import type { TBlogPost } from "../types";
import { createClient } from "./server-client";

// Get all published blog posts (draft: false)
export async function getPublishedBlogs(): Promise<TBlogPost[]> {
  const dbClient = await createClient();
  // todo： 不拿content
  const { data: blogs, error } = await dbClient
    .from("blogs")
    .select("*")
    .eq("draft", false)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching published blogs:", error);
    return [];
  }

  return blogs || [];
}

// Get all blogs (including drafts) - for authenticated users
export async function getAllBlogs(): Promise<TBlogPost[]> {
  const dbClient = await createClient();
  const { data: blogs, error } = await dbClient
    .from("blogs")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching all blogs:", error);
    return [];
  }

  return blogs || [];
}

// Get a specific blog post by slug
export async function getBlogBySlug(slug: string): Promise<TBlogPost | null> {
  const dbClient = await createClient();
  const { data: blog, error } = await dbClient
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching blog by Slug:", error);
    return null;
  }

  return blog;
}

// Check if a blog is draft
export async function isBlogDraft(slug: string): Promise<boolean> {
  const blog = await getBlogBySlug(slug);
  return blog?.draft ?? false;
}
