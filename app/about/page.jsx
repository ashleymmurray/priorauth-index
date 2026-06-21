import Link from "next/link";

export const metadata = {
  title: "About | The Prior Auth Index",
  description:
    "About The Prior Auth Index, an independent source for tracking prior authorization transparency data, publication status, reporting usability, and payer disclosures across U.S. health plans.",
};

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        padding: "56px 20px 80px",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        {/* HERO */}
        <section
          style={{
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: "#64748b",
              fontFamily: "'IBM Plex Mono', monospace",
              marginBottom: 14,
            }}
          >
            About The Index
          </div>

          <h1
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              lineHeight: 1.05,
              fontWeight: 800,
              color: "#1a365d",
              marginBottom: 20,
              letterSpacing: "-0.04em",
            }}
          >
            The Prior Auth Index
          </h1>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "#4a5568",
              margin: 0,
            }}
          >
            The Prior Auth Index tracks prior authorization transparency data,
            publication status, denial metrics, appeal outcomes, and reporting
            usability across U.S. health plans.
          </p>
        </section>

        {/* MAIN CONTENT */}
        <section
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "36px 32px",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1a365d",
                  marginBottom: 14,
                }}
              >
                Reporting context
              </h2>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 18,
                }}
              >
                CMS required impacted health plans to begin publicly reporting
                prior authorization metrics under CMS-0057-F. The rule created
                the first large-scale public dataset covering approval rates,
                denial rates, appeal outcomes, and decision timeframes across
                portions of the U.S. insurance market.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 0,
                }}
              >
                Publication status alone does not determine whether reporting is
                usable, comparable, or complete. Reporting formats vary across
                plans, including structured tables, PDFs, incomplete pages,
                unavailable links, and disclosures that do not contain the
                required prior authorization metrics. The Index tracks those
                differences at the source level.
              </p>
            </div>

            <div>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1a365d",
                  marginBottom: 14,
                }}
              >
                What the Index tracks
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: 12,
                }}
              >
                {[
                  "Prior authorization approval and denial metrics",
                  "Appeal overturn rates and decision timeframes",
                  "CMS transparency publication status",
                  "Machine-readable reporting availability",
                  "Source-level disclosure quality",
                  "Workflow and operational patterns surrounding prior authorization reporting",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "14px 16px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: "#1a365d",
                        marginTop: 9,
                        flexShrink: 0,
                      }}
                    />

                    <div
                      style={{
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "#334155",
                      }}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1a365d",
                  marginBottom: 14,
                }}
              >
                How the data is used
              </h2>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 18,
                }}
              >
                Prior authorization reporting is most useful when source
                context, reporting format, plan type, metric definitions, and
                publication quality are reviewed together.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 18,
                }}
              >
                The Index organizes public prior authorization transparency data
                into a structured reference point for reviewing payer
                disclosures, reporting gaps, denial and appeal patterns, and
                workflow-related findings across health plans.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 0,
                }}
              >
                The Index is independent and updated as new public reporting
                sources are identified.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #1a365d 0%, #233f68 100%)",
            borderRadius: 14,
            padding: "32px 28px",
            color: "#fff",
          }}
        >
          <div
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1.4,
              fontFamily: "'IBM Plex Mono', monospace",
              opacity: 0.7,
              marginBottom: 12,
            }}
          >
            Follow the Reporting
          </div>

          <h2
            style={{
              fontSize: 28,
              lineHeight: 1.2,
              marginBottom: 14,
              fontWeight: 700,
            }}
          >
            The Prior Auth Report launches in July.
          </h2>

          <p
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              opacity: 0.9,
              marginBottom: 24,
              maxWidth: 620,
            }}
          >
            Ongoing analysis covering payer reporting behavior, prior
            authorization transparency data, denial and appeal patterns,
            workflow burden, and CMS compliance trends.
          </p>

          <Link
            href="/newsletter"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              background: "#fff",
              color: "#1a365d",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Join the Waitlist
          </Link>
        </section>
      </div>
    </main>
  );
}