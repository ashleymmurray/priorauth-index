import { useState } from "react";

const MA_2024 = [
  { insurer: "UnitedHealthcare", denialRate: 12.8, approvalRate: 87.2, appealOverturnRate: 80.7, sourceUrl: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
  { insurer: "Centene", denialRate: 12.3, approvalRate: 87.7, appealOverturnRate: 93.6, sourceUrl: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
  { insurer: "Aetna (CVS Health)", denialRate: 11.9, approvalRate: 88.1, appealOverturnRate: 80.7, sourceUrl: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
  { insurer: "CVS Health (all contracts)", denialRate: 10.5, approvalRate: 89.5, appealOverturnRate: 89.7, sourceUrl: "https://www.kiplinger.com/retirement/medicare/medicare-advantage-plans-prior-authorization-denial-rates" },
  { insurer: "Kaiser Permanente", denialRate: 6.0, approvalRate: 94.0, appealOverturnRate: 80.7, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "Humana", denialRate: 5.8, approvalRate: 94.2, appealOverturnRate: 80.7, sourceUrl: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
  { insurer: "Anthem / Elevance Health", denialRate: 4.2, approvalRate: 95.8, appealOverturnRate: 80.7, sourceUrl: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
];

const ACA_2024 = [
  { insurer: "Oscar Health", denialRate: 25.3, approvalRate: 74.7, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "Anthem / Elevance Health", denialRate: 23.0, approvalRate: 77.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "Aetna (CVS Health)", denialRate: 22.0, approvalRate: 78.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "Molina Healthcare", denialRate: 22.0, approvalRate: 78.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "UnitedHealthcare", denialRate: 20.0, approvalRate: 80.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "BCBS (National Avg)", denialRate: 18.0, approvalRate: 82.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "Kaiser Permanente", denialRate: 6.0, approvalRate: 94.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
];

const CY2025_DATA = [
  { insurer: "UnitedHealthcare", approvalRate: 91.7, denialRate: 8.3, avgDecisionTime: "24 hours", note: "98% of claims did not require prior authorization. Nearly half of all PAs approved in real time.", sourceLabel: "UnitedHealthcare CMS Compliance Page", sourceUrl: "https://www.uhc.com/legal/cms-interoperability-prior-authorization" },
  { insurer: "Cigna (Standard Requests)", approvalRate: 73.0, denialRate: 27.0, avgDecisionTime: "3.95 days", note: "ACA Marketplace / Individual plans on the federal exchange. Appeal overturn rate: 16%.", sourceLabel: "Cigna CMS Prior Authorization Disclosure Report (PDF)", sourceUrl: "https://www.cigna.com/static/www-cigna-com/docs/cms-annual-prior-authorization-statistics-2025.pdf" },
  { insurer: "Cigna (Expedited Requests)", approvalRate: 78.0, denialRate: 22.0, avgDecisionTime: "1.53 days", note: "Expedited (urgent) requests for ACA Marketplace / Individual plans on the federal exchange.", sourceLabel: "Cigna CMS Prior Authorization Disclosure Report (PDF)", sourceUrl: "https://www.cigna.com/static/www-cigna-com/docs/cms-annual-prior-authorization-statistics-2025.pdf" },
  { insurer: "Aetna (CVS Health)", approvalRate: 95.0, denialRate: 5.0, avgDecisionTime: "Under 24 hours", note: "95%+ of eligible PAs approved within 24 hours. 77% of electronic PAs approved in real time. Fewest medical services subject to PA among major national insurers.", sourceLabel: "CVS Health Press Release, Jan 2026", sourceUrl: "https://www.cvshealth.com/news/company-news/cvs-health-makes-health-insurance-simpler-and-more-affordable-for-americans.html" },
];

function Bar({ rate, max = 30 }) {
  const w = Math.min((rate / max) * 100, 100);
  const c = rate > 20 ? "#dc2626" : rate > 10 ? "#ea580c" : rate > 7 ? "#d97706" : "#16a34a";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
      <div style={{ flex: 1, height: 22, background: "#eef0f4", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${w}%`, height: "100%", background: c, borderRadius: 4, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 15, color: c, minWidth: 52, textAlign: "right" }}>{rate}%</span>
    </div>
  );
}

function GreenBar({ rate }) {
  const w = Math.min((rate / 100) * 100, 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
      <div style={{ flex: 1, height: 22, background: "#eef0f4", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${w}%`, height: "100%", background: "#16a34a", borderRadius: 4, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 15, color: "#16a34a", minWidth: 52, textAlign: "right" }}>{rate}%</span>
    </div>
  );
}

function Collapsible({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "14px 18px", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#1a365d" }}>{title}</span>
        <span style={{ fontSize: 18, color: "#999", fontWeight: 300, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && <div style={{ padding: "0 18px 16px", fontSize: 13, color: "#555", lineHeight: 1.7 }}>{children}</div>}
    </div>
  );
}

function CompareSection() {
  const allPlans = [
    ...MA_2024.map(d => ({ ...d, type: "Medicare Advantage (65+)" })),
    ...ACA_2024.map(d => ({ ...d, type: "ACA Marketplace (under 65)", appealOverturnRate: null })),
  ];
  const [planA, setPlanA] = useState("");
  const [planB, setPlanB] = useState("");
  const a = allPlans.find(p => `${p.insurer}|${p.type}` === planA);
  const b = allPlans.find(p => `${p.insurer}|${p.type}` === planB);

  return (
    <div>
      <div style={{ padding: 14, background: "#f0f4f8", border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 16, fontSize: 12, color: "#555", lineHeight: 1.6 }}>
        This comparison tool uses <strong>calendar year 2024 data</strong> because it is the most complete dataset currently available, covering all major insurers equally. Once calendar year 2025 data has been reported by enough plans to allow for accurate comparisons, this tool will be updated to reflect the newer data.
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>Plan A</label>
          <select value={planA} onChange={e => setPlanA(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", fontSize: 13, color: "#1a365d" }}>
            <option value="">Select a plan...</option>
            <optgroup label="Medicare Advantage (65+)">
              {MA_2024.map(d => <option key={`ma-${d.insurer}`} value={`${d.insurer}|Medicare Advantage (65+)`}>{d.insurer} - Medicare Advantage</option>)}
            </optgroup>
            <optgroup label="ACA Marketplace (under 65)">
              {ACA_2024.map(d => <option key={`aca-${d.insurer}`} value={`${d.insurer}|ACA Marketplace (under 65)`}>{d.insurer} - ACA Marketplace</option>)}
            </optgroup>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10, color: "#999", fontWeight: 700, fontSize: 14 }}>vs</div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>Plan B</label>
          <select value={planB} onChange={e => setPlanB(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", fontSize: 13, color: "#1a365d" }}>
            <option value="">Select a plan...</option>
            <optgroup label="Medicare Advantage (65+)">
              {MA_2024.map(d => <option key={`ma2-${d.insurer}`} value={`${d.insurer}|Medicare Advantage (65+)`}>{d.insurer} - Medicare Advantage</option>)}
            </optgroup>
            <optgroup label="ACA Marketplace (under 65)">
              {ACA_2024.map(d => <option key={`aca2-${d.insurer}`} value={`${d.insurer}|ACA Marketplace (under 65)`}>{d.insurer} - ACA Marketplace</option>)}
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
                    <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: aVal != null ? "#1a365d" : "#ccc" }}>{aVal != null ? `${aVal}${metric.suffix}` : "N/A"}</div>
                  </div>
                  <div style={{ padding: "8px 16px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: bVal != null ? "#1a365d" : "#ccc" }}>{bVal != null ? `${bVal}${metric.suffix}` : "N/A"}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ padding: 12, background: "#f7f8fa", fontSize: 10, color: "#999", textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>Calendar year 2024 data. Sources linked in methodology below.</div>
        </div>
      ) : (
        <div style={{ padding: 28, background: "#f7f8fa", border: "1px solid #e2e8f0", borderRadius: 10, textAlign: "center", color: "#999", fontSize: 13 }}>Select two plans above to see a side-by-side comparison.</div>
      )}
    </div>
  );
}

export default function PriorAuthIndex() {
  const [activeTab, setActiveTab] = useState("denials");
  const tabs = [
    { id: "denials", label: "Denial Rates" },
    { id: "appeals", label: "Appeal Success" },
    { id: "compare", label: "Compare Plans" },
    { id: "cy2025", label: "2025 Data (New)" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fa", color: "#1a1a2e", fontFamily: "'IBM Plex Sans', -apple-system, system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ background: "#fff", borderBottom: "3px solid #1a365d", padding: "28px 20px 22px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 18, height: 3, background: "#1a365d", borderRadius: 2 }} />
            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 2.5, color: "#1a365d", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>Public Database</span>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.15, margin: 0, color: "#1a365d" }}>The PriorAuth Index</h1>
          <p style={{ color: "#333", fontSize: 14, marginTop: 10, lineHeight: 1.5, maxWidth: 580, fontWeight: 500 }}>A free, centralized database of health plan prior authorization metrics. Comparable and sourced from public data.</p>
          <p style={{ color: "#aaa", fontSize: 10, marginTop: 10, fontFamily: "'IBM Plex Mono', monospace" }}>Created by Ashley Murray | Updated monthly | Last updated April 2026</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 20px 48px" }}>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 18, marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1a365d", marginBottom: 8 }}>What is prior authorization?</div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>Prior authorization is when your insurance company requires your doctor to get approval before providing certain treatments, procedures, or medications. The insurer reviews the request and decides whether to approve or deny it. During that time, the patient waits. Sometimes days, sometimes weeks.</div>
        </div>

        <Collapsible title="What is this site?">
          As of March 31, 2026, health plans are required by federal law (CMS rule CMS-0057-F) to publicly report how often they approve, deny, and overturn prior authorization requests. The problem is that each plan posts this data on its own website in its own format, making it difficult to find and nearly impossible to compare across plans. The PriorAuth Index brings that data together in one place.
        </Collapsible>
        <Collapsible title="Why do some companies appear more than once?">
          Many insurance companies sell more than one type of plan. For example, UnitedHealthcare offers both <strong>Medicare Advantage</strong> plans (for people 65 and older or those with certain disabilities) and <strong>ACA Marketplace</strong> plans (for people under 65 who buy insurance through HealthCare.gov). The same company can have very different denial rates depending on the type of plan. That is why you may see a company listed under both categories with different numbers.
        </Collapsible>
        <Collapsible title="Is this every health plan in the country?">
          No. There are hundreds of health plans in the United States. This database currently includes the major national insurers for which public data is available. It does not yet include most regional plans, smaller Medicaid managed care plans, employer-sponsored plans (which are not required to publicly report this data), or individual state-level BCBS affiliates. As more plans publish their data under the new federal reporting rule, this database will be updated. The goal is for this to grow into a comprehensive resource over time.
        </Collapsible>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 18, marginTop: 12, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1a365d", marginBottom: 12 }}>At a glance: Medicare Advantage, calendar year 2024</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { value: "52.8M", label: "Total prior authorization decisions made" },
              { value: "4.1M", label: "Requests denied fully or partially (7.7% of all requests)" },
              { value: "80.7%", label: "Of appealed denials were overturned, meaning the initial denial did not hold up" },
              { value: "11.5%", label: "Of denied requests were ever actually appealed by patients or providers" },
            ].map((stat, i) => (
              <div key={i} style={{ padding: 14, background: "#f7f8fa", borderRadius: 6, border: "1px solid #eef0f4" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#1a365d", fontFamily: "'IBM Plex Mono', monospace" }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5, marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10, color: "#aaa", marginTop: 10, fontFamily: "'IBM Plex Mono', monospace" }}>
            Source: <a href="https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" target="_blank" rel="noopener noreferrer" style={{ color: "#1a365d" }}>KFF analysis of CMS Medicare Advantage data, January 2026</a>
          </div>
        </div>

        <div style={{ display: "flex", gap: 0, marginBottom: 20, borderRadius: 8, overflow: "hidden", border: "1px solid #d1d5db", flexWrap: "wrap" }}>
          {tabs.map((tab, i) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, minWidth: 100, padding: "12px 8px", border: "none",
              borderRight: i < tabs.length - 1 ? "1px solid #d1d5db" : "none",
              background: activeTab === tab.id ? "#1a365d" : "#fff",
              color: activeTab === tab.id ? "#fff" : "#555",
              fontSize: 12, fontWeight: 600, cursor: "pointer"
            }}>{tab.label}</button>
          ))}
        </div>

        {activeTab === "denials" && (
          <div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 20 }}>The percentage of prior authorization requests each plan denied in calendar year 2024. A higher number means more requests were rejected. Plans are listed from highest denial rate to lowest.</div>
            <div style={{ background: "#1a365d", color: "#fff", padding: "10px 16px", borderRadius: "8px 8px 0 0", fontSize: 14, fontWeight: 700 }}>Medicare Advantage Plans</div>
            <div style={{ background: "#eef2f7", padding: "6px 16px", borderBottom: "1px solid #e2e8f0", fontSize: 11, color: "#666", fontFamily: "'IBM Plex Mono', monospace" }}>For people 65+ or with certain disabilities | Calendar year 2024 | Source: KFF / CMS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 28 }}>
              {[...MA_2024].sort((a, b) => b.denialRate - a.denialRate).map((plan, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "14px 16px" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1a365d", marginBottom: 8 }}>{plan.insurer}</div>
                  <Bar rate={plan.denialRate} />
                </div>
              ))}
            </div>
            <div style={{ background: "#1a365d", color: "#fff", padding: "10px 16px", borderRadius: "8px 8px 0 0", fontSize: 14, fontWeight: 700 }}>ACA Marketplace Plans</div>
            <div style={{ background: "#eef2f7", padding: "6px 16px", borderBottom: "1px solid #e2e8f0", fontSize: 11, color: "#666", fontFamily: "'IBM Plex Mono', monospace" }}>For people under 65 buying insurance through HealthCare.gov | Plan Year 2024 | Source: CMS Transparency in Coverage</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[...ACA_2024].sort((a, b) => b.denialRate - a.denialRate).map((plan, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "14px 16px" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1a365d", marginBottom: 8 }}>{plan.insurer}</div>
                  <Bar rate={plan.denialRate} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "appeals" && (
          <div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 12 }}>When a prior authorization request is denied, patients and providers can file an appeal asking the plan to reconsider. This shows how often those appeals succeeded, meaning the original denial was reversed. A higher percentage means more denials were overturned.</div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 20 }}>Appeal data is currently only available for Medicare Advantage plans.</div>
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderLeft: "4px solid #1a365d", borderRadius: 4, padding: 14, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>Across all Medicare Advantage plans in 2024, <strong>80.7%</strong> of appealed denials were overturned. However, only <strong>11.5%</strong> of denied requests were ever actually appealed. This means millions of patients accepted denials that may have been reversed if challenged.</div>
              <div style={{ fontSize: 10, color: "#999", marginTop: 6, fontFamily: "'IBM Plex Mono', monospace" }}>Source: <a href="https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" target="_blank" rel="noopener noreferrer" style={{ color: "#1a365d" }}>KFF, Jan 2026</a></div>
            </div>
            <div style={{ background: "#1a365d", color: "#fff", padding: "10px 16px", borderRadius: "8px 8px 0 0", fontSize: 14, fontWeight: 700 }}>Medicare Advantage Plans: Appeal Overturn Rates</div>
            <div style={{ background: "#eef2f7", padding: "6px 16px", borderBottom: "1px solid #e2e8f0", fontSize: 11, color: "#666", fontFamily: "'IBM Plex Mono', monospace" }}>Calendar year 2024 | Ranked highest to lowest</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[...MA_2024].sort((a, b) => b.appealOverturnRate - a.appealOverturnRate).map((plan, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#1a365d" }}>{plan.insurer}</div>
                    <div style={{ fontSize: 11, color: "#888", fontFamily: "'IBM Plex Mono', monospace" }}>Denial rate: {plan.denialRate}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 4, fontFamily: "'IBM Plex Mono', monospace" }}>Percentage of appeals overturned</div>
                    <GreenBar rate={plan.appealOverturnRate} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: 12, background: "#f7f8fa", border: "1px solid #eef0f4", borderRadius: 6, fontSize: 11, color: "#888", lineHeight: 1.6 }}>
              <strong>Note:</strong> Centene (93.6%) and CVS Health (89.7%) reflect plan-specific appeal data reported by KFF and Kiplinger. All other plans display the Medicare Advantage-wide average of 80.7% and are labeled accordingly. As plan-specific appeal data becomes available, it will replace these averages.
            </div>
          </div>
        )}

        {activeTab === "compare" && (
          <div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>Select two health plans to see how they compare. Each plan is labeled with its type so you can tell them apart, even if the same company appears in both categories.</div>
            <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6, marginBottom: 20 }}>Tip: You can compare two plans of the same type, or compare the same company across different plan types to see how their numbers differ.</div>
            <CompareSection />
          </div>
        )}

        {activeTab === "cy2025" && (
          <div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 12 }}>On March 31, 2026, health plans were required to begin publicly reporting their prior authorization metrics for calendar year 2025. The data below reflects what has been published so far by individual plans. This section will be updated as more plans post their reports.</div>
            <div style={{ padding: 14, background: "#f0f4f8", border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 20, fontSize: 12, color: "#555", lineHeight: 1.6 }}>
              <strong>Important:</strong> The data below comes from different plan types and reporting formats. These numbers are not directly comparable to each other or to the 2024 data shown in the other tabs. A standardized comparison tool for 2025 data will be added once enough plans have reported to allow for accurate, consistent comparisons.
            </div>

            {CY2025_DATA.map((plan, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 18, marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1a365d", marginBottom: 10 }}>{plan.insurer}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
                  <div style={{ padding: 10, background: "#f7f8fa", borderRadius: 6, border: "1px solid #eef0f4" }}>
                    <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>Approval Rate</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#16a34a", fontFamily: "'IBM Plex Mono', monospace" }}>{plan.approvalRate}%</div>
                  </div>
                  <div style={{ padding: 10, background: "#f7f8fa", borderRadius: 6, border: "1px solid #eef0f4" }}>
                    <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>Denial Rate</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: plan.denialRate > 15 ? "#dc2626" : plan.denialRate > 8 ? "#ea580c" : "#d97706", fontFamily: "'IBM Plex Mono', monospace" }}>{plan.denialRate}%</div>
                  </div>
                  <div style={{ padding: 10, background: "#f7f8fa", borderRadius: 6, border: "1px solid #eef0f4" }}>
                    <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>Avg Decision Time</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#1a365d", fontFamily: "'IBM Plex Mono', monospace" }}>{plan.avgDecisionTime}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, marginBottom: 6 }}>{plan.note}</div>
                <a href={plan.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#1a365d", textDecoration: "underline", fontFamily: "'IBM Plex Mono', monospace" }}>{plan.sourceLabel}</a>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, padding: 20, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a365d", marginBottom: 10 }}>Where does this data come from?</h3>
          <div style={{ fontSize: 12, color: "#555", lineHeight: 1.8 }}>
            <p>The Denial Rates, Appeal Success, and Compare Plans tabs use <strong>calendar year 2024 data</strong>. Medicare Advantage data comes from the Kaiser Family Foundation's (KFF) analysis of CMS Medicare Advantage Prior Authorization data, published in January 2026. ACA Marketplace data comes from CMS Transparency in Coverage Public Use Files for Plan Year 2024.</p>
            <p style={{ marginTop: 8 }}>The 2025 Data tab contains metrics that individual plans have published on their own websites to comply with CMS rule CMS-0057-F, which required plans to post calendar year 2025 metrics by March 31, 2026. This section will be updated as more plans publish their reports.</p>
            <p style={{ marginTop: 8 }}>ACA Marketplace data covers in-network claims for plans sold on HealthCare.gov only and does not include employer-sponsored plans, Medicare, Medicaid, or off-marketplace plans.</p>
            <p style={{ marginTop: 8 }}><strong>BCBS note:</strong> The BCBS figure shown is a national average across 36 independent affiliates. Individual state rates vary significantly. For example, Alabama BCBS has been reported at approximately 34%, while some affiliates report below 10%.</p>
          </div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1a365d", marginTop: 16, marginBottom: 8 }}>Sources</h4>
          <div style={{ fontSize: 12, lineHeight: 2.2 }}>
            {[
              { label: "KFF: Medicare Advantage Prior Authorization Determinations, 2024", url: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
              { label: "KFF: First Look at Insurer Prior Auth Reporting (Apr 2026)", url: "https://www.kff.org/quick-take/insurers-prior-authorization-data-offers-little-insight-into-what-gets-approved-or-denied/" },
              { label: "Muni Health: Denial Rate Comparison by Insurer (2026)", url: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
              { label: "AMA: Physician Prior Authorization Survey (Feb 2025)", url: "https://www.ama-assn.org/press-center/ama-press-releases/physicians-concerned-ai-increases-prior-authorization-denials" },
              { label: "CMS: Interoperability and Prior Authorization Final Rule (CMS-0057-F)", url: "https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-prior-authorization-final-rule-cms-0057-f" },
              { label: "Becker's Hospital Review: Prior Auth Denial Rates Go Public (Mar 2026)", url: "https://www.beckershospitalreview.com/legal-regulatory-issues/payers-prior-authorization-denial-rates-go-public-5-notes/" },
              { label: "Kiplinger: Medicare Advantage Prior Authorization Denial Rates", url: "https://www.kiplinger.com/retirement/medicare/medicare-advantage-plans-prior-authorization-denial-rates" },
              { label: "UnitedHealthcare: CMS Interoperability and Prior Authorization Page", url: "https://www.uhc.com/legal/cms-interoperability-prior-authorization" },
              { label: "Cigna: CMS Annual Prior Authorization Statistics CY2025 (PDF)", url: "https://www.cigna.com/static/www-cigna-com/docs/cms-annual-prior-authorization-statistics-2025.pdf" },
              { label: "CVS Health: Prior Authorization and Affordability Update (Jan 2026)", url: "https://www.cvshealth.com/news/company-news/cvs-health-makes-health-insurance-simpler-and-more-affordable-for-americans.html" },
            ].map((s, i) => (
              <div key={i}>• <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: "#1a365d", textDecoration: "underline" }}>{s.label}</a></div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14, padding: 14, background: "#fafbfc", border: "1px solid #eef0f4", borderRadius: 6 }}>
          <div style={{ fontSize: 11, color: "#999", lineHeight: 1.7 }}><strong>Disclaimer:</strong> This database is for informational and research purposes only. It does not constitute medical, legal, or financial advice. Denial rates are aggregated national figures that vary by state, plan, and service type. Individual experiences may differ. Always verify current metrics directly with your health plan.</div>
        </div>

        <div style={{ textAlign: "center", padding: "28px 0 0", color: "#bbb", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}>The PriorAuth Index | Built by Ashley Murray | 2026</div>
      </div>
    </div>
  );
}
