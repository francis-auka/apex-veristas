"use client";
import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Eye, EyeOff, Loader2, Check, Building2, UserCheck } from "lucide-react";

export default function RegisterPage() {
  const [step, setStep]       = useState(0); // 0 = role select, 1 = personal, 2 = details, 3 = success
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [showPass,setShowPass]= useState(false);

  const [registerType, setRegisterType] = useState<"client" | "professional">("client");
  const [form, setForm] = useState({
    firstName:   "",
    lastName:    "",
    email:       "",
    password:    "",
    companyName: "",
    country:     "Kenya",
    industry:    "",
    // Professional-specific
    title:       "",
    bio:         "",
    location:    "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 2) { setStep(step + 1); return; }

    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, registerType }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Registration failed");
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "11px 14px", fontSize: 14,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "#fff", outline: "none",
  };
  const selectStyle = {
    width: "100%", padding: "11px 14px", fontSize: 14,
    background: "#1B2A4A",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff", outline: "none", cursor: "pointer",
    appearance: "auto" as const,
  };
  const labelStyle = {
    display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700,
    color: "rgba(255,255,255,0.6)", textTransform: "uppercase" as const, letterSpacing: "0.07em",
  };

  const roleCardStyle = (isActive: boolean) => ({
    flex: 1,
    padding: "20px 16px",
    border: isActive ? "2px solid #4CAF50" : "1px solid rgba(255,255,255,0.12)",
    background: isActive ? "rgba(76,175,80,0.08)" : "rgba(255,255,255,0.03)",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center" as const,
  });

  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(20px)",
      padding: 40,
      boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 40, height: 40, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#2E7D32,#4CAF50)" }}>
          <ShieldCheck style={{ width: 20, height: 20, color: "#fff" }} />
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
          {step === 0 ? "How will you use Apex Veritas?" : "Create your account"}
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          {step === 0 ? "Choose how you want to get started" : "14-day free trial · No credit card"}
        </p>
      </div>

      {/* Step indicators */}
      {step > 0 && step < 3 && (
        <div style={{ display: "flex", gap: 4, marginBottom: 28 }}>
          {[1,2].map(s => (
            <div key={s} style={{ flex: 1, height: 3, background: s <= step ? "#2E7D32" : "rgba(255,255,255,0.12)", transition: "background 0.3s" }} />
          ))}
        </div>
      )}

      {/* Step 0: Role Selection */}
      {step === 0 && (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <button type="button" onClick={() => setRegisterType("client")} style={roleCardStyle(registerType === "client")}>
              <Building2 style={{ width: 28, height: 28, color: registerType === "client" ? "#4CAF50" : "rgba(255,255,255,0.3)", margin: "0 auto 10px", display: "block" }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>I need HSEQ services</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                Register your company to manage compliance, upload documents, and hire experts.
              </div>
            </button>
            <button type="button" onClick={() => setRegisterType("professional")} style={roleCardStyle(registerType === "professional")}>
              <UserCheck style={{ width: 28, height: 28, color: registerType === "professional" ? "#4CAF50" : "rgba(255,255,255,0.3)", margin: "0 auto 10px", display: "block" }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>I am an HSE Professional</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                Create your expert profile, upload credentials, and get hired by companies.
              </div>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "14px 24px", fontSize: 14, fontWeight: 700, color: "#fff",
              background: "linear-gradient(135deg,#2E7D32,#4CAF50)",
              border: "none", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(46,125,50,0.4)",
            }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Success */}
      {step === 3 ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ width: 56, height: 56, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(46,125,50,0.2)", border: "2px solid #2E7D32" }}>
            <Check style={{ width: 28, height: 28, color: "#4CAF50" }} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Account created!</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 24 }}>
            {registerType === "professional"
              ? "Your expert profile is being set up. Sign in to complete your profile and upload credentials."
              : "Check your email to verify your account, then sign in."
            }
          </p>
          <Link href="/login" className="btn-primary" style={{ display: "inline-flex", justifyContent: "center" }}>
            Go to Sign In
          </Link>
        </div>
      ) : step > 0 && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {error && (
            <div style={{ padding: 12, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderLeft: "3px solid #EF4444", fontSize: 13, color: "#FCA5A5" }}>
              {error}
            </div>
          )}

          {step === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>First name</label>
                  <input style={inputStyle} required value={form.firstName} onChange={update("firstName")} placeholder="James" />
                </div>
                <div>
                  <label style={labelStyle}>Last name</label>
                  <input style={inputStyle} required value={form.lastName}  onChange={update("lastName")}  placeholder="Mwangi" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" style={inputStyle} required value={form.email} onChange={update("email")} placeholder="you@company.com" />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPass ? "text" : "password"}
                    style={{ ...inputStyle, paddingRight: 44 }}
                    required minLength={8}
                    value={form.password} onChange={update("password")}
                    placeholder="Min. 8 characters"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer" }}>
                    {showPass
                      ? <EyeOff style={{ width: 15, height: 15, color: "rgba(255,255,255,0.4)" }} />
                      : <Eye    style={{ width: 15, height: 15, color: "rgba(255,255,255,0.4)" }} />
                    }
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 2 && registerType === "client" && (
            <>
              <div>
                <label style={labelStyle}>Company name</label>
                <input style={inputStyle} required value={form.companyName} onChange={update("companyName")} placeholder="Your Company Ltd." />
              </div>
              <div>
                <label style={labelStyle}>Country</label>
                <select style={selectStyle} value={form.country} onChange={update("country")}>
                  <option value="Kenya" style={{ background: "#1B2A4A", color: "#fff" }}>🇰🇪 Kenya</option>
                  <option value="UAE"   style={{ background: "#1B2A4A", color: "#fff" }}>🇦🇪 UAE</option>
                  <option value="Other" style={{ background: "#1B2A4A", color: "#fff" }}>🌍 Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Industry</label>
                <select style={selectStyle} value={form.industry} onChange={update("industry")} required>
                  <option value="" style={{ background: "#1B2A4A", color: "rgba(255,255,255,0.45)" }}>Select your industry…</option>
                  {["Construction","Oil & Gas","Manufacturing","Hospitality","Healthcare","Logistics & Transport","Education","Financial Services"].map(i => (
                    <option key={i} value={i} style={{ background: "#1B2A4A", color: "#fff" }}>{i}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === 2 && registerType === "professional" && (
            <>
              <div>
                <label style={labelStyle}>Professional Title</label>
                <input style={inputStyle} required value={form.title} onChange={update("title")} placeholder="e.g. Senior HSEQ Auditor" />
              </div>
              <div>
                <label style={labelStyle}>Location</label>
                <input style={inputStyle} required value={form.location} onChange={update("location")} placeholder="e.g. Nairobi, Kenya" />
              </div>
              <div>
                <label style={labelStyle}>Industry Expertise</label>
                <select style={selectStyle} value={form.industry} onChange={update("industry")} required>
                  <option value="" style={{ background: "#1B2A4A", color: "rgba(255,255,255,0.45)" }}>Select your specialisation…</option>
                  {["Construction","Oil & Gas","Manufacturing","Hospitality","Healthcare","Logistics & Transport","Education","Financial Services","General HSEQ"].map(i => (
                    <option key={i} value={i} style={{ background: "#1B2A4A", color: "#fff" }}>{i}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Short Bio</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 80, resize: "vertical" as const }}
                  value={form.bio} onChange={update("bio")}
                  placeholder="A brief overview of your experience and qualifications..."
                />
              </div>
            </>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  padding: "14px 20px", fontSize: 14, fontWeight: 600,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
                  color: "#fff", cursor: "pointer",
                }}
              >
                ← Back
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "14px 24px", fontSize: 14, fontWeight: 700, color: "#fff",
                background: "linear-gradient(135deg,#2E7D32,#4CAF50)",
                border: "none", cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 20px rgba(46,125,50,0.4)", opacity: loading ? 0.7 : 1,
              }}
            >
              {loading && <Loader2 style={{ width: 15, height: 15 }} className="animate-spin" />}
              {step === 1 ? "Continue →" : loading ? "Creating account…" : "Create Account"}
            </button>
          </div>
        </form>
      )}

      <p style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ fontWeight: 700, color: "#66BB6A", textDecoration: "none" }}>Sign in</Link>
      </p>
    </div>
  );
}
