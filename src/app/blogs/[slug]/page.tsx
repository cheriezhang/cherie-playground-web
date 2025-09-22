import { Suspense } from "react";

import {
  Breadcrumbs,
  extractHeadings,
  MDX,
  ServerLoading,
  TOC,
} from "@/components";
import { getBlogBySlug } from "@/lib/database/get_data";
import type { TArticle } from "@/lib/types";

async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogPost = await getBlogBySlug(slug);

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  // Convert BlogPost to TArticle format for MDX component
  const article: TArticle = {
    id: blogPost.id,
    metadata: {
      slug: blogPost.id,
      title: blogPost.title,
      summary: blogPost.summary || "",
      created_at: blogPost.created_at,
      updated_at: blogPost.updated_at,
      tags: blogPost.tags,
      cover_image: blogPost.cover_image || undefined,
      components: blogPost.components,
    },
    content: blogPost.content,
  };

  const headings = extractHeadings(blogPost.content);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_200px]">
      <div className="mb-8 rounded-xl bg-surface px-8 py-6">
        <Breadcrumbs />
        <article className="prose max-w-none">
          <div className="mt-8">
            <MDX content={article.content || ""} meta={article.metadata} />
          </div>
        </article>
      </div>
      <aside className="sticky top-0 hidden self-start rounded-xl bg-surface p-4 lg:block">
        <TOC headings={headings} />
      </aside>
    </div>
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ServerLoading />}>
      <BlogPost params={params} />
    </Suspense>
  );
}
