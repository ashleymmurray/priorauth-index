import { notFound } from "next/navigation";
import Link from "next/link";

import ArticleBody from "@/components/ArticleBody";
import { INSIGHTS_POSTS } from "@/data/insights";

export function generateStaticParams() {
  return INSIGHTS_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = INSIGHTS_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Insight Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function InsightArticlePage({ params }) {
  const post = INSIGHTS_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
      <Link
        href="/insights"
        style={{
          display: "inline-block",
          marginBottom: 18,
          color: "#1a365d",
          fontSize: 12,
          fontFamily: "'IBM Plex Mono', monospace",
          textDecoration: "underline",
        }}
      >
        ← Back to Insights
      </Link>

      <article>
        <header style={{ maxWidth: 680, margin: "0 auto 28px" }}>
          <div style={{ fontSize: 11, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 10 }}>
            {post.date} · {post.readTime}
          </div>

          <h1 style={{ fontSize: 34, lineHeight: 1.15, color: "#1a365d", marginBottom: 12 }}>
            {post.title}
          </h1>

          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7 }}>
            {post.excerpt}
          </p>
        </header>

        <ArticleBody content={post.content} />
      </article>
    </main>
  );
}
