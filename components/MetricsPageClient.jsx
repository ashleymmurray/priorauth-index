"use client";

import { useState } from "react";

import Bar from "@/components/Bar";
import GreenBar from "@/components/GreenBar";
import CompareSection from "@/components/CompareSection";
import DataStatusPill from "@/components/DataStatusPill";

import {
  MA_2024,
  ACA_2024,
  CY2025_DATA,
} from "@/data/metrics";

function MetricsPageClient() {
  const [activeTab, setActiveTab] =
    useState("denials");

  const tabs = [
    {
      id: "denials",
      label: "Denial Rates",
    },
    {
      id: "appeals",
      label: "Appeal Success",
    },
    {
      id: "compare",
      label: "Compare Plans",
    },
    {
      id: "cy2025",
      label: "2025 Data (New)",
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1a365d",
            marginBottom: 6,
          }}
        >
          Prior Authorization Metrics
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          Published prior authorization metrics
          across major U.S. health plans,
          sourced from CMS data, KFF analysis,
          and individual plan reporting.
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          padding: 18,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#1a365d",
            marginBottom: 12,
          }}
        >
          At a glance: Medicare Advantage,
          calendar year 2024
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          {[
            {
              value: "52.8M",
              label:
                "Total prior authorization decisions made",
            },
            {
              value: "4.1M",
              label:
                "Requests denied fully or partially (7.7% of all requests)",
            },
            {
              value: "80.7%",
              label:
                "Of appealed denials were overturned, meaning the initial denial did not hold up",
            },
            {
              value: "11.5%",
              label:
                "Of denied requests were ever actually appealed by patients or providers",
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                background: "#f7f8fa",
                borderRadius: 6,
                border: "1px solid #eef0f4",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#1a365d",
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                }}
              >
                {stat.value}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#666",
                  lineHeight: 1.5,
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 20,
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid #d1d5db",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            style={{
              flex: 1,
              minWidth: 100,
              padding: "12px 8px",
              border: "none",
              borderRight:
                i < tabs.length - 1
                  ? "1px solid #d1d5db"
                  : "none",
              background:
                activeTab === tab.id
                  ? "#1a365d"
                  : "#fff",
              color:
                activeTab === tab.id
                  ? "#fff"
                  : "#555",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "compare" && (
        <div>
          <div
            style={{
              fontSize: 13,
              color: "#555",
              lineHeight: 1.6,
              marginBottom: 8,
            }}
          >
            Select two health plans to compare
            available metrics.
          </div>

          <CompareSection />
        </div>
      )}

      {activeTab === "denials" && (
        <div>
          <div
            style={{
              background: "#1a365d",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "8px 8px 0 0",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Medicare Advantage Plans
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              marginBottom: 28,
            }}
          >
            {[...MA_2024]
              .sort(
                (a, b) =>
                  b.denialRate -
                  a.denialRate
              )
              .map((plan, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border:
                      "1px solid #e2e8f0",
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#1a365d",
                      marginBottom: 8,
                    }}
                  >
                    {plan.insurer}
                  </div>

                  <Bar
                    rate={plan.denialRate}
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === "appeals" && (
        <div>
          {[...MA_2024]
            .sort(
              (a, b) =>
                b.appealOverturnRate -
                a.appealOverturnRate
            )
            .map((plan, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border:
                    "1px solid #e2e8f0",
                  padding: "14px 16px",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#1a365d",
                    marginBottom: 8,
                  }}
                >
                  {plan.insurer}
                </div>

                <GreenBar
                  rate={
                    plan.appealOverturnRate
                  }
                />
              </div>
            ))}
        </div>
      )}

      {activeTab === "cy2025" && (
        <div>
          {[...CY2025_DATA]
            .sort((a, b) =>
              a.insurer.localeCompare(
                b.insurer
              )
            )
            .map((plan, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius: 8,
                  padding: 18,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "flex-start",
                    gap: 10,
                    flexWrap: "wrap",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#1a365d",
                    }}
                  >
                    {plan.insurer}
                  </div>

                  <DataStatusPill
                    status={
                      plan.dataStatus
                    }
                  />
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#555",
                    lineHeight: 1.6,
                    marginBottom: 6,
                  }}
                >
                  {plan.note}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default MetricsPageClient;
