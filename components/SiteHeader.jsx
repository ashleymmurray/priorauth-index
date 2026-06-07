"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/metrics", label: "Metrics" },
  { href: "/compliance-tracker", label: "CMS Compliance Tracker" },
  { href: "/insights", label: "Insights" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header style={{ background: "#1a365d", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, lineHeight: 1.1 }}>
              The Prior Auth Index
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 4, fontFamily: "'IBM Plex Mono', monospace" }}>
              Independent prior authorization transparency tracking
            </div>
          </Link>

          <nav style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "8px 10px",
                  borderRadius: 6,
                  color: isActive(item.href) ? "#1a365d" : "rgba(255,255,255,0.78)",
                  background: isActive(item.href) ? "#fff" : "transparent",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 6,
              padding: "8px 10px",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Menu
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 6,
                  color: isActive(item.href) ? "#1a365d" : "#fff",
                  background: isActive(item.href) ? "#fff" : "rgba(255,255,255,0.08)",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
