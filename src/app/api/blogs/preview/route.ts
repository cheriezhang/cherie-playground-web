import matter from "gray-matter";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// Authentication helper function
async function authenticateRequest(req: NextRequest): Promise<boolean> {
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");

  console.log(req.cookies.get("token")?.value, token);
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

// POST - Preview MDX content without saving
export async function POST(req: NextRequest) {
  try {
    const isAuthenticated = await authenticateRequest(req);
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 },
      );
    }

    // Parse frontmatter and content
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

    // Return the parsed content for preview
    return NextResponse.json({
      metadata: {
        slug: metadata.slug,
        title: metadata.title,
        tags: metadata.tags || [],
        cover_image: metadata.cover_image || null,
        draft: metadata.draft || false,
        summary: metadata.summary || "",
        components: metadata.components ?? [],
        created_at: metadata.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      content: mdxContent,
      fullContent: content,
    });
  } catch (error) {
    console.error("Error previewing article:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
