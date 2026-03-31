"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

// ── Pull directly from deploy-overrides for the homepage preview ──
// These 3 cards are shown on the homepage — add your real details here
const featuredProjects = [
  {
    name: "cap-mojay-portfolio",
    title: "Cap_Mojay Portfolio",
    description:
      "Personal portfolio site built with Next.js 15, Tailwind CSS, Framer Motion and MDX blog. Terminal dark aesthetic.",
    github: "https://github.com/mojay6111/cap-mojay-portfolio",
    deploy: "https://cap-mojay-portfolio.vercel.app",
    platform: "vercel" as const,
    language: "TypeScript",
    langColor: "#3178c6",
    tags: ["Next.js", "Tailwind", "MDX", "Framer"],
    status: "live",
  },
  {
    name: "primesense",
    title: "PrimeSense",
    description:
      "NLP-powered sentiment analysis on Amazon Prime Video user reviews. Classifies reviews as **Positive**, **Neutral**, or **Negative** using classical ML models (SVM, Naive Bayes, Random Forest) and BERT.",
    github: "https://github.com/mojay6111/primesense",
    deploy: "https://primesense.onrender.com",
    platform: "render" as const,
    language: "Python",
    langColor: "#3572A5",
    tags: ["Python", "Data Science", "API"],
    status: "live",
  },
  {
    name: "retailers-ai-pricing",
    title: "Retailers AI Pricing",
    description:
      "A production-ready retail pricing intelligence system powered by machine learning.Analyses transaction history, estimates price elasticity per product, forecasts demand,and recommends optimal prices — all exposed via a FastAPI backend and React dashboard.",
    github: "https://github.com/mojay6111/Retailers_AI_-Pricing",
    deploy: "https://retailers-ai-pricing.vercel.app/",
    platform: "vercel" as const,
    language: "Python",
    langColor: "#3178c6",
    tags: ["Python", "ML", "AI", "Pricing"],
    status: "live",
  },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

function PlatformBadge({ platform }: { platform: "vercel" | "render" }) {
  return platform === "vercel" ? (
    <span
      style={{
        fontFamily: "Fira Code, monospace",
        fontSize: "0.65rem",
        color: "var(--text)",
        background: "var(--bg3)",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        padding: "1px 7px",
      }}
    >
      ▲ Vercel
    </span>
  ) : (
    <span
      style={{
        fontFamily: "Fira Code, monospace",
        fontSize: "0.65rem",
        color: "var(--blue)",
        background: "var(--bg3)",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        padding: "1px 7px",
      }}
    >
      ⬡ Render
    </span>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("visible", e.isIntersecting),
        ),
      { threshold: 0.1 },
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative z-10">
      <div className="section-wrap">
        {/* Header */}
        <div className="section-header reveal">
          <span className="section-prompt">ls ./projects/ -la</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>

        {/* Featured 3 cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {featuredProjects.map((p, i) => (
            <div
              key={p.name}
              className="terminal-card reveal flex flex-col"
              style={{
                transitionDelay: `${i * 0.1}s`,
                position: "relative",
                transition:
                  "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-5px)";
                el.style.borderColor = "rgba(0,255,136,0.35)";
                el.style.boxShadow =
                  "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,255,136,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "var(--green)",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s",
                }}
                className="card-accent"
              />

              {/* Terminal bar */}
              <div
                className="terminal-bar"
                style={{ justifyContent: "space-between" }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span
                    className="t-dot"
                    style={{ background: "var(--green)" }}
                  />
                  <span
                    style={{
                      fontFamily: "Fira Code, monospace",
                      fontSize: "0.72rem",
                    }}
                  >
                    {p.name}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--green)",
                      boxShadow: "0 0 6px rgba(0,255,136,0.6)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Fira Code, monospace",
                      fontSize: "0.65rem",
                      color: "var(--green)",
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div
                style={{
                  padding: "1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: "10px",
                }}
              >
                {/* Title */}
                <h3
                  style={{
                    fontFamily: "Fira Code, monospace",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  <span style={{ color: "var(--green)" }}>// </span>
                  {p.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "Fira Code, monospace",
                    fontSize: "0.76rem",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {p.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="tag"
                      style={{
                        fontFamily: "Fira Code, monospace",
                        fontSize: "0.65rem",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Language + platform */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontFamily: "Fira Code, monospace",
                      fontSize: "0.68rem",
                      color: "var(--muted)",
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: LANG_COLORS[p.language] ?? "#8b949e",
                        display: "inline-block",
                      }}
                    />
                    {p.language}
                  </span>
                  <PlatformBadge platform={p.platform} />
                </div>

                {/* Links */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.8rem",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "10px",
                    marginTop: "auto",
                  }}
                >
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "Fira Code, monospace",
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--green)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--muted)")
                    }
                  >
                    ⌥ GitHub
                  </a>
                  <a
                    href={p.deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "Fira Code, monospace",
                      fontSize: "0.75rem",
                      color:
                        p.platform === "vercel" ? "var(--text)" : "var(--blue)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginLeft: "auto",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--green)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        p.platform === "vercel" ? "var(--text)" : "var(--blue)")
                    }
                  >
                    → Live Demo ↗
                  </a>
                </div>
              </div>

              {/* Hover accent CSS */}
              <style>{`.terminal-card:hover .card-accent { transform: scaleX(1) !important; }`}</style>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div
          className="reveal text-center"
          style={{ transitionDelay: "0.35s" }}
        >
          <Link
            href="/projects"
            className="btn btn-outline"
            style={{
              borderColor: "var(--green)",
              color: "var(--green)",
              display: "inline-flex",
            }}
          >
            ⌥ view all projects on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
