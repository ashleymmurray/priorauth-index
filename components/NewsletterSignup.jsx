"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const email = e.target.email.value;

    setStatus("loading");

    try {
      const response = await fetch(
        "/api/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section
      style={{
        maxWidth: "100%",
        margin: "14px auto 18px",
        padding: "18px 18px 16px",
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 8,
      }}
    >
      <div
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 2,
          color: "#7b8794",
          fontFamily:
            "'IBM Plex Mono', monospace",
          marginBottom: 10,
        }}
      >
        The Prior Auth Report
      </div>

      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1.2,
          color: "#1a365d",
          marginBottom: 10,
        }}
      >
        Join the newsletter waitlist
      </div>

      <div
        style={{
          fontSize: 13,
          color: "#555",
          lineHeight: 1.65,
          marginBottom: 14,
        }}
      >
        Long-form analysis covering payer
        operations, prior authorization
        transparency, denial infrastructure,
        appeals systems, and CMS compliance.
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          style={{
            height: 42,
            padding: "0 14px",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            fontSize: 14,
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            height: 42,
            background: "#1a365d",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          {status === "loading"
            ? "Joining..."
            : "Join the Report Waitlist"}
        </button>

        {status === "success" && (
          <p
            style={{
              color: "#1a7f37",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            Subscription confirmed.
          </p>
        )}

        {status === "error" && (
          <p
            style={{
              color: "#cc0000",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            Submission failed. Please try
            again.
          </p>
        )}
      </form>
    </section>
  );
}