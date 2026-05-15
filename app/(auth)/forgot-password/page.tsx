"use client";
import type { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Loader2, Check } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/forgot-password", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setSent(true);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(20px)",
      padding: 40,
      boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
    }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 40, height: 40, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", background: sent ? "rgba(46,125,50,0.2)" : "linear-gradient(135deg,#2E7D32,#4CAF50)", border: sent ? "2px solid #2E7D32" : "none" }}>
          {sent ? <Check style={{ width: 20, height: 20, color: "#4CAF50" }} /> : <Mail style={{ width: 20, height: 20, color: "#fff" }} />}
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
          {sent ? "Check your inbox" : "Reset password"}
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          {sent ? `We sent a reset link to ${email}` : "Enter your email and we'll send a reset link"}
        </p>
      </div>

      {!sent && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {error && (
            <div style={{ padding: 12, background: "rgba(239,68,68,0.1)", borderLeft: "3px solid #EF4444", fontSize: 13, color: "#FCA5A5" }}>
              {error}
            </div>
          )}
          <div>
            <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              Email address
            </label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={{ width: "100%", padding: "12px 14px", fontSize: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff", outline: "none" }}
            />
          </div>
          <button
            type="submit" disabled={loading}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 24px", fontSize: 14, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#2E7D32,#4CAF50)", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(46,125,50,0.4)" }}
          >
            {loading && <Loader2 style={{ width: 15, height: 15 }} className="animate-spin" />}
            {loading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>
      )}

      <p style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
        <Link href="/login" style={{ color: "#66BB6A", textDecoration: "none", fontWeight: 600 }}>← Back to sign in</Link>
      </p>
    </div>
  );
}
