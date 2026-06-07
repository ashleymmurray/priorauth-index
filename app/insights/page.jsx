import Link from "next/link";
import { INSIGHTS_POSTS } from "@/data/insights";

export default function InsightsPage() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "24px 16px 48px" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#1a365d", marginBottom: 8 }}>
          Insights
        </div>

        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
          Analysis on prior authorization transparency, payer reporting patterns, and operational burden.
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
