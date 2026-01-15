"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UI_CONFIG } from "@/config/ui";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortUrl("");

    if (!url) {
      toast.error(UI_CONFIG.toasts.urlRequired);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }

      setShortUrl(data.shortUrl);
      toast.success(UI_CONFIG.toasts.generationSuccess);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success(UI_CONFIG.toasts.copySuccess);
    } catch (err) {
      toast.error(UI_CONFIG.toasts.copyError);
    }
  };

  const { branding, form, success, footer } = UI_CONFIG;

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{
      background: `linear-gradient(to bottom right, var(--color-bg-gradient-start), var(--color-bg-gradient-middle), var(--color-bg-gradient-end))`
    }}>
      <main className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-primary)' }}>
            {branding.siteName}
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {branding.tagline}
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
            {branding.disclaimer}
          </p>
        </div>

        <div className="rounded-2xl p-8 shadow-2xl" style={{
          backgroundColor: 'var(--color-card-bg)',
          borderWidth: '1px',
          borderColor: 'var(--color-card-border)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--color-text-label)' }}
              >
                {form.inputLabel}
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={form.inputPlaceholder}
                className="w-full px-4 py-3 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  backgroundColor: 'var(--color-input-bg)',
                  borderWidth: '1px',
                  borderColor: 'var(--color-input-border)',
                  '--tw-ring-color': 'var(--color-primary)'
                } as React.CSSProperties}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: loading ? 'var(--color-disabled)' : 'var(--color-primary)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                }
              }}
            >
              {loading ? form.submitButton.loading : form.submitButton.idle}
            </button>
          </form>

          {shortUrl && (
            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-lg" style={{
                backgroundColor: 'var(--color-success-bg)',
                borderWidth: '1px',
                borderColor: 'var(--color-success-border)'
              }}>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--color-success)' }}>
                  {success.title}
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    className="flex-1 px-3 py-2 rounded text-zinc-300 text-sm font-mono"
                    style={{
                      backgroundColor: 'var(--color-input-bg)',
                      borderWidth: '1px',
                      borderColor: 'var(--color-input-border)'
                    }}
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 text-zinc-300 rounded transition-colors text-sm font-medium"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                    }}
                  >
                    {success.copyButton}
                  </button>
                </div>
              </div>

              <div className="text-xs space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                <p>{success.originalUrlPrefix} {url}</p>
                <p style={{ color: 'var(--color-warning)' }}>
                  {success.warningMessage}
                </p>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-sm space-y-2">
          <p style={{ color: 'var(--color-text-muted)' }}>
            {footer.disclaimer}
          </p>
          <div className="flex items-center justify-center gap-4" style={{ color: 'var(--color-text-secondary)' }}>
            <span>
              {footer.builtBy.text}{" "}
              <a
                href={footer.builtBy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'var(--color-primary)' }}
              >
                {footer.builtBy.name}
              </a>
            </span>
            <span>•</span>
            <a
              href={footer.sourceCode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: 'var(--color-primary)' }}
            >
              {footer.sourceCode.text}
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
