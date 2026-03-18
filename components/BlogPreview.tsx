"use client";
import { useEffect, useRef } from "react";
import GitHubCalendar from "react-github-calendar";

const posts = [
  {
    date: "Mar 2026",
    title: "Building a real-time ML pipeline with FastAPI and Redis",
    tag: { label: "ML", color: "var(--green)" },
    slug: "ml-pipeline-fastapi-redis",
    mins: 8,
  },
  {
    date: "Feb 2026",
    title: "Why every developer should learn SQL before NoSQL",
    tag: { label: "Data", color: "var(--blue)" },
    slug: "sql-before-nosql",
    mins: 6,
  },
  {
    date: "Jan 2026",
    title: "Teaching Python with CBET: lessons from the classroom",
    tag: { label: "Education", color: "var(--amber)" },
    slug: "teaching-python-cbet",
    mins: 7,
  },
  {
    date: "Dec 2025",
    title: "From data to decisions: a practical guide to EDA in Pandas",
    tag: { label: "Guide", color: "var(--purple)" },
    slug: "eda-pandas-guide",
    mins: 10,
  },
];

export default function BlogPreview() {
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
    <section id="blog" ref={sectionRef} className="relative z-10">
      <div className="section-wrap">
        {/* Blog header */}
        <div className="section-header reveal">
          <span className="section-prompt">cat blog/posts.md</span>
          <h2 className="section-title">Blog & Writing</h2>
          <div className="section-line" />
        </div>

        {/* Post list */}
        <div className="space-y-3 mb-10">
          {posts.map((p, i) => (
            <a
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="blog-item reveal flex items-center gap-4 terminal-card px-5 py-4 no-underline"
              style={{
                transitionDelay: `${i * 0.08}s`,
                display: "flex",
              }}
            >
              <span
                className="font-mono text-xs min-w-[64px]"
                style={{ color: "var(--muted)" }}
              >
                {p.date}
              </span>
              <span
                className="font-mono text-sm flex-1"
                style={{ color: "var(--text)" }}
              >
                {p.title}
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: "var(--muted)" }}
              >
                {p.mins} min
              </span>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded border"
                style={{ borderColor: p.tag.color, color: p.tag.color }}
              >
                {p.tag.label}
              </span>
            </a>
          ))}
        </div>

        <div className="text-center mb-14 reveal">
          <a href="/blog" className="btn btn-outline">
            → View all posts
          </a>
        </div>

        {/* GitHub activity graph */}
        <div className="section-header reveal">
          <span className="section-prompt">git log --all --graph</span>
          <h2 className="section-title">GitHub Activity</h2>
          <div className="section-line" />
        </div>

        <div
          className="terminal-card reveal"
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="terminal-bar">
            <span className="t-dot" style={{ background: "var(--green)" }} />
            <span>github_contributions.log</span>
          </div>
          <div className="p-5 overflow-x-auto">
            <GitHubCalendar
              username="mojay6111"
              colorScheme="dark"
              theme={{
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              style={{ fontFamily: "Fira Code, monospace", fontSize: "12px" }}
            />
            <p
              className="font-mono text-xs mt-3 text-center"
              style={{ color: "var(--muted)" }}
            >
              // Find me <span style={{ color: "var(--amber)" }}>@github/mojay6111</span>{" "}
              for <code style={{ color: "var(--green)" }}>live waks</code>{" "}
              as I handle real projects and contribute to open source!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
