import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        background:     "#F5F7FA",
        fontFamily:     "Inter, sans-serif",
        textAlign:      "center",
        padding:        "2rem",
      }}
    >
      <div
        style={{
          fontSize:    "7rem",
          fontWeight:  900,
          color:       "#1B2A4A",
          lineHeight:  1,
          marginBottom:"1rem",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize:    "1.75rem",
          fontWeight:  700,
          color:       "#1B2A4A",
          marginBottom:"0.75rem",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          color:         "#6B7280",
          marginBottom:  "2rem",
          maxWidth:      "420px",
          lineHeight:    1.6,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          display:       "inline-block",
          background:    "#2E7D32",
          color:         "#fff",
          padding:       "12px 28px",
          borderRadius:  "8px",
          fontWeight:    600,
          textDecoration:"none",
          fontSize:      "0.95rem",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
