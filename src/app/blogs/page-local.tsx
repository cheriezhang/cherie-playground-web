import { getLocalArticles } from "@/lib/get-local-articles";

import BlogHome from "./blog-home";

export default async function BlogPage() {
  const articles = await getLocalArticles();

  return <BlogHome articles={articles} />;
}
