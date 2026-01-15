/**
 * Domain configuration for the URL shortener
 * Add your domains here - all should point to this application
 */
export const DOMAINS = [
  "localhost:3000",
  // Add your custom domains here:
  // "shadyurl.com",
  // "totally-legit.link",
  // "not-a-scam.io",
] as const;

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

export type Domain = (typeof DOMAINS)[number];
export type SuspiciousSubdomain = (typeof SUSPICIOUS_SUBDOMAINS)[number];
export type SuspiciousPath = (typeof SUSPICIOUS_PATHS)[number];