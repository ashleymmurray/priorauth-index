import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata = {
  title: "The Prior Auth Report | The Prior Auth Index",
  description:
    "Monthly analysis of payer reporting behavior, prior authorization transparency data, workflow burden, denial patterns, and public disclosure gaps across U.S. health plans.",
};

export default function NewsletterPage() {
  return (
    <main
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "28px 24px 56px",
      }}
    >
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "#1a365d",
            fontWeight: 700,
            fontFamily: "'IBM Plex Mono', monospace",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 16,
              height: 2,
              background: "#1a365d",
              display: "inline-block",
            }}
          />
          The Prior Auth Report
        </div>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#1a365d",
            lineHeight: 1.05,
            margin: "0 0 12px",
            letterSpacing: "-1px",
          }}
        >
          Monthly analysis of the systems behind prior authorization.
        </h1>

        <p
          style={{
            fontSize: 14,
            color: "#555",
            lineHeight: 1.7,
            maxWidth: 760,
            margin: "0 0 8px",
          }}
        >
          The Prior Auth Report tracks payer disclosure behavior, denial and
          appeal patterns, workflow burden, and the operational gaps emerging
          beneath public prior authorization transparency data.
        </p>

        <p
          style={{
            fontSize: 12,
            color: "#777",
            margin: 0,
          }}
        >
          Launching late July 2026. Early subscribers receive the first issue.
        </p>
      </div>

      <NewsletterSignup />

      <section
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          padding: 20,
          marginTop: 18,
        }}
      >
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1a365d",
            margin: "0 0 10px",
          }}
        >
          What the report will cover
        </h2>

        <div
          style={{
            fontSize: 13,
            color: "#555",
            lineHeight: 1.7,
          }}
        >
          <p style={{ margin: "0 0 10px" }}>
            The Prior Auth Report will follow the public rollout of prior
            authorization transparency data, including publication gaps, payer
            reporting behavior, denial and appeal patterns, workflow variation,
            and operational burden.
          </p>

          <p style={{ margin: 0 }}>
            The focus is not only whether data was published, but whether it is
            usable, comparable, source-linked, and meaningful for people trying
            to understand how prior authorization actually functions across
            health plans.
          </p>
        </div>
      </section>
    </main>
  );
}