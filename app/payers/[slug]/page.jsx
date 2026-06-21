import Link from "next/link";

async function getPayer(slug) {
  const res = await fetch(
    "http://localhost:3000/api/compliance-data",
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.payers.find((payer) => {
    const payerSlug = (
      payer.name ||
      payer.insurer ||
      ""
    )
      .toLowerCase()
      .replace(/\(.*?\)/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    return payerSlug === slug;
  });
}

export default async function PayerPage({
  params,
}) {
  const payer = await getPayer(
    params.slug
  );

  if (!payer) {
    return (
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "64px 24px",
        }}
      >
        <div
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "#7b8798",
            fontWeight: 700,
            fontFamily: "'IBM Plex Mono', monospace",
            marginBottom: 12,
          }}
        >
          Payer profile
        </div>

        <h1
          style={{
            fontSize: 42,
            lineHeight: 1.05,
            fontWeight: 800,
            color: "#1a365d",
            margin: "0 0 16px",
            letterSpacing: "-1.5px",
          }}
        >
          Payer not found
        </h1>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: "#4b5563",
            maxWidth: 640,
            margin: "0 0 22px",
          }}
        >
          This payer profile may appear under a related plan name, parent
          company, contract name, or reporting entity.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <Link
            href="/payers"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              background: "#1a365d",
              color: "#fff",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Search payer directory
          </Link>

          <a
            href="mailto:ashley@bridgechart.com?subject=Prior Auth Index payer lookup question"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              background: "#fff",
              color: "#1a365d",
              border: "1px solid #d8e2ee",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Send lookup question
          </a>
        </div>
      </div>
    );
  }

  const payerName =
    payer.name ||
    payer.insurer ||
    "Unknown Payer";

  const sourceUrl =
    payer.source_url ||
    payer.source ||
    payer.url ||
    payer.link ||
    null;

  const lastUpdated =
    payer.last_update ||
    payer.updated_at ||
    payer.last_checked ||
    payer.updated ||
    null;

  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "48px 24px 72px",
      }}
    >
      {/* LABEL */}

      <div
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 2,
          color: "#7b8798",
          fontWeight: 700,
          fontFamily:
            "'IBM Plex Mono', monospace",
          marginBottom: 12,
        }}
      >
        Payer reporting profile
      </div>

      {/* NAME */}

      <h1
        style={{
          fontSize: 52,
          lineHeight: 1,
          fontWeight: 800,
          color: "#1a365d",
          margin: 0,
          marginBottom: 22,
          letterSpacing: "-2px",
        }}
      >
        {payerName}
      </h1>

      {/* STATUS ROW */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            padding: "7px 12px",
            borderRadius: 999,
            fontSize: 11,
            fontFamily:
              "'IBM Plex Mono', monospace",
            border: payer.published
              ? "1px solid rgba(0,140,69,0.18)"
              : "1px solid rgba(180,40,40,0.16)",
            background:
              payer.published
                ? "rgba(0,140,69,0.08)"
                : "rgba(180,40,40,0.06)",
            color: payer.published
              ? "#007a43"
              : "#a12d2d",
          }}
        >
          {payer.published
            ? "Published"
            : "Not Published"}
        </div>

        <div
          style={{
            padding: "7px 12px",
            border:
              "1px solid #d8e2ee",
            borderRadius: 999,
            background: "#f8fafc",
            fontSize: 11,
            color: "#1a365d",
            fontFamily:
              "'IBM Plex Mono', monospace",
          }}
        >
          {payer.machine_readable
            ? "Machine Readable"
            : "Non Machine Readable"}
        </div>
      </div>

      {/* SOURCE CARD */}

      <div
        style={{
          background: "#fff",
          border:
            "1px solid #e7edf4",
          borderRadius: 14,
          padding: 28,
          marginBottom: 24,
          boxShadow:
            "0 2px 10px rgba(26,54,93,0.04)",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "#607086",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Source URL
        </div>

        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1a365d",
              fontSize: 15,
              lineHeight: 1.7,
              wordBreak:
                "break-word",
            }}
          >
            {sourceUrl}
          </a>
        ) : (
          <div
            style={{
              fontSize: 14,
              color: "#607086",
            }}
          >
            No source URL
            available
          </div>
        )}

        <div
          style={{
            marginTop: 28,
            fontSize: 13,
            color: "#607086",
          }}
        >
          Last update:{" "}
          {lastUpdated ||
            "Unavailable"}
        </div>

        <div
          style={{
            marginTop: 22,
            paddingTop: 18,
            borderTop: "1px solid #e7edf4",
            fontSize: 13,
            lineHeight: 1.75,
            color: "#607086",
          }}
        >
          Reporting status reflects source availability at the time of review.{" "}
          <Link
            href="/methodology"
            style={{
              color: "#1a365d",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Read the Index methodology
          </Link>
          .{" "}
          <a
            href={`mailto:ashley@bridgechart.com?subject=Prior Auth Index source correction: ${encodeURIComponent(
              payerName
            )}`}
            style={{
              color: "#1a365d",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Send a source correction
          </a>
          .
        </div>
      </div>
    </div>
  );
}