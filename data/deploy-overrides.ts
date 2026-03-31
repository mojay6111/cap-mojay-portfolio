/**
 * deploy-overrides.ts
 * ─────────────────────────────────────────────────────────────────
 * Add your deployed URLs here, keyed by the exact GitHub repo name.
 * These will appear as "Live Demo" buttons on the project cards.
 *
 * Example:
 *   'my-repo-name': {
 *     url:      'https://my-app.vercel.app',
 *     platform: 'vercel',   // 'vercel' | 'render' | 'other'
 *   },
 * ─────────────────────────────────────────────────────────────────
 */

export type Platform = "vercel" | "render" | "other";

export interface DeployInfo {
  url: string;
  platform: Platform;
}

const deployOverrides: Record<string, DeployInfo> = {
  // ── Add your real deployed projects below ──────────────────────
  "cap-mojay-portfolio": {
    url: "https://cap-mojay-portfolio.vercel.app",
    platform: "vercel",
  },
  "primesense": {
    url: "https://primesense.onrender.com",
    platform: "render",
  },
  "retailers-ai-pricing": {
    url: "https://retailers-ai-pricing.onrender.com",
    platform: "render",
  },
  // ──────────────────────────────────────────────────────────────
};

export default deployOverrides;
