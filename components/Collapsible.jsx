"use client";

import { useState } from "react";

export default function Collapsible({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        marginBottom: 8,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "14px 18px",
          background: "none",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: "#1a365d" }}>
          {title}
        </span>
        <span
          style={{
            fontSize: 17,
            color: "#999",
            fontWeight: 300,
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: "0 18px 16px",
            fontSize: 13,
            color: "#555",
            lineHeight: 1.7,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
