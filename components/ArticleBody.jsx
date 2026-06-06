import { SECTION_HEADINGS, SUB_HEADINGS } from "@/data/insights";

export default function ArticleBody({ content }) {
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {lines.map((line, i) => {
        if (SECTION_HEADINGS.includes(line)) {
          return (
            <h2
              key={i}
              style={{
                fontSize: 19,
                fontWeight: 700,
                color: "#1a365d",
                marginTop: 36,
                marginBottom: 14,
                lineHeight: 1.3,
                fontFamily: "'IBM Plex Sans', sans-serif",
                borderTop: "2px solid #e2e8f0",
                paddingTop: 24,
              }}
            >
              {line}
            </h2>
          );
        }

        if (SUB_HEADINGS.includes(line)) {
          return (
            <h3
              key={i}
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1a365d",
                marginTop: 22,
                marginBottom: 8,
                lineHeight: 1.4,
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
            >
              {line}
            </h3>
          );
        }

        return (
          <p
            key={i}
            style={{
              fontSize: 15,
              color: "#2d3748",
              lineHeight: 1.8,
              marginBottom: 18,
              marginTop: 0,
            }}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}
