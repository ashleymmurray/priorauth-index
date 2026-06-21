import Link from "next/link";
import { INSIGHTS_POSTS } from "@/data/insights";

export default function InsightsPage() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1.6,
            color: "#64748b",
            fontFamily: "'IBM Plex Mono', monospace",
            marginBottom: 10,
          }}
        >
          Research & Analysis
        </div>

        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#1a365d",
            lineHeight: 1.15,
            margin: "0 0 12px",
          }}
        >
          Prior Authorization Insights
        </h1>

        <div
          style={{
            fontSize: 15,
            color: "#475569",
            lineHeight: 1.75,
            maxWidth: 720,
          }}
        >
          Independent analysis of prior authorization reporting, payer disclosure
          behavior, denial and appeal patterns, and the operational burden that
          public transparency data often fails to capture.
        </div>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        {INSIGHTS_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/insights/${post.slug}`}
            style={{
              display: "block",
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              padding: 18,
              textDecoration: "none",
            }}
          >
            <div style={{ fontSize: 11, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 8 }}>
              {post.date} · {post.readTime}
            </div>

            <div style={{ fontSize: 19, fontWeight: 700, color: "#1a365d", marginBottom: 8 }}>
              {post.title}
            </div>

            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
              {post.excerpt}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
