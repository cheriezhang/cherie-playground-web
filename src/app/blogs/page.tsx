import { getPublishedBlogs } from "@/lib/database/get_data";
import type { TArticle } from "@/lib/types";

import BlogHome from "./blog-home";

// a waterfall with images
const BlogsHome = async () => {
  const blogPosts = await getPublishedBlogs();

  // Convert BlogPost to TArticle format to render
  const articles: TArticle[] = blogPosts.map((blog) => ({
    id: blog.id,
    metadata: {
      slug: blog.slug,
      title: blog.title,
      summary: blog.summary || "",
      created_at: blog.created_at,
      updated_at: blog.updated_at,
      tags: blog.tags,
      cover_image: blog.cover_image || undefined,
    },
  }));

  return <BlogHome articles={articles} />;
};

export default BlogsHome;
