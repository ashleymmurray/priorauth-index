"use client";

import { useEffect, useState } from "react";

function ComplianceTracker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [mrFilter, setMrFilter] = useState("all");
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetch("https://artificerhealth.com/payer_publication_status.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          color: "#888",
          fontSize: 14,
        }}
      >
        <div
          style={{
            marginBottom: 12,
            fontSize: 17,
            color: "#1a365d",
          }}
        >
          Loading compliance data...
        </div>

        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid #e2e8f0",
            borderTop: "3px solid #1a365d",
            borderRadius: "50%",
            margin: "0 auto",
            animation: "spin 1s linear infinite",
          }}
        />

        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          color: "#888",
          fontSize: 14,
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
        }}
      >
        Unable to load compliance data right now.
      </div>
    );
  }

  const payers = Array.isArray(data)
    ? data
    : data?.payers || data?.data || [];

  const generatedAt =
    data?.generated_at ||
    data?.generatedAt ||
    data?.timestamp ||
    null;

  const totalCount = data?.count || payers.length;

  const isPublished = (p) =>
    p.published === true ||
    p.published === "true" ||
    p.status === "published";

  const isMachineReadable = (p) =>
    p.machine_readable === true ||
    p.machine_readable === "true";

  const getPayerName = (p) =>
    p.name || p.payer || p.organization || "Unknown";

  const getUrl = (p) =>
    p.url || p.source_url || p.link || null;

  const getLastUpdate = (p) =>
    p.last_update || p.last_updated || p.updated_at || null;

  const totalPayers = payers.length;

  const publishedCount = payers.filter((p) =>
    isPublished(p)
  ).length;

  const notPublishedCount =
    totalPayers - publishedCount;

  const machineReadableCount = payers.filter((p) =>
    isMachineReadable(p)
  ).length;

  const filtered = payers.filter((p) => {
    const name = getPayerName(p).toLowerCase();

    if (
      search &&
      !name.includes(search.toLowerCase())
    )
      return false;

    const pub = isPublished(p);

    if (statusFilter === "published" && !pub)
      return false;

    if (statusFilter === "not_published" && pub)
      return false;

    const mr = isMachineReadable(p);

    if (mrFilter === "yes" && !mr)
      return false;

    if (mrFilter === "no" && mr)
      return false;

    return true;
  });

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        let aVal;
        let bVal;

        if (sortKey === "payer") {
          aVal = getPayerName(a).toLowerCase();
          bVal = getPayerName(b).toLowerCase();
        } else if (sortKey === "status") {
          aVal = isPublished(a) ? 1 : 0;
          bVal = isPublished(b) ? 1 : 0;
        } else if (sortKey === "machine_readable") {
          aVal = isMachineReadable(a) ? 1 : 0;
          bVal = isMachineReadable(b) ? 1 : 0;
        } else if (sortKey === "last_updated") {
          const da = getLastUpdate(a);
          const db = getLastUpdate(b);

          aVal = da ? new Date(da).getTime() : 0;
          bVal = db ? new Date(db).getTime() : 0;
        }

        if (aVal < bVal)
          return sortDirection === "asc" ? -1 : 1;

        if (aVal > bVal)
          return sortDirection === "asc" ? 1 : -1;

        return 0;
      })
    : filtered;

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((d) =>
        d === "asc" ? "desc" : "asc"
      );
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const SortIndicator = ({ col }) => {
    if (sortKey !== col) {
      return (
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            marginLeft: 4,
          }}
        >
          ↕
        </span>
      );
    }

    return (
      <span style={{ marginLeft: 4 }}>
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const thStyle = (col) => ({
    padding: "10px 14px",
    textAlign: col === "payer" ? "left" : "center",
    fontWeight: 600,
    fontSize: 12,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  });

  const selectStyle = {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    background: "#fff",
    fontSize: 12,
    color: "#1a365d",
    cursor: "pointer",
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 13,
            color: "#555",
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          CMS rule CMS-0057-F required impacted health
          plans to begin publicly reporting prior
          authorization metrics as of March 31, 2026.
          This tracker monitors publication status,
          machine-readable availability, source URLs,
          and remaining publication gaps.
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: "#888",
              fontFamily: "'IBM Plex Mono', monospace",
              marginBottom: 12,
            }}
          >
            Compliance Snapshot
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(110px, 1fr))",
              gap: 12,
            }}
          >
            {[
              {
                label: "Total Payers",
                value: totalPayers.toLocaleString(),
              },
              {
                label: "Published",
                value: publishedCount.toLocaleString(),
              },
              {
                label: "Not Published",
                value: notPublishedCount.toLocaleString(),
              },
              {
                label: "Machine-Readable",
                value: machineReadableCount.toLocaleString(),
              },
              ...(generatedAt
                ? [
                    {
                      label: "Dataset Refreshed",
                      value: new Date(
                        generatedAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }),
                    },
                  ]
                : []),
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 12px",
                  background: "#f8fafc",
                  borderRadius: 6,
                  border: "1px solid #eef0f4",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "#888",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    marginBottom: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {item.label}
                </div>

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1a365d",
                    fontFamily:
                      "'IBM Plex Mono', monospace",
                    lineHeight: 1.2,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #cbd5e1",
            borderRadius: 8,
            padding: 14,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: "#64748b",
              fontFamily: "'IBM Plex Mono', monospace",
              marginBottom: 6,
            }}
          >
            Data Refresh Status
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#334155",
              lineHeight: 1.6,
              marginBottom: 8,
            }}
          >
            The compliance tracker is refreshed from
            the latest available source file.
            Publication status may change as payer
            pages are identified, updated, or
            corrected.
          </div>

          <div
            style={{
              fontSize: 11,
              color: "#64748b",
              lineHeight: 1.6,
            }}
          >
            Compliance data powered by{" "}
            <a
              href="https://artificerhealth.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#1a365d",
                textDecoration: "underline",
              }}
            >
              Artificer Health
            </a>
            .
          </div>
        </div>

        <div
          style={{
            padding: 14,
            background: "#f0f4f8",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            marginBottom: 16,
            fontSize: 12,
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          <strong>Regularly updated.</strong>

          {generatedAt && (
            <span>
              {" "}
              Last dataset refresh:{" "}
              {new Date(generatedAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
              .
            </span>
          )}

          <span>
            {" "}
            Tracking {totalCount.toLocaleString()}{" "}
            payers.
          </span>
        </div>

        <input
          type="text"
          placeholder="Search payers..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            background: "#fff",
            fontSize: 13,
            color: "#1a365d",
            marginBottom: 12,
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            style={selectStyle}
          >
            <option value="all">
              All statuses
            </option>

            <option value="published">
              Published
            </option>

            <option value="not_published">
              Not Published
            </option>
          </select>

          <select
            value={mrFilter}
            onChange={(e) =>
              setMrFilter(e.target.value)
            }
            style={selectStyle}
          >
            <option value="all">
              All formats
            </option>

            <option value="yes">
              Machine-readable
            </option>

            <option value="no">
              Not machine-readable
            </option>
          </select>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 12,
              color: "#888",
              fontFamily:
                "'IBM Plex Mono', monospace",
              marginLeft: "auto",
            }}
          >
            {sorted.length.toLocaleString()} of{" "}
            {totalCount.toLocaleString()} payers
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceTracker;
