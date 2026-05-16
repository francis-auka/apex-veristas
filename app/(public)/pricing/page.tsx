import type { Metadata } from "next";
import Link from "next/link";
import { PRICING_PLANS } from "@/constants/plans";
import { Check, X, ArrowRight, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | Apex Veritas HSEQ Platform",
  description: "Simple, transparent pricing for virtual HSEQ compliance. Start free, scale as you grow. Plans for Kenya (KES) and UAE (AED).",
};

export default function PricingPage() {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section className="section-responsive" style={{ background: "#1B2A4A" }}>
        <div style={{ height: 4, background: "linear-gradient(90deg,#2E7D32,#4CAF50,#66BB6A)", position: "absolute", top: 0, left: 0, right: 0 }} />
        <div className="container-xl" style={{ textAlign: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", padding: "4px 14px", marginBottom: 20,
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
            background: "rgba(76,175,80,0.12)", color: "#66BB6A", borderLeft: "3px solid #2E7D32",
          }}>Simple Pricing</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>
            One platform, every HSEQ need
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 520, margin: "0 auto 32px" }}>
            No hidden fees. Cancel anytime. All plans include Kenya & UAE regulation libraries.
          </p>
          {/* Currency bar */}
          <div style={{ display: "inline-flex", border: "1px solid rgba(255,255,255,0.15)", overflowX: "auto", maxWidth: "100%" }}>
            {["KES", "AED", "USD"].map((c, i) => (
              <span key={c} style={{
                padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                background: i === 0 ? "rgba(46,125,50,0.3)" : "transparent",
                color: i === 0 ? "#fff" : "rgba(255,255,255,0.5)",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.12)" : "none",
                whiteSpace: "nowrap",
              }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-responsive" style={{ background: "#F5F7FA", marginTop: -1 }}>
        <div className="container-xl">
          <div className="responsive-grid responsive-grid-2 responsive-grid-3" style={{ gap: 1, background: "rgba(27,42,74,0.08)" }}>
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                style={{
                  background: plan.highlighted ? "#1B2A4A" : "#fff",
                  padding: 40,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: -1, left: 0, right: 0,
                    padding: "6px 0", textAlign: "center", fontSize: 11, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    background: "linear-gradient(90deg,#2E7D32,#4CAF50)", color: "#fff",
                  }}>{plan.badge}</div>
                )}

                <div style={{ marginTop: plan.badge ? 28 : 0, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Zap style={{ width: 15, height: 15, color: plan.highlighted ? "#66BB6A" : "#2E7D32" }} />
                    <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: plan.highlighted ? "#66BB6A" : "#2E7D32" }}>
                      {plan.name}
                    </span>
                  </div>
                   <div style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: 42, fontWeight: 900, color: plan.highlighted ? "#fff" : "#1B2A4A", letterSpacing: "-0.03em" }}>
                      {(plan.price.KES as number) === 0 ? "Free" : `KES ${plan.price.KES.toLocaleString()}`}
                    </span>
                    {(plan.price.KES as number) > 0 && (
                      <span style={{ fontSize: 13, color: plan.highlighted ? "rgba(255,255,255,0.5)" : "#9CA3AF", marginLeft: 6 }}>/ month</span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: plan.highlighted ? "rgba(255,255,255,0.6)" : "#6B7280", lineHeight: 1.55 }}>
                    {plan.description}
                  </p>
                </div>

                <Link
                  href={(plan.price.KES as number) === 0 ? "/register" : `/register?plan=${plan.id}`}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: "14px 24px", fontWeight: 700, fontSize: 14,
                    background: plan.highlighted ? "linear-gradient(135deg,#2E7D32,#4CAF50)" : "transparent",
                    color: plan.highlighted ? "#fff" : "#2E7D32",
                    border: plan.highlighted ? "none" : "2px solid #2E7D32",
                    boxShadow: plan.highlighted ? "0 6px 24px rgba(46,125,50,0.45)" : "none",
                    textDecoration: "none",
                    marginBottom: 28,
                  }}
                >
                  {plan.cta} <ArrowRight style={{ width: 16, height: 16 }} />
                </Link>

                {/* Divider */}
                <div style={{ height: 1, background: plan.highlighted ? "rgba(255,255,255,0.1)" : "#F3F4F6", marginBottom: 24 }} />

                {/* Features */}
                <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map((f: any) => (
                    <li key={f.label} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      {f.included
                        ? <Check style={{ width: 14, height: 14, color: "#2E7D32", marginTop: 2, flexShrink: 0 }} />
                        : <X     style={{ width: 14, height: 14, color: "#D1D5DB", marginTop: 2, flexShrink: 0 }} />
                      }
                      <span style={{ fontSize: 13, color: plan.highlighted ? (f.included ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)") : (f.included ? "#1A1A2E" : "#D1D5DB") }}>
                        {f.label}
                        {f.limit && <span style={{ marginLeft: 4, fontSize: 11, color: plan.highlighted ? "rgba(255,255,255,0.4)" : "#9CA3AF" }}>({f.limit})</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="section-responsive" style={{ background: "#fff" }}>
        <div className="container-xl" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1B2A4A", marginBottom: 40, textAlign: "center" }}>
            Frequently asked questions
          </h2>
          {[
            ["Can I switch plans later?",  "Yes, you can upgrade or downgrade at any time. Changes are prorated and applied immediately."],
            ["Is there a free trial?",     "All plans come with a 14-day free trial. No credit card required to start."],
            ["What currencies are supported?","We support KES (Kenya), AED (UAE), and USD. Currency is set at account creation."],
            ["Can I add more users later?","Yes. Additional user seats can be purchased at any time from your billing settings."],
            ["Do you offer discounts?",    "Annual billing saves 20%. NGOs and government entities receive a 30% discount—contact us."],
          ].map(([q,a]) => (
            <div key={q} style={{ padding: "20px 0", borderBottom: "1px solid #F3F4F6" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1B2A4A", marginBottom: 6 }}>{q}</div>
              <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65 }}>{a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
