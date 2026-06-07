import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer
      style={{
        marginTop: 48,
        borderTop: "1px solid #e2e8f0",
        background: "#fafbfc",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "24px 16px 40px",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#1a365d",
            marginBottom: 6,
          }}
        >
          The Prior Auth Index
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            marginBottom: 18,
            maxWidth: 700,
          }}
        >
          Independent tracking and analysis of prior
          authorization transparency, denial rates,
          payer reporting compliance, and operational
          burden across U.S. health plans.
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            marginBottom: 18,
          }}
        >
          <Link
            href="/"
            style={{
              color: "#1a365d",
              textDecoration: "underline",
              fontSize: 12,
            }}
          >
            Home
          </Link>

          <Link
            href="/metrics"
            style={{
              color: "#1a365d",
              textDecoration: "underline",
              fontSize: 12,
            }}
          >
            Metrics
          </Link>

          <Link
            href="/compliance-tracker"
            style={{
              color: "#1a365d",
              textDecoration: "underline",
              fontSize: 12,
            }}
          >
            CMS Compliance Tracker
          </Link>

          <Link
            href="/insights"
            style={{
              color: "#1a365d",
              textDecoration: "underline",
              fontSize: 12,
            }}
          >
            Insights
          </Link>
        </div>

        <div
          style={{
            fontSize: 11,
            color: "#999",
            lineHeight: 1.8,
            borderTop: "1px solid #e2e8f0",
            paddingTop: 14,
          }}
        >
          Disclaimer: The Prior Auth Index is provided
          for informational and research purposes only.
          Data may be incomplete, delayed, or derived
          from third-party reporting sources. Always
          verify plan-specific information directly with
          the payer or official CMS publications.
        </div>
      </div>
    </footer>
  );
}
