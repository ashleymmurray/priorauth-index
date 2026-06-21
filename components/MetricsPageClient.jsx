"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import CompareSection from "@/components/CompareSection";
import DataStatusPill from "@/components/DataStatusPill";
import Collapsible from "@/components/Collapsible";

import {
  MA_2024,
  ACA_2024,
  CY2025_DATA,
} from "@/data/metrics";

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
const payerSlugMap = {
  "UnitedHealthcare": "unitedhealthcare",

  "Centene": "ambetter-qhp",

  "Aetna (CVS Health)": "aetna-cvs-health-qhp",

  "CVS Health (all contracts)": "aetna-cvs-health-qhp",

  "Kaiser Permanente": "kaiser-permanente-qhp",

  "Humana": "humana",

  "Oscar Health": "oscar-health-qhp",

  "Molina Healthcare": "molina-healthcare-qhp",

  "BCBS (National Avg)": "blue-cross-blue-shield-qhp",

  "Cigna (Standard Requests)": "cigna-qhp",

  "Cigna (Expedited Requests)": "cigna-qhp",

  "Oscar Health (All Markets - Standard Requests)":
    "oscar-health-qhp",

  "Oscar Health (All Markets - Expedited Requests)":
    "oscar-health-qhp",

  "Braven Health (Medicare Advantage - Standard Requests)":
    "braven-health",

  "Braven Health (Medicare Advantage - Expedited Requests)":
    "braven-health",

  "Horizon NJ FamilyCare (Medicaid - Standard Requests)":
    "horizon-blue-cross-blue-shield-of-new-jersey",

  "Horizon NJ FamilyCare (Medicaid - Expedited Requests)":
    "horizon-blue-cross-blue-shield-of-new-jersey",

  "Horizon NJ TotalCare (HMO D-SNP - Standard Requests)":
    "horizon-blue-cross-blue-shield-of-new-jersey",

  "Horizon NJ TotalCare (HMO D-SNP - Expedited Requests)":
    "horizon-blue-cross-blue-shield-of-new-jersey",

  "Sendero Health Plans (TX)":
    "sendero-health-plans-local-nonprofit",
};

function getPayerHref(name) {
  const searchRedirects = {
    "Anthem / Elevance Health":
      "/payers?search=anthem",

    "Alabama Medicaid (Expedited Requests)":
      "/payers?search=alabama",

    "Alabama Medicaid (Standard Requests)":
      "/payers?search=alabama",

    "Security Health Plan (BadgerCare Medicaid - Expedited Requests)":
      "/payers?search=security",

    "Security Health Plan (BadgerCare Medicaid - Standard Requests)":
      "/payers?search=security",

    "Utah Medicaid FFS (Expedited Requests)":
      "/payers?search=utah",

    "Utah Medicaid FFS (Standard Requests)":
      "/payers?search=utah",

    "Wyoming Medicaid CME / Magellan (Standard Requests)":
      "/payers?search=wyoming",

    "Wyoming Medicaid HCBS (Standard Requests)":
      "/payers?search=wyoming",

    "Wyoming Medicaid Utilization Management (Standard Requests)":
      "/payers?search=wyoming",
  };

  if (searchRedirects[name]) {
    return searchRedirects[name];
  }

  return `/payers/${
    payerSlugMap[name] || slugify(name)
  }`;
}

function MetricRule({ rate, max = 30, type = "denial", isMobile = false }) {
  const width = Math.min((rate / max) * 100, 100);

  const color =
    type === "appeal"
      ? "#2f6b4f"
      : rate > 20
      ? "#8f1d1d"
      : rate > 10
      ? "#8a4b16"
      : "#2f6b4f";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 52px" : "1fr 64px",
      gap: isMobile ? 8 : 14,
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          height: 7,
          background:
            "repeating-linear-gradient(to right, #e5eaf0 0, #e5eaf0 1px, #f8fafc 1px, #f8fafc 20%)",
          border: "1px solid #d8e0ea",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: color,
          }}
        />
      </div>

      <div
        style={{
          fontSize: isMobile ? 12 : 15,
          fontWeight: 700,
          color,
          textAlign: "right",
          fontFamily: "'IBM Plex Mono', monospace",
        }}
      >
        {rate}%
      </div>
    </div>
  );
}

