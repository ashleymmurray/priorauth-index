import Link from "next/link";

export const metadata = {
  title: "Methodology | The Prior Auth Index",
  description:
    "Methodology for The Prior Auth Index, including how prior authorization transparency data, publication status, source availability, and reporting usability are reviewed.",
};

export default function MethodologyPage() {
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
          maxWidth: 820,
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
            Methodology
          </div>

          <h1
            style={{
              fontSize: "clamp(1.8rem, 3.8vw, 2.75rem)",
              lineHeight: 1.05,
              fontWeight: 800,
              color: "#1a365d",
              marginBottom: 18,
              letterSpacing: "-0.04em",
            }}
          >
            How the Index reviews prior authorization reporting
          </h1>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: "#4a5568",
              margin: 0,
              maxWidth: 760,
            }}
          >
            The Prior Auth Index tracks public prior authorization transparency
            reporting across U.S. health plans, including publication status,
            source availability, machine-readable access, and reporting
            usability.
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
              gap: 34,
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
                What the Index tracks
              </h2>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 18,
                }}
              >
                The Index reviews publicly available prior authorization
                reporting sources associated with impacted health plans and
                payer entities. The review focuses on whether required reporting
                appears to be publicly available, whether a source URL is
                accessible, whether the reporting is machine-readable, and
                whether the published information is usable for comparison or
                analysis.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 0,
                }}
              >
                The Index is designed as a source-level reporting reference. It
                does not determine individual coverage, medical necessity,
                claim outcomes, or whether a specific authorization request
                should be approved or denied.
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
                Publication status
              </h2>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 18,
                }}
              >
                A plan or payer is treated as published when a public source
                appears to provide prior authorization transparency reporting
                associated with that entity or reporting group. Publication
                status reflects source availability at the time of review.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 0,
                }}
              >
                A plan or payer may be marked not published when no public
                source is identified, when a listed source is unavailable, or
                when the available page does not appear to contain the relevant
                prior authorization transparency reporting.
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
                Machine-readable availability
              </h2>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 18,
                }}
              >
                Machine-readable availability refers to whether the reporting is
                provided in a format that can reasonably be parsed, extracted, or
                analyzed without manual reconstruction. Structured files,
                accessible tables, and clearly formatted datasets are generally
                more usable than scanned PDFs, image-based documents, broken
                files, or pages that require extensive manual interpretation.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 0,
                }}
              >
                Machine-readable status is separate from publication status. A
                payer can publish prior authorization reporting while still
                providing the information in a format that is difficult to
                compare, extract, or reuse.
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
                Source review
              </h2>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 18,
                }}
              >
                Source URLs are reviewed for public accessibility, relevance to
                prior authorization transparency reporting, and connection to
                the payer or plan being tracked. Some sources may cover multiple
                related plans, contracts, subsidiaries, or reporting entities.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 0,
                }}
              >
                When multiple plans reference the same underlying disclosure,
                the Index may preserve plan-level entries while also noting that
                a single source can represent more than one reporting entity.
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
                Reporting usability
              </h2>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 18,
                }}
              >
                Publication alone does not establish usability. The Index
                distinguishes between whether reporting exists and whether it is
                complete, accessible, source-linked, machine-readable, and
                meaningful for comparison across plans.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 0,
                }}
              >
                Usability issues may include missing metrics, inconsistent
                definitions, inaccessible files, nonstandard formats, duplicate
                reporting structures, or disclosures that are difficult to
                compare across payer entities.
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
                Limitations
              </h2>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 18,
                }}
              >
                The Index is based on publicly available reporting sources and
                may not reflect internal payer data, unpublished reporting,
                corrected disclosures not yet identified, or changes made after
                the most recent review.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 0,
                }}
              >
                The Index should be used as a public reporting reference, not as
                a legal, regulatory, medical, or coverage determination.
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
                Updates and corrections
              </h2>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 18,
                }}
              >
                The Index is updated as new public reporting sources are
                identified, reviewed, or corrected. Publication status,
                machine-readable status, and source URLs may change as payer
                reporting pages are updated.
              </p>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#4a5568",
                  marginBottom: 0,
                }}
              >
                Source corrections, missing disclosures, and reporting updates
                can be sent through the contact page.
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
            Source updates
          </div>

          <h2
            style={{
              fontSize: 26,
              lineHeight: 1.2,
              marginBottom: 14,
              fontWeight: 700,
            }}
          >
            Found a missing source or reporting update?
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
            Send source corrections, missing disclosures, or public reporting
            updates for review.
          </p>

          <Link
            href="/contact"
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
            Contact the Index
          </Link>
        </section>
      </div>
    </main>
  );
}