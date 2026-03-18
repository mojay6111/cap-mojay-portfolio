import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Cap_Mojay{dev}",
  description:
    "Articles on data science, Python, machine learning, and teaching tech by George Edwin.",
};

const posts = [
  {
    slug: "ml-pipeline-fastapi-redis",
    date: "Mar 2026",
    title: "Building a real-time ML pipeline with FastAPI and Redis",
    excerpt:
      "How to serve a trained ML model in production using FastAPI and Redis Streams — with retries, queuing, and monitoring baked in.",
    tag: { label: "ML", color: "var(--green)" },
    mins: 8,
  },
  {
    slug: "sql-before-nosql",
    date: "Feb 2026",
    title: "Why every developer should learn SQL before NoSQL",
    excerpt:
      "A relational mindset is the foundation of good data thinking. Here is why SQL first makes you a better engineer, full-stop.",
    tag: { label: "Data", color: "var(--blue)" },
    mins: 6,
  },
  {
    slug: "teaching-python-cbet",
    date: "Jan 2026",
    title: "Teaching Python with CBET: lessons from the classroom",
    excerpt:
      "Reflections on delivering competency-based Python lessons to diploma students — what worked, what didn't, and the tools that made the difference.",
    tag: { label: "Education", color: "var(--amber)" },
    mins: 7,
  },
  {
    slug: "eda-pandas-guide",
    date: "Dec 2025",
    title: "From data to decisions: a practical guide to EDA in Pandas",
    excerpt:
      "A step-by-step walkthrough of Exploratory Data Analysis using Pandas — from raw CSV to actionable insights, with real Kenyan datasets.",
    tag: { label: "Guide", color: "var(--purple)" },
    mins: 10,
  },
];

export default function BlogPage() {
  return (
    <main className="relative z-10 min-h-screen" style={{ paddingTop: "52px" }}>
      <div className="section-wrap">
        {/* Header */}
        <div className="section-header" style={{ marginTop: "2rem" }}>
          <span className="section-prompt">cat blog/posts.md</span>
          <h1 className="section-title">Blog & Writing</h1>
          <div className="section-line" />
        </div>

        {/* Post list */}
        <div className="space-y-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block terminal-card no-underline"
              style={{ textDecoration: "none" }}
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    {p.date}
                  </span>
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded border"
                    style={{ borderColor: p.tag.color, color: p.tag.color }}
                  >
                    {p.tag.label}
                  </span>
                  <span
                    className="font-mono text-xs ml-auto"
                    style={{ color: "var(--muted)" }}
                  >
                    {p.mins} min read
                  </span>
                </div>
                <h2
                  className="font-mono font-bold text-base mb-2"
                  style={{ color: "var(--text)" }}
                >
                  {p.title}
                </h2>
                <p
                  className="font-mono text-xs leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {p.excerpt}
                </p>
                <p
                  className="font-mono text-xs mt-3"
                  style={{ color: "var(--green)" }}
                >
                  → Read more
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Back home */}
        <div className="mt-8 pb-8">
          <Link href="/" className="btn btn-outline">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
