import { getPublishedBlogs } from "@/lib/database/get_data";

import BlogHome from "./blog-home";

// a waterfall with images
const BlogsHome = async () => {
  const blogPosts = await getPublishedBlogs();

  return <BlogHome articles={blogPosts} />;
};

export default BlogsHome;
