"use client";

import Link from "next/link";
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
      <div style={{ padding: 40, textAlign: "center", color: "#64748b", fontSize: 14 }}>
        Loading compliance data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#64748b", fontSize: 14 }}>
        Unable to load compliance data right now.
      </div>
    );
  }

  const payers = Array.isArray(data)
    ? data
    : data?.payers || data?.data || [];

  const generatedAt =
    data?.generated_at || data?.generatedAt || data?.timestamp || null;

  const totalCount = data?.count || payers.length;

  const isPublished = (p) =>
    p.published === true || p.published === "true" || p.status === "published";

  const isMachineReadable = (p) =>
    p.machine_readable === true || p.machine_readable === "true";

  const getPayerName = (p) =>
    p.name || p.payer || p.organization || "Unknown";

  const getUrl = (p) =>
    p.url || p.source_url || p.link || null;

  const getLastUpdate = (p) =>
    p.last_update || p.last_updated || p.updated_at || null;

  // Summary stats — always from full payers array, never filtered
  const totalPayers = payers.length;
  const publishedCount = payers.filter((p) => isPublished(p)).length;
  const notPublishedCount = totalPayers - publishedCount;
  const machineReadableCount = payers.filter((p) => isMachineReadable(p)).length;

  const statCards = [
    { label: "Total Payers Tracked", value: totalPayers.toLocaleString() },
    { label: "Published", value: publishedCount.toLocaleString() },
    { label: "Not Published", value: notPublishedCount.toLocaleString() },
    { label: "Machine-Readable", value: machineReadableCount.toLocaleString() },
  ];

  const filtered = payers.filter((p) => {
    const name = getPayerName(p).toLowerCase();
    if (search && !name.includes(search.toLowerCase())) return false;
    const pub = isPublished(p);
    if (statusFilter === "published" && !pub) return false;
    if (statusFilter === "not_published" && pub) return false;
    const mr = isMachineReadable(p);
    if (mrFilter === "yes" && !mr) return false;
    if (mrFilter === "no" && mr) return false;
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
        } else {
          aVal = 0;
          bVal = 0;
        }
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
    : filtered;

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const SortIndicator = ({ col }) => {
    if (sortKey !== col) {
      return <span style={{ color: "rgba(255,255,255,0.35)", marginLeft: 4 }}>↕</span>;
    }
    return (
      <span style={{ marginLeft: 4 }}>
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cfd8e3",
    background: "#fff",
    fontSize: 13,
    color: "#17314f",
    outline: "none",
    boxSizing: "border-box",
  };

  const selectStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cfd8e3",
    background: "#fff",
    fontSize: 13,
    color: "#17314f",
    outline: "none",
    cursor: "pointer",
  };

  const labelStyle = {
    display: "block",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    color: "#64748b",
    fontWeight: 700,
    marginBottom: 6,
    fontFamily: "'IBM Plex Mono', monospace",
  };

  return (
    <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", boxSizing: "border-box" }}>

      {/* Hero */}
      <div
        style={{
          marginBottom: 26,
          borderTop: "4px solid #17314f",
          borderBottom: "1px solid #cfd8e3",
          padding: "26px 0 24px",
        }}
      >
        <div
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: 1.4,
            color: "#64748b",
            marginBottom: 10,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          CMS-0057-F Reporting Compliance
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: 700,
            color: "#17314f",
            lineHeight: 1.15,
            marginBottom: 14,
          }}
        >
          CMS Prior Authorization Compliance Tracker
        </h1>
        <div
          style={{
            fontSize: 14,
            lineHeight: 1.75,
            color: "#475569",
            maxWidth: 760,
          }}
        >
          Track whether impacted health plans have published prior authorization
          reporting under CMS-0057-F. Publication status reflects whether a
          public source URL has been identified for each payer.
        </div>
        {generatedAt && (
          <div
            style={{
              marginTop: 12,
              fontSize: 11,
              color: "#64748b",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            Dataset last refreshed:{" "}
            {new Date(generatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" "}· Data provided by{" "}
            <a
              href="https://artificerhealth.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#17314f" }}
            >
              Artificer Health
            </a>
          </div>
        )}

        <div
          style={{
            marginTop: 16,
            padding: "12px 14px",
            background: "#f8fafc",
            border: "1px solid #dbe3ec",
            fontSize: 13,
            lineHeight: 1.65,
            color: "#475569",
            maxWidth: 820,
          }}
        >
          Publication and machine-readable status reflect source availability
          at the time of review.{" "}
          <Link
            href="/methodology"
            style={{
              color: "#17314f",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Read the Index methodology
          </Link>
          .{" "}
          <a
            href="mailto:ashley@bridgechart.com?subject=Prior Auth Index source correction"
            style={{
              color: "#17314f",
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

      {/* Summary stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {statCards.map((card, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #dbe3ec",
              background: "#f8fafc",
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: 1.1,
                color: "#64748b",
                marginBottom: 8,
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#17314f",
                lineHeight: 1,
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          border: "1px solid #cfd8e3",
          background: "#fff",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            background: "#f7f9fb",
            borderBottom: "1px solid #cfd8e3",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            alignItems: "end",
          }}
        >
          <div>
            <label style={labelStyle}>Search payers</label>
            <input
              type="text"
              placeholder="Search by payer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Publication status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={selectStyle}
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="not_published">Not Published</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Format</label>
            <select
              value={mrFilter}
              onChange={(e) => setMrFilter(e.target.value)}
              style={selectStyle}
            >
              <option value="all">All formats</option>
              <option value="yes">Machine-readable</option>
              <option value="no">Not machine-readable</option>
            </select>
          </div>
        </div>

        {/* Showing count */}
        <div
          style={{
            padding: "9px 16px",
            fontSize: 10,
            color: "#64748b",
            fontFamily: "'IBM Plex Mono', monospace",
            textTransform: "uppercase",
            letterSpacing: 0.8,
          }}
        >
          Showing {sorted.length.toLocaleString()} of {totalCount.toLocaleString()} payers
        </div>
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div
          style={{
            padding: 28,
            background: "#f8fafc",
            border: "1px solid #dbe3ec",
            textAlign: "center",
            color: "#64748b",
            fontSize: 13,
          }}
        >
          No payers match your current search or filters.
        </div>
      ) : (
        <div style={{ overflowX: "auto", border: "1px solid #cfd8e3" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 600,
              fontSize: 13,
            }}
          >
            <thead>
              <tr style={{ background: "#17314f", color: "#fff" }}>
                <th
                  onClick={() => handleSort("payer")}
                  style={{
                    padding: "10px 14px",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: 11,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                    userSelect: "none",
                  }}
                >
                  Payer <SortIndicator col="payer" />
                </th>
                <th
                  onClick={() => handleSort("status")}
                  style={{
                    padding: "10px 14px",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: 11,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                    userSelect: "none",
                  }}
                >
                  Status <SortIndicator col="status" />
                </th>
                <th
                  onClick={() => handleSort("machine_readable")}
                  style={{
                    padding: "10px 14px",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: 11,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                    userSelect: "none",
                  }}
                >
                  Machine-Readable <SortIndicator col="machine_readable" />
                </th>
                <th
                  style={{
                    padding: "10px 14px",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: 11,
                    whiteSpace: "nowrap",
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                  }}
                >
                  Source
                </th>
                <th
                  style={{
                    padding: "10px 14px",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: 11,
                    whiteSpace: "nowrap",
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: 0.6,
                    textTransform: "uppercase",
                  }}
                >
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => {
                const pub = isPublished(p);
                const mr = isMachineReadable(p);
                const url = getUrl(p);
                const lastUp = getLastUpdate(p);
                const name = getPayerName(p);
                const searchHref = `/payers?search=${encodeURIComponent(name)}`;

                return (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 0 ? "#fff" : "#fafbfc",
                      borderBottom: "1px solid #edf1f5",
                    }}
                  >
                    <td style={{ padding: "10px 14px", fontWeight: 600, color: "#17314f" }}>
                      <Link
                        href={searchHref}
                        style={{
                          color: "#17314f",
                          textDecoration: "underline",
                          textUnderlineOffset: 3,
                          fontWeight: 600,
                        }}
                      >
                        {name}
                      </Link>
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          fontSize: 11,
                          fontWeight: 600,
                          fontFamily: "'IBM Plex Mono', monospace",
                          background: pub ? "#dcfce7" : "#fee2e2",
                          color: pub ? "#166534" : "#991b1b",
                        }}
                      >
                        {pub ? "Published" : "Not Published"}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 12,
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 600,
                        color: mr ? "#166534" : "#991b1b",
                      }}
                    >
                      {mr ? "Yes" : "No"}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                         {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#17314f",
                            textDecoration: "underline",
                            fontSize: 12,
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          View source
                        </a>
                      ) : (
                        <span style={{ color: "#cbd5e1" }}>—</span>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 12,
                        color: "#64748b",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      {lastUp
                        ? new Date(lastUp).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : <span style={{ color: "#cbd5e1" }}>—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Methodology note */}
      <div
        style={{
          marginTop: 24,
          borderLeft: "3px solid #17314f",
          padding: "4px 0 4px 16px",
        }}
      >
        <div
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: 1.1,
            color: "#17314f",
            fontWeight: 700,
            marginBottom: 8,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          Methodology Note
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.75, color: "#475569", maxWidth: 900 }}>
          Publication status reflects whether a public source URL was identified
          for prior authorization reporting required under CMS-0057-F.
          Machine-readable status indicates whether the available reporting
          appears structured for extraction and comparison. Compliance data is
          sourced from{" "}
          <a
            href="https://artificerhealth.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#17314f" }}
          >
            Artificer Health
          </a>
          .{" "}
          <Link
            href="/methodology"
            style={{
              color: "#17314f",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Read the Index methodology
          </Link>
          .
        </div>
      </div>

    </div>
  );
}

export default ComplianceTracker;