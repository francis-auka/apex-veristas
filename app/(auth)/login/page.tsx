"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl") ?? "/portal";

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email: email.toLowerCase(), password, redirect: false, callbackUrl });
    setLoading(false);
    if (res?.error) {
      setError(res.error === "CredentialsSignin" ? "Incorrect email or password." : res.error);
    } else if (res?.ok) {
      router.push(callbackUrl);
      router.refresh();
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
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{
          width: 44, height: 44, margin: "0 auto 16px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg,#2E7D32,#4CAF50)",
        }}>
          <ShieldCheck style={{ width: 22, height: 22, color: "#fff" }} />
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Welcome back</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Sign in to Apex Veritas</p>
      </div>

      {error && (
        <div style={{
          marginBottom: 20, padding: 14,
          background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.3)",
          borderLeft: "3px solid #EF4444",
          fontSize: 13, color: "#FCA5A5",
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Email */}
        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@company.com"
            style={{
              width: "100%", padding: "12px 14px", fontSize: 14,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#fff", outline: "none",
            }}
          />
        </div>

        {/* Password */}
        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={{
                width: "100%", padding: "12px 44px 12px 14px", fontSize: 14,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff", outline: "none",
              }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1} style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", padding: 4,
            }}>
              {showPass
                ? <EyeOff style={{ width: 16, height: 16, color: "rgba(255,255,255,0.4)" }} />
                : <Eye    style={{ width: 16, height: 16, color: "rgba(255,255,255,0.4)" }} />
              }
            </button>
          </div>
          <div style={{ marginTop: 8, textAlign: "right" }}>
            <Link href="/forgot-password" style={{ fontSize: 12, color: "#66BB6A", textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "14px 24px", fontSize: 14, fontWeight: 700, color: "#fff",
            background: loading ? "rgba(46,125,50,0.6)" : "linear-gradient(135deg,#2E7D32,#4CAF50)",
            border: "none", cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 20px rgba(46,125,50,0.4)",
            transition: "all 0.15s",
          }}
        >
          {loading && <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />}
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p style={{ marginTop: 24, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
        Don&apos;t have an account?{" "}
        <Link href="/register" style={{ fontWeight: 700, color: "#66BB6A", textDecoration: "none" }}>
          Get started free
        </Link>
      </p>
    </div>
  );
}
