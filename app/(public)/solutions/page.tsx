import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, AlertTriangle, GraduationCap, BarChart2, ClipboardList, Users, Globe, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "HSEQ Solutions | Apex Veritas",
  description: "End-to-end Virtual HSEQ compliance solutions — compliance management, incident reporting, audit scheduling, training matrix and more.",
};

const SOLUTIONS = [
  {
    icon: ShieldCheck,
    color: "#2E7D32",
    bg: "rgba(46,125,50,0.08)",
    title: "Compliance Management",
    desc: "Track regulatory obligations across ISO 45001, ISO 14001, OSHA, NEMA, and more. Automated alerts keep your team ahead of deadlines.",
    features: ["Regulation library (Global & Local)", "Deadline tracking & alerts", "Evidence repository", "Compliance scoring"],
    href: "/register",
  },
  {
    icon: AlertTriangle,
    color: "#EF4444",
    bg: "rgba(239,68,68,0.08)",
    title: "Incident Reporting",
    desc: "Capture, investigate, and close incidents in real time. Structured workflows ensure nothing falls through the cracks.",
    features: ["Multi-severity classification", "Root cause analysis", "Corrective action tracking", "RIDDOR-ready reports"],
    href: "/register",
  },
  {
    icon: ClipboardList,
    color: "#6366F1",
    bg: "rgba(99,102,241,0.08)",
    title: "Audit Management",
    desc: "Plan, conduct, and close audits with digital checklists. Schedule recurring audits and track findings to resolution.",
    features: ["Digital audit templates", "Finding & non-conformance tracking", "Recurring schedule management", "Audit score dashboards"],
    href: "/register",
  },
  {
    icon: GraduationCap,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    title: "Training Matrix",
    desc: "Map mandatory training requirements to every role. Track completions, pass rates, and expiry dates across your workforce.",
    features: ["Role-based competency mapping", "Course completion tracking", "Certificate expiry alerts", "Bulk staff import"],
    href: "/register",
  },
  {
    icon: FileText,
    color: "#1B2A4A",
    bg: "rgba(27,42,74,0.08)",
    title: "Document Control",
    desc: "Centralise all HSEQ documentation. Version-controlled, searchable, and accessible from anywhere in the world.",
    features: ["Version control & audit trail", "Category-based organisation", "Expiry date management", "Secure cloud storage"],
    href: "/register",
  },
  {
    icon: BarChart2,
    color: "#4CAF50",
    bg: "rgba(76,175,80,0.08)",
    title: "Analytics & Reporting",
    desc: "Board-ready dashboards and scheduled reports that turn HSEQ data into executive insights.",
    features: ["Real-time compliance score", "Trend analysis", "Custom report builder", "Automated monthly reports"],
    href: "/register",
  },
];

export default function SolutionsPage() {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section className="section-responsive" style={{ background: "#1B2A4A" }}>
        <div className="container-xl" style={{ textAlign: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", padding: "4px 14px", marginBottom: 20,
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
            background: "rgba(76,175,80,0.12)", color: "#66BB6A", borderLeft: "3px solid #2E7D32",
          }}>Our Solutions</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>
            Every HSEQ function.<br />One unified platform.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto 36px" }}>
            Replace fragmented spreadsheets, email trails, and paper registers with a single, audit-ready system built for Africa and the Gulf.
          </p>
          <Link href="/register" className="btn-primary" style={{ fontSize: 14, padding: "14px 32px" }}>
            Start Free Trial <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </section>

      {/* Industry relevance */}
      <section className="section-responsive bg-brand-navy" style={{ background: "#F5F7FA" }}>
        <div className="container-xl text-center">
          <h2 className="heading-section mb-12">Built for global high-stakes industries</h2>
          <div className="responsive-grid responsive-grid-2 responsive-grid-3" style={{ gap: 2, background: "rgba(27,42,74,0.06)" }}>
            {SOLUTIONS.map((s) => (
              <div key={s.title} style={{ background: "#fff", padding: 36, display: "flex", flexDirection: "column" }}>
                <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: s.bg, marginBottom: 20 }}>
                  <s.icon style={{ width: 22, height: 22, color: s.color }} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#1B2A4A", marginBottom: 10 }}>{s.title}</h2>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65, marginBottom: 20, flex: 1 }}>{s.desc}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  {s.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#374151" }}>
                      <span style={{ width: 5, height: 5, background: s.color, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={s.href} style={{ fontSize: 13, fontWeight: 700, color: s.color, display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                  Get started <ArrowRight style={{ width: 14, height: 14 }} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-responsive" style={{ background: "#1B2A4A", textAlign: "center" }}>
        <div className="container-xl">
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Ready to consolidate your HSEQ operations?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 32 }}>14-day free trial. No credit card required.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" className="btn-primary" style={{ fontSize: 14, padding: "14px 32px" }}>Start Free Trial</Link>
            <Link href="/contact" className="btn-outline" style={{ fontSize: 14, padding: "14px 32px", borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>Talk to Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
