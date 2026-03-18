import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

function getPost(slug: string) {
  const filepath = path.join(process.cwd(), 'posts', `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ✅ await first
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.frontmatter.title} — Cap_Mojay{dev}`,
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return (
      <main
        className="relative z-10 min-h-screen"
        style={{ paddingTop: "52px" }}
      >
        <div className="section-wrap">
          <h1
            className="font-mono text-2xl font-bold"
            style={{ color: "var(--red)" }}
          >
            404 — Post not found
          </h1>
          <Link href="/blog" className="btn btn-outline mt-4 inline-flex">
            ← Back to blog
          </Link>
        </div>
      </main>
    );
  }

  const { frontmatter, content } = post;

  return (
    <main className="relative z-10 min-h-screen" style={{ paddingTop: "52px" }}>
      <div className="section-wrap max-w-[720px]">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex font-mono text-xs mb-6 mt-4 transition-colors no-underline"
          style={{ color: "var(--muted)" }}
        >
          ← back to blog
        </Link>

        {/* Post header */}
        <div className="terminal-card mb-8">
          <div className="terminal-bar">
            <span className="t-dot" style={{ background: "var(--green)" }} />
            <span>{slug}.mdx</span>
          </div>
          <div className="p-6">
            <div
              className="flex items-center gap-3 mb-3 font-mono text-xs"
              style={{ color: "var(--muted)" }}
            >
              <span>{frontmatter.date}</span>
              <span>·</span>
              <span>{frontmatter.mins} min read</span>
              <span
                className="px-2 py-0.5 rounded border"
                style={{ borderColor: "var(--green)", color: "var(--green)" }}
              >
                {frontmatter.tag}
              </span>
            </div>
            <h1
              className="font-mono font-bold text-2xl leading-snug"
              style={{ color: "var(--text)" }}
            >
              {frontmatter.title}
            </h1>
          </div>
        </div>

        {/* MDX content */}
        <article className="mdx-content">
          <MDXRemote source={content} />
        </article>

        {/* Footer */}
        <div
          className="mt-12 pt-6 font-mono text-xs flex flex-wrap gap-4 justify-between"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--muted)",
          }}
        >
          <span>
            Written by{" "}
            <span style={{ color: "var(--green)" }}>George Edwin</span> ·
            Nairobi, Kenya 🇰🇪
          </span>
          <Link
            href="/blog"
            className="no-underline"
            style={{ color: "var(--amber)" }}
          >
            ← More posts
          </Link>
        </div>
      </div>
    </main>
  );
}
