import matter from "gray-matter";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/database/server-client";

// Authentication helper function
async function authenticateRequest(req: NextRequest): Promise<boolean> {
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return false;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return true;
  } catch {
    return false;
  }
}

// POST - Upload a single MDX file
export async function POST(req: NextRequest) {
  try {
    const isAuthenticated = await authenticateRequest(req);
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.name.endsWith(".mdx")) {
      return NextResponse.json(
        { error: "Only MDX files are allowed" },
        { status: 400 },
      );
    }

    // Read file content
    const content = await file.text();

    // Parse frontmatter
    const { data: metadata, content: mdxContent } = matter(content);

    // Validate required metadata
    if (!metadata.title || !metadata.slug) {
      return NextResponse.json(
        {
          error: "Missing required metadata: title and slug are required",
        },
        { status: 400 },
      );
    }

    const dbClient = await createClient();

    // Check if article already exists
    const { data: existingArticle } = await dbClient
      .from("blogs")
      .select("*")
      .eq("slug", metadata.slug)
      .single();

    const articleData = {
      slug: metadata.slug,
      title: metadata.title,
      tags: metadata.tags || [],
      cover_image: metadata.cover_image
        ? `/static/blog/${metadata.cover_image}`
        : null,
      content: mdxContent,
      created_at: metadata.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
      draft: metadata.draft || false,
      summary: metadata.summary || "",
      components: metadata.components ?? [],
    };

    let result;
    if (existingArticle) {
      // Update existing article
      const { error } = await dbClient
        .from("blogs")
        .update(articleData)
        .eq("slug", metadata.slug);

      if (error) {
        throw new Error(`Error updating article: ${error.message}`);
      }

      result = {
        message: "Article updated successfully",
        slug: metadata.slug,
        action: "updated",
      };
    } else {
      // Insert new article
      const { error } = await dbClient.from("blogs").insert({
        ...articleData,
        created_at: new Date().toISOString(),
      });

      if (error) {
        throw new Error(`Error inserting article: ${error.message}`);
      }

      result = {
        message: "Article created successfully",
        slug: metadata.slug,
        action: "created",
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error uploading article:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
