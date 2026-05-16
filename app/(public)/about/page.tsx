import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Globe, Users, Target, Award, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Apex Veritas | Virtual HSEQ Solutions",
  description: "Apex Veritas is a Virtual HSEQ consulting firm headquartered in Nairobi, Kenya, serving clients across East Africa and the UAE. Safety Without Borders.",
};

const VALUES = [
  { icon: Shield, color: "#2E7D32", title: "Zero Compromise", desc: "Safety is non-negotiable. We build systems that organisations can truly rely on when it matters most." },
  { icon: Globe, color: "#1B2A4A", title: "Borderless Compliance", desc: "One platform. Two jurisdictions. Built with the regulatory nuances of Kenya and the UAE hardwired in." },
  { icon: Zap, color: "#F59E0B", title: "Practical Over Perfect", desc: "HSEQ documentation should enable operations, not slow them down. We design for real-world use." },
  { icon: Users, color: "#6366F1", title: "Relationships First", desc: "We are not a software vendor. We are your virtual HSEQ partner — with consultants available when you need them." },
];

const STATS = [
  { number: "500+", label: "Companies Served" },
  { number: "12", label: "Industries Covered" },
  { number: "2", label: "Countries: Kenya & UAE" },
  { number: "98%", label: "Client Retention Rate" },
];

const TEAM = [
  {
    name: "Boniface Kariuki",
    role: "Founder & Lead HSEQ Consultant",
    bio: "15+ years in occupational health and safety across oil & gas, construction, and manufacturing in East Africa and the Gulf.",
    initials: "BK",
    color: "#2E7D32",
  },
  {
    name: "Amina Hassan",
    role: "UAE Compliance Director",
    bio: "OSHAD certified with 10 years guiding UAE-based businesses through Abu Dhabi and Dubai regulatory frameworks.",
    initials: "AH",
    color: "#1B2A4A",
  },
  {
    name: "David Ochieng",
    role: "Environmental Systems Lead",
    bio: "ISO 14001 Lead Auditor and NEMA ERoD specialist with deep experience in environmental impact assessment and management.",
    initials: "DO",
    color: "#6366F1",
  },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section className="section-responsive" style={{ background: "#1B2A4A" }}>
        <div className="container-xl">
          <div style={{ maxWidth: 680 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", padding: "4px 14px", marginBottom: 20,
              fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
              background: "rgba(76,175,80,0.12)", color: "#66BB6A", borderLeft: "3px solid #2E7D32",
            }}>About Us</span>
            <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: "#fff", marginBottom: 20, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              We believe safety expertise should be accessible to every organisation.
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
              Apex Veritas was founded in Nairobi with a simple premise: that companies in Kenya and the UAE deserve world-class HSEQ support — without the overhead of a full-time in-house team. We combine deep regulatory expertise with modern technology to deliver compliance that&apos;s real, practical, and always on.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#2E7D32", padding: "2rem 0" }}>
        <div className="container-xl">
          <div className="responsive-grid responsive-grid-2 responsive-grid-4" style={{ gap: 2, background: "rgba(0,0,0,0.1)" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: "#2E7D32", padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>{s.number}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-responsive" style={{ background: "#fff" }}>
        <div className="container-xl" style={{ maxWidth: 820 }}>
          <div className="responsive-grid responsive-grid-2" style={{ gap: 60, alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1B2A4A", marginBottom: 16 }}>Our Story</h2>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, marginBottom: 16 }}>
                Apex Veritas began as a traditional HSEQ consulting practice in 2018, serving construction and oil & gas companies across Kenya. We quickly noticed a gap: our clients needed compliance systems that were both rigorous and affordable — and nothing on the market was built for the East African or Gulf context.
              </p>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, marginBottom: 16 }}>
                In 2022, we launched our digital platform — combining our institutional knowledge of DOSH, NEMA, OSHAD-SF, and Dubai regulations with software that automates the repetitive compliance work, so organisations can focus on what matters: keeping their people safe.
              </p>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75 }}>
                Today, Apex Veritas serves over 500 companies, with offices in Nairobi and Dubai.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "rgba(27,42,74,0.06)" }}>
              {[
                { year: "2018", event: "Founded in Nairobi as an HSEQ consulting practice" },
                { year: "2020", event: "Expanded into UAE market with OSHAD-SF consultancy" },
                { year: "2022", event: "Launched Apex Veritas digital compliance platform" },
                { year: "2024", event: "Crossed 500 clients across 12 industries" },
                { year: "2025", event: "ISO 45001 certification for our own operations" },
              ].map((e) => (
                <div key={e.year} style={{ background: "#fff", padding: "16px 20px", display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#2E7D32", minWidth: 40 }}>{e.year}</span>
                  <span style={{ fontSize: 13, color: "#374151" }}>{e.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-responsive" style={{ background: "#F5F7FA" }}>
        <div className="container-xl">
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1B2A4A", textAlign: "center", marginBottom: 48 }}>What We Stand For</h2>
          <div className="responsive-grid responsive-grid-2 responsive-grid-4" style={{ gap: 2, background: "rgba(27,42,74,0.06)" }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ background: "#fff", padding: 32 }}>
                <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: `${v.color}12`, marginBottom: 16 }}>
                  <v.icon style={{ width: 20, height: 20, color: v.color }} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1B2A4A", marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container-xl">
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1B2A4A", textAlign: "center", marginBottom: 48 }}>Our Leadership Team</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2, background: "rgba(27,42,74,0.06)", maxWidth: 900, margin: "0 auto" }}>
            {TEAM.map((m) => (
              <div key={m.name} style={{ background: "#fff", padding: 32 }}>
                <div style={{
                  width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center",
                  background: m.color, color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 16,
                }}>{m.initials}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1B2A4A", marginBottom: 4 }}>{m.name}</h3>
                <p style={{ fontSize: 11, fontWeight: 700, color: m.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>{m.role}</p>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-responsive" style={{ background: "#1B2A4A", textAlign: "center" }}>
        <div className="container-xl">
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Let&apos;s make your organisation safer.</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 32 }}>Start with a free trial or talk directly to our team.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" className="btn-primary" style={{ fontSize: 14, padding: "14px 32px" }}>Start Free Trial</Link>
            <Link href="/contact" className="btn-outline" style={{ fontSize: 14, padding: "14px 32px", borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
