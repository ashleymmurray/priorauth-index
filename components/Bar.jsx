export default function Bar({ rate, max = 30 }) {
  const w = Math.min((rate / max) * 100, 100);
  const c =
    rate > 20
      ? "#dc2626"
      : rate > 10
      ? "#ea580c"
      : rate > 7
      ? "#d97706"
      : "#16a34a";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
      <div
        style={{
          flex: 1,
          height: 22,
          background: "#eef0f4",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${w}%`,
            height: "100%",
            background: c,
            borderRadius: 4,
            transition: "width 0.5s ease",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700,
          fontSize: 15,
          color: c,
          minWidth: 52,
          textAlign: "right",
        }}
      >
        {rate}%
      </span>
    </div>
  );
}
