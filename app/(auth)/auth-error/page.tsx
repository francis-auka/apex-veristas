"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ShieldAlert } from "lucide-react";

const ERROR_MESSAGES: Record<string, string> = {
  Configuration:   "Server configuration error. Please contact support.",
  AccessDenied:    "You do not have permission to access this resource.",
  Verification:    "The sign-in link has expired. Please request a new one.",
  CredentialsSignin: "Incorrect email or password.",
  Default:         "An unexpected authentication error occurred.",
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "Default";
  const message = ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default;

  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(239,68,68,0.3)",
      backdropFilter: "blur(20px)",
      padding: 40,
      boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
      maxWidth: 420,
      width: "100%",
    }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{
          width: 48, height: 48, margin: "0 auto 16px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(239,68,68,0.15)",
          border: "1px solid rgba(239,68,68,0.3)",
        }}>
          <ShieldAlert style={{ width: 24, height: 24, color: "#EF4444" }} />
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
          Authentication Error
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
          {message}
        </p>
        {process.env.NODE_ENV !== "production" && (
          <p style={{ marginTop: 8, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            Error code: <code style={{ color: "#EF4444" }}>{error}</code>
          </p>
        )}
      </div>

      <Link
        href="/login"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "13px 24px", fontSize: 14, fontWeight: 700, color: "#fff",
          background: "linear-gradient(135deg,#2E7D32,#4CAF50)",
          textDecoration: "none",
          boxShadow: "0 4px 20px rgba(46,125,50,0.4)",
        }}
      >
        Back to Sign In
      </Link>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={null}>
      <AuthErrorContent />
    </Suspense>
  );
}
