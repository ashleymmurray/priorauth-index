import Link from "next/link";

export const metadata = {
  title: "Contact | The Prior Auth Index",
  description:
    "Contact The Prior Auth Index regarding prior authorization transparency data, payer reporting, source corrections, research inquiries, or media requests.",
};

export default function ContactPage() {
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
            Contact
          </div>

          <h1
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              lineHeight: 1.05,
              fontWeight: 800,
              color: "#1a365d",
              marginBottom: 18,
              letterSpacing: "-0.04em",
            }}
          >
            Get in touch
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "#4a5568",
              margin: 0,
              maxWidth: 720,
            }}
          >
            The Prior Auth Index tracks prior authorization transparency data,
            payer reporting behavior, publication status, source-level
            disclosures, and workflow-related findings across U.S. health plans.
          </p>
        </section>

        {/* CONTACT CARD */}
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
              gap: 30,
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
                Contact topics
              </h2>

              <div
                style={{
                  display: "grid",
                  gap: 12,
                }}
              >
                {[
                  "Prior authorization transparency data",
                  "Health plan reporting and publication status",
                  "Source corrections or missing disclosures",
                  "CMS compliance and reporting observations",
                  "Denial, appeal, and workflow-related analysis",
                  "Press and media inquiries",
                  "Research or industry conversations",
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
                Contact information
              </h2>

              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "22px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 1.4,
                    color: "#64748b",
                    fontFamily: "'IBM Plex Mono', monospace",
                    marginBottom: 10,
                  }}
                >
                  Email
                </div>

                <a
                  href="mailto:ashley@bridgechart.com"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1a365d",
                    textDecoration: "none",
                    wordBreak: "break-word",
                  }}
                >
                  ashley@bridgechart.com
                </a>

                <p
                  style={{
                    marginTop: 16,
                    marginBottom: 0,
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: "#64748b",
                  }}
                >
                  For source corrections, reporting questions, media inquiries,
                  research conversations, or context related to prior
                  authorization transparency data.
                </p>
              </div>
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
            Newsletter
          </div>

          <h2
            style={{
              fontSize: 26,
              lineHeight: 1.2,
              marginBottom: 14,
              fontWeight: 700,
            }}
          >
            Follow the reporting as public data evolves.
          </h2>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              opacity: 0.9,
              marginBottom: 24,
              maxWidth: 620,
            }}
          >
            The Prior Auth Report launches in late July with ongoing analysis of
            payer reporting behavior, prior authorization transparency data,
            denial and appeal patterns, workflow burden, and CMS compliance
            trends.
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