function MetricsPageClient() {
  const [activeTab, setActiveTab] = useState("denials");
  const [metricSearch, setMetricSearch] = useState("");
  const [marketFilter, setMarketFilter] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const normalizedSearch = metricSearch.trim().toLowerCase();

  const matchesSearch = (plan) => {
    if (!normalizedSearch) return true;

    return plan.insurer.toLowerCase().includes(normalizedSearch);
  };

  const filteredMA2024 = [...MA_2024]
    .filter(matchesSearch)
    .filter(() => marketFilter === "all" || marketFilter === "ma")
    .sort((a, b) => b.denialRate - a.denialRate);

  const filteredACA2024 = [...ACA_2024]
    .filter(matchesSearch)
    .filter(() => marketFilter === "all" || marketFilter === "aca")
    .sort((a, b) => b.denialRate - a.denialRate);

  const filteredAppeals = [...MA_2024]
    .filter(matchesSearch)
    .filter(() => marketFilter === "all" || marketFilter === "ma")
    .sort((a, b) => b.appealOverturnRate - a.appealOverturnRate);

  const filteredCY2025 = [...CY2025_DATA]
    .filter(matchesSearch)
    .filter(() => marketFilter === "all" || marketFilter === "cy2025")
    .sort((a, b) => a.insurer.localeCompare(b.insurer));

  const filteredResultCount =
    activeTab === "denials"
      ? filteredMA2024.length + filteredACA2024.length
      : activeTab === "appeals"
      ? filteredAppeals.length
      : activeTab === "cy2025"
      ? filteredCY2025.length
      : MA_2024.length + ACA_2024.length + CY2025_DATA.length;

  const highestMADenial = [...MA_2024].sort(
  (a, b) => b.denialRate - a.denialRate
)[0];

const lowestMADenial = [...MA_2024].sort(
  (a, b) => a.denialRate - b.denialRate
)[0];

const highestACADenial = [...ACA_2024].sort(
  (a, b) => b.denialRate - a.denialRate
)[0];

const lowestACADenial = [...ACA_2024].sort(
  (a, b) => a.denialRate - b.denialRate
)[0];

  const tabs = [
    { id: "denials", label: "Denial Rates" },
    { id: "appeals", label: "Appeal Success" },
    { id: "compare", label: "Compare Plans" },
    { id: "cy2025", label: "2025 Reporting" },
  ];

  const statCards = [
    {
      value: "52.8M",
      label: "Prior authorization determinations issued",
    },
    {
      value: "4.1M",
      label: "Requests denied fully or partially",
    },
    {
      value: "80.7%",
      label: "Appealed denials overturned",
    },
    {
      value: "11.5%",
      label: "Denied requests ever appealed",
    },
  ];

  return (
  <div
    style={{
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      padding: isMobile ? "20px 16px 64px" : "0",
      boxSizing: "border-box",
    }}
  >
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
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 260px",
            gap: 28,
            alignItems: "start",
          }}
        >
          <div>
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
              Prior Authorization Reporting Dataset
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 32,
                fontWeight: 700,
                color: "#17314f",
                lineHeight: 1.15,
              }}
            >
              Prior Authorization Metrics
            </h1>

            <div
              style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: "#475569",
                maxWidth: 760,
                marginTop: 14,
              }}
            >
              Published prior authorization denial, approval, and appeal
              reporting across major U.S. health plans, aggregated from CMS,
              KFF analysis, payer transparency disclosures, and linked reporting
              sources.
            </div>
          </div>

          <div
            style={{
              border: "1px solid #cfd8e3",
              background: "#f8fafc",
              padding: 14,
            }}
          >
            {[
              ["Primary year", "CY 2024"],
              ["Sources", "CMS / KFF"],
              ["Rule context", "CMS-0057-F"],
              ["Coverage", "MA / ACA"],
            ].map(([label, value], i) => (
              <div
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 12,
                  padding: "8px 0",
                  borderBottom: i < 3 ? "1px solid #e2e8f0" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    color: "#64748b",
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {label}
                </div>

                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#17314f",
                    textAlign: "right",
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          border: "1px solid #cfd8e3",
          background: "#fff",
          marginBottom: 22,
        }}
      >
        <div
          style={{
            padding: "13px 16px",
            borderBottom: "1px solid #cfd8e3",
            background: "#f7f9fb",
          }}
        >
          <div
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: 1.1,
              color: "#64748b",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            Medicare Advantage Snapshot — Calendar Year 2024
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          }}
        >
          {statCards.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: 16,
                borderRight:
                  i < statCards.length - 1 ? "1px solid #edf1f5" : "none",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#17314f",
                  marginBottom: 8,
                  lineHeight: 1,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                {stat.value}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#475569",
                  lineHeight: 1.55,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "11px 16px",
            borderTop: "1px solid #edf1f5",
            fontSize: 10,
            color: "#64748b",
            background: "#fbfcfd",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          Source:{" "}
          <a
            href="https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#17314f" }}
          >
            KFF analysis of CMS Medicare Advantage data, January 2026
          </a>
        </div>
      </div>

      <div
        style={{
          borderLeft: "3px solid #17314f",
          padding: "4px 0 4px 16px",
          marginBottom: 20,
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
          Data Interpretation
        </div>

        <div
          style={{
            fontSize: 13,
            lineHeight: 1.75,
            color: "#475569",
            maxWidth: 980,
          }}
        >
          Published denial and approval rates are not direct quality rankings.
          Reporting methodologies, contract structures, aggregation standards,
          and partial-denial definitions vary between reporting entities and
          markets. The Index preserves source context while improving
          accessibility and comparability across publicly reported datasets.{" "}
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

      <div
        style={{
          border: "1px solid #dbe3ec",
          background: "#f8fafc",
          padding: "16px 18px",
          marginBottom: 24,
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
          Reporting Coverage Notice
        </div>

        <div
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: "#475569",
            maxWidth: 980,
          }}
        >
          The comparative metrics shown here are limited to publicly available
          structured datasets and payer disclosures that can be reasonably
          normalized for comparison. Many entities tracked in the payer directory
          have not yet published complete or standardized prior authorization
          metrics.
          <br />
          <br />
          Additional payer metrics and comparative reporting will be added as
          more disclosures become publicly available under CMS prior
          authorization transparency requirements.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0,
          borderTop: "1px solid #cfd8e3",
          borderBottom: "1px solid #cfd8e3",
          marginBottom: 18,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              border: "none",
              borderRight: "1px solid #cfd8e3",
              background: activeTab === tab.id ? "#17314f" : "transparent",
              color: activeTab === tab.id ? "#fff" : "#17314f",
              padding: "12px 16px",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.4,
              textTransform: "uppercase",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "denials" && (
        <div
          style={{
            border: "1px solid #cfd8e3",
            background: "#fff",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "minmax(220px, 1fr) 220px auto",
            overflowX: "hidden",
              gap: 12,
              alignItems: "end",
              padding: "14px 16px",
              background: "#f7f9fb",
            }}
          >
            <div>
              <label
                htmlFor="metric-search"
                style={{
                  display: "block",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 1.1,
                  color: "#64748b",
                  fontWeight: 700,
                  marginBottom: 6,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                Search metrics
              </label>

              <input
                id="metric-search"
                type="search"
                value={metricSearch}
                onChange={(e) => setMetricSearch(e.target.value)}
                placeholder="Search insurer or reporting entity..."
                style={{
                  width: "100%",
                  border: "1px solid #cfd8e3",
                  background: "#fff",
                  padding: "10px 11px",
                  fontSize: 13,
                  color: "#17314f",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="market-filter"
                style={{
                  display: "block",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 1.1,
                  color: "#64748b",
                  fontWeight: 700,
                  marginBottom: 6,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                Dataset filter
              </label>

              <select
                id="market-filter"
                value={marketFilter}
                onChange={(e) => setMarketFilter(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid #cfd8e3",
                  background: "#fff",
                  padding: "10px 11px",
                  fontSize: 13,
                  color: "#17314f",
                  outline: "none",
                }}
              >
                <option value="all">All datasets</option>
                <option value="ma">Medicare Advantage</option>
                <option value="aca">ACA Marketplace</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setMetricSearch("");
                setMarketFilter("all");
              }}
              style={{
                border: "1px solid #cfd8e3",
                background: "#fff",
                color: "#17314f",
                padding: "10px 12px",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.4,
                textTransform: "uppercase",
                fontFamily: "'IBM Plex Mono', monospace",
                whiteSpace: "nowrap",
              }}
            >
              Reset
            </button>
          </div>

          <div
            style={{
              borderTop: "1px solid #edf1f5",
              padding: "9px 16px",
              fontSize: 10,
              color: "#64748b",
              background: "#fbfcfd",
              fontFamily: "'IBM Plex Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            Showing {filteredResultCount} matching record
            {filteredResultCount === 1 ? "" : "s"}
          </div>
        </div>
      )}

      {activeTab === "denials" && (
        <div>
          <div
            style={{
              display: normalizedSearch ? "none" : "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginBottom: 24,
            }}
          >
            {[
              [
                "Highest MA Denial Rate",
                highestMADenial.insurer,
                highestMADenial.denialRate != null
  ? `${highestMADenial.denialRate}%`
  : "—",
                "#8f1d1d",
              ],
              [
                "Lowest MA Denial Rate",
                lowestMADenial.insurer,
                lowestMADenial.denialRate != null
  ? `${lowestMADenial.denialRate}%`
  : "—",
                "#2f6b4f",
              ],
              [
                "Highest ACA Denial Rate",
                highestACADenial.insurer,
                highestACADenial.denialRate != null
  ? `${highestACADenial.denialRate}%`
  : "—",
                "#8f1d1d",
              ],
              [
                "Lowest ACA Denial Rate",
                lowestACADenial.insurer,
                lowestACADenial.denialRate != null
  ? `${lowestACADenial.denialRate}%`
  : "—",
                "#2f6b4f",
              ],
            ].map(([label, insurer, value, color]) => (
              <div
                key={label}
                style={{
                  border: "1px solid #dbe3ec",
                  background: "#f8fafc",
                  padding: "14px 15px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color: "#64748b",
                    marginBottom: 10,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {label}
                </div>

                <Link
                  href={getPayerHref(insurer)}
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#17314f",
                    lineHeight: 1.45,
                    marginBottom: 10,
                    display: "block",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  {insurer}
                </Link>

                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color,
                    lineHeight: 1,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 14,
              color: "#475569",
              lineHeight: 1.8,
              marginBottom: 24,
              maxWidth: 900,
            }}
          >
            Published prior authorization denial rates for major Medicare
            Advantage and ACA Marketplace insurers. Plans are displayed from
            highest reported denial rate to lowest.
          </div>

          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "flex-end",
                gap: isMobile ? 6 : 18,
                padding: "16px 18px 14px",
                border: "1px solid #cfd8e3",
                borderBottom: "none",
                background: "#f7f9fb",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    color: "#64748b",
                    marginBottom: 6,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  Market: Medicare Advantage · CY 2024
                </div>

                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#17314f",
                  }}
                >
                  Medicare Advantage Plans
                </div>
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                Source: KFF / CMS
              </div>
            </div>

            <div
              style={{
                border: "1px solid #cfd8e3",
                background: "#fff",
              }}
            >
              {filteredMA2024.length > 0 ? (
                filteredMA2024.map((plan, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "24px 1fr" : "42px minmax(180px, 280px) 1fr",
                      gap: 16,
                      alignItems: "center",
                      padding: isMobile ? "14px 10px" : "15px 18px",
                      borderBottom:
                        i !== filteredMA2024.length - 1
                          ? "1px solid #edf1f5"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#64748b",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <Link
                      href={getPayerHref(plan.insurer)}
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#17314f",
                        lineHeight: 1.35,
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      {plan.insurer}
                    </Link>

                    <div style={{ gridColumn: isMobile ? "2 / 3" : "auto" }}>
                      <MetricRule rate={plan.denialRate} isMobile={isMobile} />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "16px 18px",
                    fontSize: 13,
                    color: "#64748b",
                    lineHeight: 1.7,
                  }}
                >
                  No Medicare Advantage records match the current search or
                  filter.
                </div>
              )}
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "flex-end",
                gap: isMobile ? 6 : 18,
                padding: "16px 18px 14px",
                border: "1px solid #cfd8e3",
                borderBottom: "none",
                background: "#f7f9fb",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    color: "#64748b",
                    marginBottom: 6,
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  Market: ACA Marketplace · Plan Year 2024
                </div>

                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#17314f",
                  }}
                >
                  ACA Marketplace Plans
                </div>
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                Source: CMS TiC
              </div>
            </div>

            <div
              style={{
                border: "1px solid #cfd8e3",
                background: "#fff",
              }}
            >
              {filteredACA2024.length > 0 ? (
                filteredACA2024.map((plan, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "24px 1fr" : "42px minmax(180px, 280px) 1fr",
                      gap: 16,
                      alignItems: "center",
                      padding: isMobile ? "14px 10px" : "15px 18px",
                      borderBottom:
                        i !== filteredACA2024.length - 1
                          ? "1px solid #edf1f5"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#64748b",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <Link
                      href={getPayerHref(plan.insurer)}
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#17314f",
                        lineHeight: 1.35,
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      {plan.insurer}
                    </Link>

                    <div style={{ gridColumn: isMobile ? "2 / 3" : "auto" }}>
                      <MetricRule rate={plan.denialRate} isMobile={isMobile} />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "16px 18px",
                    fontSize: 13,
                    color: "#64748b",
                    lineHeight: 1.7,
                  }}
                >
                  No ACA Marketplace records match the current search or
                  filter.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "appeals" && (
        <div>
          <div
            style={{
              fontSize: 14,
              color: "#475569",
              lineHeight: 1.8,
              marginBottom: 24,
              maxWidth: 920,
            }}
          >
            Medicare Advantage appeal reporting measures how frequently initial
            denials were reversed after formal review.
          </div>

          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #cfd8e3",
              padding: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.9,
                color: "#475569",
              }}
            >
              Across Medicare Advantage plans in 2024,
              <strong> 80.7%</strong> of appealed denials were overturned.
              However, only <strong>11.5%</strong> of denied requests were
              formally appealed.
            </div>
          </div>

          <div
            style={{
              border: "1px solid #cfd8e3",
              background: "#fff",
            }}
          >
            {filteredAppeals.map((plan, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "minmax(180px, 280px) 1fr",
                  gap: isMobile ? 10 : 18,
                  alignItems: "center",
                  padding: "15px 18px",
                  borderBottom:
                    i !== filteredAppeals.length - 1
                      ? "1px solid #edf1f5"
                      : "none",
                }}
              >
                <Link
                  href={getPayerHref(plan.insurer)}
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#17314f",
                    lineHeight: 1.35,
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  {plan.insurer}
                </Link>

                <MetricRule
                  rate={plan.appealOverturnRate}
                  max={100}
                  type="appeal"
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "compare" && (
        <div>
          <div
            style={{
              fontSize: 14,
              color: "#475569",
              lineHeight: 1.8,
              marginBottom: 18,
            }}
          >
            Compare publicly reported metrics between major U.S. health plans
            using available denial and appeal reporting data.
          </div>

          <CompareSection />
        </div>
      )}

      {activeTab === "cy2025" && (
        <div>
          <div
            style={{
              fontSize: 14,
              color: "#475569",
              lineHeight: 1.8,
              marginBottom: 24,
              maxWidth: 950,
            }}
          >
            Public payer reporting under CMS-0057-F began appearing broadly in
            2026. Reporting quality and disclosure consistency still vary
            significantly across payers and reporting entities.
          </div>

          <div
            style={{
              border: "1px solid #cfd8e3",
              background: "#fff",
            }}
          >
            {filteredCY2025.length > 0 ? (
              filteredCY2025.map((plan, i) => (
                <div
                  key={i}
                  style={{
                    padding: "18px 18px 20px",
                    borderBottom:
                      i !== filteredCY2025.length - 1
                        ? "1px solid #edf1f5"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 12,
                      flexWrap: "wrap",
                      marginBottom: 16,
                    }}
                  >
                    <Link
                      href={getPayerHref(plan.insurer)}
                      style={{
                        fontWeight: 700,
                        fontSize: 17,
                        lineHeight: 1.35,
                        color: "#17314f",
                        maxWidth: 700,
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      {plan.insurer}
                    </Link>

                    <DataStatusPill status={plan.dataStatus} />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(170px, 1fr))",
                      border: "1px solid #dbe3ec",
                      marginBottom: 14,
                    }}
                  >
                    {[
                      [
                        "Approval Rate",
                        plan.approvalRate != null
                          ? `${plan.approvalRate}%`
                          : "N/A",
                        "#2f6b4f",
                      ],
                      [
                        "Denial Rate",
                        plan.denialRate != null ? `${plan.denialRate}%` : "N/A",
                        "#8f1d1d",
                      ],
                      ["Avg Decision Time", plan.avgDecisionTime, "#17314f"],
                    ].map(([label, value, color], index) => (
                      <div
                        key={label}
                        style={{
                          background: "#f8fafc",
                          padding: "13px 14px",
                          borderRight:
                            index < 2 ? "1px solid #edf1f5" : "none",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            color: "#64748b",
                            marginBottom: 7,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          {label}
                        </div>

                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 700,
                            color,
                            lineHeight: 1.1,
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      fontSize: 14,
                      color: "#475569",
                      lineHeight: 1.8,
                      marginBottom: 16,
                    }}
                  >
                    {plan.note}
                  </div>

                  <a
                    href={plan.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 11,
                      color: "#17314f",
                      textDecoration: "underline",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    {plan.sourceLabel}
                  </a>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "16px 18px",
                  fontSize: 13,
                  color: "#64748b",
                  lineHeight: 1.7,
                }}
              >
                No 2025 disclosure records match the current search or filter.
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ marginTop: 36 }}>
        <Collapsible title="Methodology & Sources">
          <div style={{ marginBottom: 14, lineHeight: 1.8 }}>
            Medicare Advantage metrics are primarily sourced from KFF analysis
            of CMS Medicare Advantage data.
          </div>

          <div style={{ marginBottom: 14, lineHeight: 1.8 }}>
            ACA Marketplace and 2025 reporting data are sourced from publicly
            available payer disclosures, CMS-0057-F transparency pages, issuer
            reports, and linked source documents.
          </div>

          <div style={{ lineHeight: 1.8 }}>
            The Prior Auth Index aggregates and standardizes publicly reported
            metrics but does not independently audit insurer submissions.
          </div>
        </Collapsible>

        <Collapsible title="Important Disclaimer">
          <div style={{ marginBottom: 14, lineHeight: 1.8 }}>
            Prior authorization reporting standards remain inconsistent across
            plans.
          </div>

          <div style={{ marginBottom: 14, lineHeight: 1.8 }}>
            Some plans include partial denials while others may not. Some plans
            publish aggregate reporting across multiple contracts.
          </div>

          <div style={{ lineHeight: 1.8 }}>
            Published approval and denial rates should not be interpreted as
            direct quality rankings without additional context.
          </div>
        </Collapsible>
      </div>
    </div>
  );
}

export default MetricsPageClient;