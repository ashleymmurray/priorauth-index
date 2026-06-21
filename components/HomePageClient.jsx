"use client";

import Link from "next/link";

import Collapsible from "@/components/Collapsible";
import NewsletterSignup from "@/components/NewsletterSignup";
import { INSIGHTS_POSTS } from "@/data/insights";

const featuredPayers = [
  ["UnitedHealthcare", "/payers/unitedhealthcare"],
  ["Oscar Health QHP", "/payers/oscar-health-qhp"],
  ["Optum Insurance of Ohio", "/payers/optum-insurance-of-ohio-inc"],
  ["Braven Health", "/payers/braven-health"],
  [
    "Horizon BCBS NJ",
    "/payers/horizon-blue-cross-blue-shield-of-new-jersey",
  ],
];

export default function HomePageClient() {
  return (
    <>
      <style jsx>{`
        .home-shell {
          max-width: 820px;
          margin: 0 auto;
          padding: 42px 24px 64px;
        }

        .hero {
          margin-bottom: 42px;
        }

        .eyebrow {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2.4px;
          color: #1a365d;
          font-weight: 700;
          font-family: "IBM Plex Mono", monospace;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0.95;
        }

        .eyebrow-line {
          width: 20px;
          height: 2px;
          background: #1a365d;
          display: inline-block;
          flex-shrink: 0;
        }

        .hero-title {
          font-size: 52px;
          font-weight: 800;
          color: #1a365d;
          line-height: 1;
          margin-bottom: 20px;
          letter-spacing: -2px;
          max-width: 700px;
        }

        .hero-copy {
          font-size: 18px;
          color: #374151;
          line-height: 1.65;
          max-width: 760px;
          margin-bottom: 18px;
          font-weight: 500;
        }

        .meta {
          font-size: 11px;
          color: #8a94a6;
          font-family: "IBM Plex Mono", monospace;
          margin-bottom: 20px;
          line-height: 1.7;
        }

        .pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pill {
          padding: 6px 12px;
          border: 1px solid #e5eaf1;
          border-radius: 999px;
          background: #fff;
          font-size: 10px;
          color: #1a365d;
          font-family: "IBM Plex Mono", monospace;
          white-space: nowrap;
        }

        .wide-divider {
          border-top: 2px solid #1a365d;
          margin-bottom: 34px;
          width: 100vw;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0.95;
        }

        .card {
          background: #fff;
          border: 1px solid #edf2f7;
          border-radius: 10px;
        }

        .latest-card {
          background: #fff;
          border: 1px solid #e7edf4;
          border-left: 4px solid #1a365d;
          border-radius: 12px;
          padding: 28px;
          margin-bottom: 42px;
          box-shadow: 0 3px 14px rgba(26, 54, 93, 0.04);
        }

        .latest-title {
          font-size: 32px;
          font-weight: 750;
          color: #1a365d;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -1px;
          max-width: 680px;
        }

        .body-copy {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.8;
        }

        .latest-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 24px;
        }

        .button {
          display: inline-block;
          background: #1a365d;
          color: #fff;
          border-radius: 7px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          font-family: "IBM Plex Sans", sans-serif;
        }

        .section {
          margin-bottom: 54px;
        }

        .section-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #7b8798;
          font-weight: 700;
          font-family: "IBM Plex Mono", monospace;
          margin-bottom: 10px;
        }

        .section-title {
          font-size: 34px;
          font-weight: 800;
          color: #1a365d;
          margin-bottom: 10px;
          letter-spacing: -1px;
          line-height: 1.1;
        }

        .section-subtitle {
          font-size: 20px;
          font-weight: 650;
          color: #1a365d;
          margin-bottom: 14px;
          line-height: 1.35;
        }

        .small-note {
          font-size: 13px;
          color: #7b8798;
          margin-bottom: 22px;
          line-height: 1.7;
        }

        .payer-profile-card {
          padding: 24px;
          border-left: 3px solid #1a365d;
          margin-bottom: 54px;
        }

        .payer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 20px 0;
        }

        .context-intro {
          margin-bottom: 18px;
        }

        .context-title {
          font-size: 24px;
          font-weight: 750;
          color: #1a365d;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }

        .info-card {
          padding: 22px;
          margin-bottom: 10px;
        }

        .info-heading {
          font-size: 15px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 10px;
        }

        .scope-card {
          border-left: 3px solid #1a365d;
          padding: 24px;
          margin-top: 18px;
          margin-bottom: 14px;
        }

        .scope-title {
          font-size: 22px;
          font-weight: 750;
          color: #1a365d;
          margin-bottom: 14px;
          letter-spacing: -0.5px;
        }

        .audience-card {
          padding: 24px;
          margin-bottom: 18px;
        }

        .audience-list {
          margin: 0;
          padding-left: 20px;
        }

        .audience-list li {
          margin-bottom: 6px;
        }

        .tagline {
          font-size: 10px;
          color: #9aa3b2;
          text-align: center;
          margin-bottom: 24px;
          font-family: "IBM Plex Mono", monospace;
          letter-spacing: 1.2px;
        }

        .final-card {
          padding: 26px;
          margin-top: 12px;
          margin-bottom: 12px;
          border-radius: 12px;
        }

        .final-title {
          font-size: 24px;
          font-weight: 750;
          color: #1a365d;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }

        .final-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        @media (max-width: 767px) {
          .home-shell {
            padding: 28px 18px 48px;
          }

          .hero {
            margin-bottom: 30px;
          }

          .eyebrow {
            font-size: 9px;
            letter-spacing: 2px;
            margin-bottom: 10px;
            align-items: flex-start;
          }

          .eyebrow-line {
            width: 16px;
            margin-top: 6px;
          }

          .hero-title {
            font-size: 36px;
            line-height: 1.02;
            margin-bottom: 16px;
            letter-spacing: -1.5px;
          }

          .hero-copy {
            font-size: 15px;
            line-height: 1.7;
            margin-bottom: 16px;
          }

          .meta {
            font-size: 10px;
            line-height: 1.8;
            margin-bottom: 18px;
          }

          .pill-row {
            gap: 6px;
          }

          .pill {
            padding: 5px 10px;
            font-size: 9px;
          }

          .wide-divider {
            margin-bottom: 28px;
          }

          .latest-card {
            padding: 22px 18px;
            margin-bottom: 34px;
          }

          .latest-title {
            font-size: 26px;
            line-height: 1.08;
            margin-bottom: 14px;
          }

          .body-copy {
            font-size: 14px;
            line-height: 1.85;
          }

          .latest-actions {
            align-items: flex-start;
            flex-direction: column;
            gap: 16px;
            margin-top: 20px;
          }

          .button {
            padding: 12px 18px;
            font-size: 13px;
          }

          .section {
            margin-bottom: 42px;
          }

          .section-label {
            font-size: 10px;
          }

          .section-title {
            font-size: 30px;
            line-height: 1.08;
          }

          .section-subtitle {
            font-size: 16px;
            line-height: 1.4;
          }

          .small-note {
            font-size: 12px;
          }

          .context-title,
          .final-title {
            font-size: 22px;
          }

          .info-card,
          .scope-card,
          .audience-card,
          .final-card,
          .payer-profile-card {
            padding: 18px;
          }

          .scope-title {
            font-size: 21px;
          }
        }
      `}</style>

      <div className="home-shell">
        <div className="hero">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            Independent prior authorization data
          </div>

          <div className="hero-title">The Prior Auth Index</div>

          <div className="hero-copy">
            Independent tracking of prior authorization reporting, payer
            publication status, and workflow-related metrics across U.S. health
            plans.
          </div>

          <div className="meta">
            Created by Ashley Murray | Updated monthly | Last updated June 2026
          </div>

          <div className="pill-row">
            {[
              "Independent",
              "Source-linked",
              "Regularly updated",
              "No payer sponsorship",
              "Operational reporting",
            ].map((pill) => (
              <div key={pill} className="pill">
                {pill}
              </div>
            ))}
          </div>
        </div>

        <div className="wide-divider" />

        <div className="latest-card">
          <div style={{ marginBottom: 14 }}>
            <span className="eyebrow" style={{ marginBottom: 0 }}>
              Latest Insight
            </span>
          </div>

          <div className="latest-title">{INSIGHTS_POSTS[0].title}</div>

          <div className="body-copy">{INSIGHTS_POSTS[0].excerpt}</div>

          <div className="latest-actions">
            <Link
              href={`/insights/${INSIGHTS_POSTS[0].slug}`}
              className="button"
            >
              Read analysis →
            </Link>

            <span
              style={{
                fontSize: 11,
                color: "#9aa3b2",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {INSIGHTS_POSTS[0].date} · {INSIGHTS_POSTS[0].readTime}
            </span>
          </div>
        </div>

        <div className="card payer-profile-card">
          <div className="section-label">Payer reporting infrastructure</div>

          <div className="final-title">
            Explore tracked payer reporting profiles
          </div>

          <div className="body-copy" style={{ marginBottom: 18 }}>
            Search monitored payer and plan reporting profiles, publication
            status, source-linked disclosures, and machine-readable reporting
            availability across tracked plans.
          </div>

          <div className="payer-links">
            {featuredPayers.map(([label, href]) => (
              <Link key={href} href={href} className="pill">
                {label}
              </Link>
            ))}
          </div>

          <Link href="/payers" className="button">
            Browse all tracked plans →
          </Link>
        </div>

        <div className="section">
          <div className="section-label">Research publication</div>

          <div className="section-title">The Prior Auth Report</div>

          <div className="section-subtitle">
            Prior authorization reporting and operational patterns.
          </div>

          <div className="body-copy" style={{ marginBottom: 14 }}>
            Monthly analysis covering payer reporting behavior, operational
            variation, denial infrastructure, workflow burden, and CMS
            compliance patterns across U.S. health plans.
          </div>

          <div className="small-note">
            Launching July 2026. Early subscribers receive the first issue.
          </div>

          <NewsletterSignup />
        </div>

        <div className="context-intro">
          <div className="section-label">Dataset context</div>

          <div className="context-title">Understanding the dataset</div>

          <div className="body-copy">
            How prior authorization reporting works, what this database tracks,
            and how to interpret published payer metrics across plans.
          </div>
        </div>

        <div className="card info-card">
          <div className="info-heading">What is prior authorization?</div>

          <div className="body-copy">
            Prior authorization is a requirement that clinicians obtain approval
            from an insurer before certain treatments, procedures, or
            medications are provided. The insurer reviews the request against
            applicable criteria and issues a determination. The Prior Auth Index
            tracks public reporting related to this process, including approval
            rates, denial rates, decision timelines, appeal outcomes, and source
            availability.
          </div>
        </div>

        <Collapsible title="What is this site?">
          CMS rule CMS-0057-F requires impacted health plans to publicly report
          prior authorization metrics including approval rates, denial rates,
          appeal outcomes, and decision timelines. The Prior Auth Index tracks
          where this reporting is available, how it is formatted, and whether
          required metrics are present at reviewed source locations.
        </Collapsible>

        <Collapsible title="Why do some companies appear more than once?">
          Many insurance companies sell more than one type of plan. For example,
          UnitedHealthcare offers both <strong>Medicare Advantage</strong> plans
          and <strong>ACA Marketplace</strong> plans. The same company can have
          very different denial rates depending on the type of plan. That is why
          you may see a company listed under multiple categories with different
          metrics.
        </Collapsible>

        <Collapsible title="Is this every health plan in the country?">
          No. There are thousands of health plans and plan variations operating
          in the United States. This database currently includes major national
          insurers and selected plan-level disclosures for which public data is
          available. It does not yet include most regional plans, smaller
          Medicaid managed care plans, employer-sponsored plans outside the rule
          scope, or most state-level BCBS affiliates. The database expands as
          additional public reporting is identified.
        </Collapsible>

        <div className="card scope-card">
          <div className="section-label">Reporting scope</div>

          <div className="scope-title">Purpose and scope</div>

          <div className="body-copy">
            <p style={{ margin: 0, marginBottom: 14 }}>
              Prior authorization reporting is now subject to public disclosure
              requirements under CMS-0057-F. Publication status alone does not
              establish usability, comparability, or completeness.
            </p>

            <p style={{ margin: 0, marginBottom: 14 }}>
              Plans report in different formats, at different URLs, with
              inconsistent definitions and varying levels of granularity. The
              result is a fragmented public dataset that requires source
              mapping, normalization, and review before it can be interpreted
              across plans.
            </p>

            <p style={{ margin: 0 }}>
              The Prior Auth Index maps source locations, tracks publication
              status, summarizes available metrics, and identifies limitations
              in usability and comparability.
            </p>
          </div>
        </div>

        <div className="card audience-card">
          <div className="info-heading">Who this is for</div>

          <div className="body-copy">
            <p style={{ margin: 0, marginBottom: 14 }}>
              The Prior Auth Index is designed for users reviewing prior
              authorization reporting across operational, policy, and market
              contexts:
            </p>

            <ul className="audience-list">
              <li>
                Revenue cycle and utilization management teams tracking payer
                reporting patterns
              </li>
              <li>
                Consultants and analysts researching prior authorization
                reporting across markets
              </li>
              <li>
                Healthtech operators evaluating payer reporting infrastructure
              </li>
              <li>
                Payer strategy and contracting teams reviewing plan-level
                metrics
              </li>
              <li>
                Journalists and researchers studying prior authorization
                patterns
              </li>
              <li>Users interpreting published prior authorization reporting</li>
            </ul>
          </div>
        </div>

        <div className="tagline">
          Mapping prior authorization reporting patterns as the public dataset
          matures.
        </div>

        <div className="card final-card">
          <div className="section-label">Plan-level data</div>

          <div className="final-title">
            Plan-level prior authorization metrics
          </div>

          <div className="body-copy" style={{ marginBottom: 18 }}>
            Denial rates, appeal overturn patterns, and published 2025 metrics
            across major U.S. health plans, with source-linked disclosures and
            plan-level reporting context.
          </div>

          <div className="final-pills">
            {[
              "2025 metrics",
              "Source-linked disclosures",
              "Plan-level comparisons",
            ].map((item) => (
              <div key={item} className="pill">
                {item}
              </div>
            ))}
          </div>

          <Link href="/metrics" className="button">
            View Metrics →
          </Link>
        </div>
      </div>
    </>
  );
}