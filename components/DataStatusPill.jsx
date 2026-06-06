export default function DataStatusPill({ status }) {
  return (
    <span
      style={{
        background: "#f0f4f8",
        border: "1px solid #dbe3ec",
        color: "#1a365d",
        fontSize: 10,
        fontFamily: "'IBM Plex Mono', monospace",
        borderRadius: 999,
        padding: "4px 8px",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {status}
    </span>
  );
}
