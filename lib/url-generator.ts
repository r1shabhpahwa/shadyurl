import { DOMAINS, SUSPICIOUS_SUBDOMAINS, SUSPICIOUS_PATHS } from "@/config/domains";
import type { Domain, SuspiciousSubdomain, SuspiciousPath } from "@/config/domains";

/**
 * Generate a random suspicious subdomain
 */
export function getRandomSubdomain(): SuspiciousSubdomain {
  const randomIndex = Math.floor(Math.random() * SUSPICIOUS_SUBDOMAINS.length);
  return SUSPICIOUS_SUBDOMAINS[randomIndex];
}

/**
 * Generate a random suspicious path segment
 */
export function getRandomPath(): SuspiciousPath {
  const randomIndex = Math.floor(Math.random() * SUSPICIOUS_PATHS.length);
  return SUSPICIOUS_PATHS[randomIndex];
}

/**
 * Generate a random domain from the configured list
 */
export function getRandomDomain(): Domain {
  const randomIndex = Math.floor(Math.random() * DOMAINS.length);
  return DOMAINS[randomIndex];
}

/**
 * Generate a random short code (6 characters, alphanumeric)
 */
export function generateShortCode(length: number = 6): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate additional suspicious query parameters
 */
export function generateSuspiciousParams(): string {
  const paramOptions = [
    `ref=${generateShortCode(8)}`,
    `token=${generateShortCode(12)}`,
    `session=${generateShortCode(10)}`,
    `id=${generateShortCode(8)}`,
    `verify=${generateShortCode(6)}`,
    `auth=${generateShortCode(10)}`,
  ];

  // Randomly include 0-2 parameters
  const numParams = Math.floor(Math.random() * 3);
  const selectedParams: string[] = [];

  for (let i = 0; i < numParams; i++) {
    const randomIndex = Math.floor(Math.random() * paramOptions.length);
    selectedParams.push(paramOptions[randomIndex]);
  }

  return selectedParams.length > 0 ? `?${selectedParams.join("&")}` : "";
}

/**
 * Build the full suspicious URL
 */
export function buildSuspiciousURL(
  domain: string,
  shortCode: string,
  suspiciousPath: string,
  includeParams: boolean = true
): string {
  const subdomain = getRandomSubdomain();
  const protocol = domain.includes("localhost") ? "http" : "https";
  const params = includeParams ? generateSuspiciousParams() : "";

  return `${protocol}://${subdomain}.${domain}/${suspiciousPath}/${shortCode}${params}`;
}

/**
 * Parse a suspicious URL to extract the short code
 */
export function parseShortCode(pathname: string): string | null {
  // Expected format: /suspicious-path/shortCode
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length >= 2) {
    return parts[1];
  }
  return null;
}

/**
 * Validate if a URL is valid
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
