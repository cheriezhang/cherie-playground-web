import { NextRequest, NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query") || "";

  if (query) {
    await delay(5000);
  }

  return NextResponse.json({
    message: `This is a Slow Response for ${query}`,
    timestamp: Date.now(),
  });
}
