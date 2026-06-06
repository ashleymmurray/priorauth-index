export default function GreenBar({ rate }) {
  const w = Math.min((rate / 100) * 100, 100);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
      }}
    >
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
            background: "#16a34a",
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
          color: "#16a34a",
          minWidth: 52,
          textAlign: "right",
        }}
      >
        {rate}%
      </span>
    </div>
  );
}
