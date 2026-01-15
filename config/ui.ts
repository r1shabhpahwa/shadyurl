/**
 * UI Configuration for ShadyURL
 * Customize all text, colors, and branding here
 */

export const UI_CONFIG = {
  // Site branding
  branding: {
    siteName: "ShadyURL",
    tagline: "Make your URLs look totally suspicious",
    disclaimer: "(For pranks and fun only - not for actual phishing!)",
  },

  // Page metadata
  metadata: {
    title: "ShadyURL - Make Your URLs Look Suspicious",
    description: "Generate suspicious-looking URLs for pranks and fun",
  },

  // Form configuration
  form: {
    inputLabel: "Enter your URL",
    inputPlaceholder: "https://example.com",
    submitButton: {
      idle: "Make it Shady",
      loading: "Generating...",
    },
  },

  // Success message configuration
  success: {
    title: "Your suspicious URL is ready:",
    copyButton: "Copy",
    originalUrlPrefix: "Original URL:",
    warningMessage: "Warning: This URL looks suspicious by design. Use responsibly!",
  },

  // Toast messages
  toasts: {
    urlRequired: "Please enter a URL",
    generationSuccess: "Suspicious URL generated successfully!",
    copySuccess: "Copied to clipboard!",
    copyError: "Failed to copy to clipboard",
  },

  // Footer
  footer: {
    disclaimer: "The URL is shady, but the website isn't!",
    builtBy: {
      text: "Built by",
      name: "Rishabh Pahwa",
      url: "https://rishabhpahwa.com",
    },
    sourceCode: {
      text: "View Source",
      url: "https://github.com/rishabhpahwa/shadyurl", // Update with your actual repo URL
    },
  },
} as const;

export type UIConfig = typeof UI_CONFIG;
