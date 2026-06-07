import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "32px 16px 48px",
      }}
    >
      <section style={{ marginBottom: 36 }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 10px",
            background: "#eef2f7",
            border: "1px solid #dbe4ee",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 600,
            color: "#1a365d",
            fontFamily: "'IBM Plex Mono', monospace",
            marginBottom: 16,
          }}
        >
          Independent Prior Authorization Transparency Tracking
        </div>

        <h1
          style={{
            fontSize: 44,
            lineHeight: 1.05,
            color: "#1a365d",
            marginBottom: 18,
            maxWidth: 820,
          }}
        >
          Prior authorization transparency data,
          denial rate analysis, and CMS reporting
          compliance tracking.
        </h1>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: "#555",
            maxWidth: 760,
            marginBottom: 26,
          }}
        >
          The Prior Auth Index tracks prior
          authorization denial rates, appeal
          overturn data, CMS transparency
          compliance, and payer reporting behavior
          across U.S. health plans.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/metrics"
            style={{
              padding: "12px 16px",
              background: "#1a365d",
              color: "#fff",
              textDecoration: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Explore Metrics
          </Link>

          <Link
            href="/compliance-tracker"
            style={{
              padding: "12px 16px",
              background: "#fff",
              color: "#1a365d",
              textDecoration: "none",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            View Compliance Tracker
          </Link>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 42,
        }}
      >
        {[
          {
            title: "Prior Authorization Metrics",
            text:
              "Denial rates, appeal overturn data, and approval metrics across major Medicare Advantage and ACA Marketplace insurers.",
            href: "/metrics",
          },
          {
            title: "CMS Compliance Tracker",
            text:
              "Track payer publication status, machine-readable reporting availability, and transparency compliance progress.",
            href: "/compliance-tracker",
          },
          {
            title: "Insights & Analysis",
            text:
              "Research and analysis on operational burden, payer transparency behavior, and CMS interoperability policy.",
            href: "/insights",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "block",
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              padding: 20,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#1a365d",
                marginBottom: 10,
              }}
            >
              {item.title}
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#555",
                lineHeight: 1.7,
              }}
            >
              {item.text}
            </div>
          </Link>
        ))}
      </section>

      <section
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          padding: 24,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#1a365d",
            marginBottom: 14,
          }}
        >
          Why this exists
        </div>

        <div
          style={{
            fontSize: 14,
            color: "#555",
            lineHeight: 1.9,
            display: "grid",
            gap: 14,
          }}
        >
          <p>
            Prior authorization has historically
            operated with limited public visibility
            into denial rates, approval behavior,
            appeal outcomes, operational burden, and
            payer reporting consistency.
          </p>

          <p>
            CMS interoperability rule CMS-0057-F
            created new public reporting
            requirements for impacted health plans,
            including publication of prior
            authorization metrics beginning in 2026.
          </p>

          <p>
            The Prior Auth Index aggregates,
            structures, and analyzes those emerging
            datasets in a centralized public
            resource intended for research,
            operational analysis, journalism, and
            transparency tracking.
          </p>
        </div>
      </section>
    </main>
  );
}
