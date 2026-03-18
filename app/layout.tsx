import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";

// ...existing code...

export const metadata: Metadata = {
  title: "Cap_Mojay{dev} — George Edwin | Developer & Data Scientist",
  description:
    "Portfolio of George Mochama Edwin — Versatile Developer, Data Scientist, and Educator based in Nairobi, Kenya. BSc Computer Science, Moringa School Data Science & ML graduate.",
  keywords: [
    "George Edwin",
    "Cap_Mojay",
    "Data Scientist",
    "Developer",
    "Nairobi",
    "Kenya",
    "Python",
    "Machine Learning",
    "Next.js",
  ],
  authors: [{ name: "George Mochama Edwin" }],
  openGraph: {
    title: "Cap_Mojay{dev} — George Edwin",
    description: "Developer · Data Scientist · Educator · Nairobi, Kenya",
    url: "https://capmojay.vercel.app",
    siteName: "Cap_Mojay Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cap_Mojay{dev} — George Edwin",
    description: "Developer · Data Scientist · Educator · Nairobi, Kenya",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="grid-bg" />
          <div className="scanline" />
          <Cursor />
          <Navbar />
          <main>{children}</main>
          <footer className="relative z-10 border-t border-[var(--border)] py-8 text-center">
            <p className="font-mono text-sm text-[var(--muted)]">
              <span className="text-[var(--green)]">Cap_Mojay</span>
              <span className="text-[var(--text)]">{"{dev}"}</span>
              {" · "}George Mochama Edwin
              {" · "}Nairobi, Kenya 🇰🇪
            </p>
            <p className="font-mono text-xs text-[var(--muted)] mt-2">
              © {new Date().getFullYear()} · Built with Next.js + Tailwind ·
              Deployed on Vercel ·{" "}
              <span className="text-[var(--green)]">
                All systems operational
              </span>
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
