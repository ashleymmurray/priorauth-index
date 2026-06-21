"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/payers", label: "Payers" },
  { href: "/metrics", label: "Metrics" },

  {
    href: "/compliance-tracker",
    label: "Compliance",
  },

  { href: "/insights", label: "Insights" },

  {
    href: "/methodology",
    label: "Methodology",
  },

  {
    href: "/newsletter",
    label: "Report",
  },

  { href: "/about", label: "About" },

  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkMobile
      );
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header
      style={{
        background: "#1a365d",
        borderBottom:
          "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        {/* DESKTOP NAV */}

        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              minHeight: 58,
              gap: 14,
            }}
          >
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Image
                src="/logo-mark.png"
                alt="The Prior Auth Index"
                width={42}
                height={42}
                priority
              />
            </Link>

            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                marginLeft: "auto",
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding:
                      "18px 14px 17px",
                    background: isActive(
                      item.href
                    )
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 12,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    borderBottom: isActive(
                      item.href
                    )
                      ? "2px solid rgba(255,255,255,0.16)"
                      : "2px solid transparent",
                    transition:
                      "background 0.15s ease",
                    fontFamily:
                      "'IBM Plex Sans', sans-serif",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* MOBILE NAV */}

        {isMobile && (
          <>
            <div
              style={{
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "space-between",
              }}
            >
              <Link
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/logo-mark.png"
                  alt="The Prior Auth Index"
                  width={34}
                  height={34}
                  priority
                />
              </Link>

              <button
                onClick={() =>
                  setMobileMenuOpen(
                    !mobileMenuOpen
                  )
                }
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
                aria-label="Toggle navigation"
              >
                <span
                  style={{
                    width: 24,
                    height: 2,
                    background: "#fff",
                    borderRadius: 999,
                  }}
                />

                <span
                  style={{
                    width: 24,
                    height: 2,
                    background: "#fff",
                    borderRadius: 999,
                  }}
                />

                <span
                  style={{
                    width: 24,
                    height: 2,
                    background: "#fff",
                    borderRadius: 999,
                  }}
                />
              </button>
            </div>

            {mobileMenuOpen && (
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: 14,
                }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      padding:
                        "14px 0",
                      color: "#fff",
                      textDecoration:
                        "none",
                      fontSize: 14,
                      fontWeight: isActive(
                        item.href
                      )
                        ? 700
                        : 500,
                      borderBottom:
                        "1px solid rgba(255,255,255,0.08)",
                      fontFamily:
                        "'IBM Plex Sans', sans-serif",
                      opacity: isActive(
                        item.href
                      )
                        ? 1
                        : 0.9,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
          </>
        )}
      </div>
    </header>
  );
}