import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ suspiciousPath: string; shortCode: string }> }
) {
  try {
    const { shortCode } = await params;

    // Look up the URL mapping
    const mapping = await db.getURLByShortCode(shortCode);

    if (!mapping) {
      return NextResponse.json(
        { error: "URL not found" },
        { status: 404 }
      );
    }

    // Increment click counter
    await db.incrementClicks(shortCode);

    // Redirect to the original URL
    return NextResponse.redirect(mapping.originalUrl, 302);
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.json(
      { error: "Failed to redirect" },
      { status: 500 }
    );
  }
}
