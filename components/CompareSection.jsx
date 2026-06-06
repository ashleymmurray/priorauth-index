"use client";

import { useState } from "react";
import { MA_2024, ACA_2024 } from "@/data/metrics";

export default function CompareSection() {
  const allPlans = [
    ...MA_2024.map((d) => ({ ...d, type: "Medicare Advantage (65+)" })),
    ...ACA_2024.map((d) => ({
      ...d,
      type: "ACA Marketplace (under 65)",
      appealOverturnRate: null,
    })),
  ];

  const [planA, setPlanA] = useState("");
  const [planB, setPlanB] = useState("");

  const a = allPlans.find((p) => `${p.insurer}|${p.type}` === planA);
  const b = allPlans.find((p) => `${p.insurer}|${p.type}` === planB);

  return (
    <div>
      <div style={{ padding: 14, background: "#f0f4f8", border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 16, fontSize: 12, color: "#555", lineHeight: 1.6 }}>
        This comparison tool uses <strong>calendar year 2024 data</strong> because it is the most complete dataset currently available, covering all major insurers equally. Once calendar year 2025 data has been reported by enough plans to allow for accurate comparisons, this tool will be updated to reflect the newer data.
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>Plan A</label>
          <select value={planA} onChange={(e) => setPlanA(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", fontSize: 13, color: "#1a365d" }}>
            <option value="">Select a plan...</option>
            <optgroup label="Medicare Advantage (65+)">
              {MA_2024.map((d) => (
                <option key={`ma-${d.insurer}`} value={`${d.insurer}|Medicare Advantage (65+)`}>
                  {d.insurer} - Medicare Advantage
                </option>
              ))}
            </optgroup>
            <optgroup label="ACA Marketplace (under 65)">
              {ACA_2024.map((d) => (
                <option key={`aca-${d.insurer}`} value={`${d.insurer}|ACA Marketplace (under 65)`}>
                  {d.insurer} - ACA Marketplace
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10, color: "#999", fontWeight: 700, fontSize: 14 }}>vs</div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>Plan B</label>
          <select value={planB} onChange={(e) => setPlanB(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", fontSize: 13, color: "#1a365d" }}>
            <option value="">Select a plan...</option>
            <optgroup label="Medicare Advantage (65+)">
              {MA_2024.map((d) => (
                <option key={`ma2-${d.insurer}`} value={`${d.insurer}|Medicare Advantage (65+)`}>
                  {d.insurer} - Medicare Advantage
                </option>
              ))}
            </optgroup>
            <optgroup label="ACA Marketplace (under 65)">
              {ACA_2024.map((d) => (
                <option key={`aca2-${d.insurer}`} value={`${d.insurer}|ACA Marketplace (under 65)`}>
                  {d.insurer} - ACA Marketplace
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {a && b ? (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "2px solid #e2e8f0" }}>
            <div style={{ padding: 16, borderRight: "1px solid #e2e8f0", textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1a365d" }}>{a.insurer}</div>
              <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginTop: 4, background: "#f0f4f8", display: "inline-block", padding: "2px 8px", borderRadius: 4 }}>{a.type}</div>
            </div>

            <div style={{ padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1a365d" }}>{b.insurer}</div>
              <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginTop: 4, background: "#f0f4f8", display: "inline-block", padding: "2px 8px", borderRadius: 4 }}>{b.type}</div>
            </div>
          </div>

          {[
            { label: "Denial Rate", key: "denialRate", suffix: "%", explain: "Percentage of requests denied. Lower is better for patients." },
            { label: "Approval Rate", key: "approvalRate", suffix: "%", explain: "Percentage of requests approved. Higher is better for patients." },
            { label: "Appeal Overturn Rate", key: "appealOverturnRate", suffix: "%", explain: "How often denials were reversed on appeal. Medicare Advantage only." },
          ].map((metric, i) => {
            const aVal = a[metric.key];
            const bVal = b[metric.key];
            if (aVal == null && bVal == null) return null;

            return (
              <div key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <div style={{ padding: "10px 16px 2px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1a365d" }}>{metric.label}</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{metric.explain}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ padding: "8px 16px 14px", borderRight: "1px solid #e2e8f0", textAlign: "center" }}>
                    <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: aVal != null ? "#1a365d" : "#ccc" }}>
                      {aVal != null ? `${aVal}${metric.suffix}` : "N/A"}
                    </div>
                  </div>

                  <div style={{ padding: "8px 16px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: bVal != null ? "#1a365d" : "#ccc" }}>
                      {bVal != null ? `${bVal}${metric.suffix}` : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ padding: 12, background: "#f7f8fa", fontSize: 10, color: "#999", textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>
            Calendar year 2024 data. Sources linked in methodology below.
          </div>
        </div>
      ) : (
        <div style={{ padding: 28, background: "#f7f8fa", border: "1px solid #e2e8f0", borderRadius: 10, textAlign: "center", color: "#999", fontSize: 13 }}>
          Select two plans above to see a side-by-side comparison.
        </div>
      )}
    </div>
  );
}
