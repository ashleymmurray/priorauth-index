"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function PayersPage() {
  const searchParams =
    useSearchParams();

  const initialSearch =
    searchParams.get("search") || "";

  const [search, setSearch] =
    useState(initialSearch);

  const [payers, setPayers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(
          "/api/compliance-data"
        );

        const data =
          await res.json();

        setPayers(data.payers || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredPayers =
    useMemo(() => {
      return payers.filter((payer) =>
        payer.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }, [payers, search]);

  return (
    <div
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "48px 24px 72px",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: 34,
        }}
      >
        <div
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "#7b8798",
            fontWeight: 700,
            fontFamily:
              "'IBM Plex Mono', monospace",
            marginBottom: 10,
          }}
        >
          Payer reporting directory
        </div>

        <h1
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: "#1a365d",
            margin: 0,
            marginBottom: 14,
            letterSpacing: "-2px",
            lineHeight: 1.02,
          }}
        >
          Explore tracked payer
          reporting profiles
        </h1>

        <div
          style={{
            fontSize: 16,
            color: "#4b5563",
            lineHeight: 1.8,
            maxWidth: 760,
            marginBottom: 28,
          }}
        >
          Search tracked payer and
          plan reporting profiles,
          publication status,
          machine-readable disclosure
          availability, and source
          reporting infrastructure
          across monitored plans.
        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search payer or plan..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "16px 18px",
            border:
              "1px solid #d8e2ee",
            borderRadius: 10,
            fontSize: 15,
            outline: "none",
            fontFamily:
              "'IBM Plex Sans', sans-serif",
            color: "#1a365d",
            background: "#fff",
            marginBottom: 18,
          }}
        />

        <div
          style={{
            fontSize: 13,
            color: "#607086",
            fontWeight: 500,
          }}
        >
          {loading
            ? "Loading payer directory..."
            : search
            ? `${filteredPayers.length.toLocaleString()} matching plans`
            : `${filteredPayers.length.toLocaleString()} tracked plans`}
        </div>
      </div>

      {/* RESULTS */}

      {loading ? (
        <div
          style={{
            color: "#607086",
            fontSize: 15,
          }}
        >
          Loading payer directory...
        </div>
      ) : filteredPayers.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e7edf4",
            borderRadius: 12,
            padding: 28,
            color: "#607086",
            fontSize: 14,
            lineHeight: 1.8,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#1a365d",
              marginBottom: 8,
            }}
          >
            No matching payer found.
          </div>

          <div style={{ marginBottom: 14 }}>
            Try searching by parent company, plan name, state, or contract ID.
            Payer names may appear under related subsidiaries, plan entities, or
            reporting groups.
          </div>

          <a
            href={`mailto:ashley@bridgechart.com?subject=Prior Auth Index payer search question&body=Search term: ${encodeURIComponent(
              search
            )}`}
            style={{
              color: "#1a365d",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Send a payer lookup question
          </a>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 18,
          }}
        >
          {filteredPayers.map(
            (payer, index) => (
              <Link
                key={index}
                href={`/payers/${slugify(
                  payer.name
                )}`}
                style={{
                  background: "#fff",
                  border:
                    "1px solid #e7edf4",
                  borderRadius: 12,
                  padding: 22,
                  textDecoration:
                    "none",
                  boxShadow:
                    "0 2px 10px rgba(26,54,93,0.04)",
                  transition:
                    "all 0.15s ease",
                }}
              >
                {/* NAME */}

                <div
                  style={{
                    fontSize: 21,
                    fontWeight: 750,
                    color: "#1a365d",
                    marginBottom: 16,
                    lineHeight: 1.3,
                  }}
                >
                  {payer.name}
                </div>

                {/* STATUS ROW */}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      padding:
                        "6px 10px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontFamily:
                        "'IBM Plex Mono', monospace",
                      border:
                        payer.published
                          ? "1px solid rgba(0,140,69,0.18)"
                          : "1px solid rgba(180,40,40,0.16)",
                      background:
                        payer.published
                          ? "rgba(0,140,69,0.08)"
                          : "rgba(180,40,40,0.06)",
                      color:
                        payer.published
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
                      padding:
                        "6px 10px",
                      border:
                        "1px solid #d8e2ee",
                      borderRadius: 999,
                      background:
                        "#f8fafc",
                      fontSize: 10,
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

                {/* META */}

                <div
                  style={{
                    fontSize: 13,
                    color: "#607086",
                    lineHeight: 1.7,
                  }}
                >
                  {payer.last_update ? (
                    <>
                      Last checked:{" "}
                      {
                        payer.last_update
                      }
                    </>
                  ) : (
                    <>
                      Monitoring active
                    </>
                  )}
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}