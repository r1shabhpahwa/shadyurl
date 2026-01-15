import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  generateShortCode,
  getRandomDomain,
  getRandomPath,
  buildSuspiciousURL,
  isValidURL,
} from "@/lib/url-generator";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, customDomain } = body;

    // Validate input
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required and must be a string" },
        { status: 400 }
      );
    }

    // Validate URL format
    if (!isValidURL(url)) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Generate unique short code
    let shortCode = generateShortCode();
    let attempts = 0;
    while (await db.shortCodeExists(shortCode)) {
      shortCode = generateShortCode();
      attempts++;
      if (attempts > 10) {
        // If we can't find a unique code after 10 attempts, make it longer
        shortCode = generateShortCode(8);
        break;
      }
    }

    // Select domain (custom or random)
    const domain = customDomain || getRandomDomain();
    const suspiciousPath = getRandomPath();

    // Create URL mapping
    const mapping = await db.createURL({
      id: nanoid(),
      originalUrl: url,
      shortCode,
      suspiciousPath,
      domain,
    });

    // Build the suspicious URL
    const suspiciousUrl = buildSuspiciousURL(
      domain,
      shortCode,
      suspiciousPath,
      true
    );

    return NextResponse.json({
      success: true,
      originalUrl: url,
      shortUrl: suspiciousUrl,
      shortCode,
      createdAt: mapping.createdAt,
    });
  } catch (error) {
    console.error("Error shortening URL:", error);
    return NextResponse.json(
      { error: "Failed to shorten URL" },
      { status: 500 }
    );
  }
}
