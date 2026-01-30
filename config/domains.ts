/**
 * Domain configuration for the URL shortener
 * Domains are read from DOMAINS environment variable (comma-separated)
 * Falls back to localhost:3000 for development
 */
const getDomainsFromEnv = (): string[] => {
  const envDomains = process.env.DOMAINS || process.env.NEXT_PUBLIC_DOMAINS;

  if (envDomains) {
    return envDomains.split(',').map(d => d.trim()).filter(Boolean);
  }

  // Default to localhost for development
  return ["localhost:3000"];
};

export const DOMAINS = getDomainsFromEnv();

/**
 * Suspicious-looking subdomains that will be randomly selected
 * Add more creative suspicious subdomains here
 */
export const SUSPICIOUS_SUBDOMAINS = [
  "secure-login",
  "verify-account",
  "update-billing",
  "confirm-identity",
  "reset-password",
  "account-recovery",
  "security-alert",
  "urgent-action",
  "verify-now",
  "claim-reward",
  "free-gift",
  "winner-notification",
  "tax-refund",
  "package-delivery",
  "support-team",
  "official-site",
  "customer-service",
  "billing-update",
  "payment-required",
  "suspended-account",
] as const;

/**
 * Suspicious path segments to make URLs look more suspicious
 */
export const SUSPICIOUS_PATHS = [
  "login",
  "verify",
  "confirm",
  "secure",
  "account",
  "update",
  "auth",
  "validate",
  "check",
  "review",
] as const;

export type Domain = string;
export type SuspiciousSubdomain = (typeof SUSPICIOUS_SUBDOMAINS)[number];
export type SuspiciousPath = (typeof SUSPICIOUS_PATHS)[number];