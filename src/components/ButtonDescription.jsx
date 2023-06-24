export default function ButtonDescription({ children }) {
  return (
    <div style={{ display: "flex", placeContent: "center" }}>
      <div
        style={{
          margin: "20px",
          padding: "14px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          width: "300px",
          color: "#888",
          textAlign: "left",
          textIndent: "30px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
