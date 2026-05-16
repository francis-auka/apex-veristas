import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FileText, ClipboardList, AlertTriangle, GraduationCap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Free HSEQ Templates | Apex Veritas",
  description: "Download free HSEQ templates — incident report forms, audit checklists, permit to work, risk assessments, toolbox talk records and more.",
};

const TEMPLATES = [
  {
    icon: AlertTriangle,
    color: "#EF4444",
    title: "Incident Report Form",
    desc: "A structured incident reporting form covering initial details, classification, immediate actions, and preliminary investigation fields.",
    format: "PDF + Word",
    category: "Incidents",
    downloads: "2,840",
    href: "/register",
  },
  {
    icon: ClipboardList,
    color: "#6366F1",
    title: "Internal Audit Checklist",
    desc: "ISO 45001-aligned internal audit checklist covering all clause requirements. Suitable for manufacturing, construction, and oil & gas operations.",
    format: "Excel",
    category: "Audits",
    downloads: "1,960",
    href: "/register",
  },
  {
    icon: ShieldCheck,
    color: "#2E7D32",
    title: "Permit to Work Template",
    desc: "General PTW form with sections for hot work, confined space, electrical isolation, and working at height. Includes isolation certificate attachment.",
    format: "PDF + Excel",
    category: "Operations",
    downloads: "3,210",
    href: "/register",
  },
  {
    icon: FileText,
    color: "#F59E0B",
    title: "Risk Assessment (JHA/JSA)",
    desc: "Job Hazard / Job Safety Analysis template with hazard identification, severity & likelihood matrix, and control measure columns.",
    format: "Excel",
    category: "Risk",
    downloads: "4,150",
    href: "/register",
  },
  {
    icon: GraduationCap,
    color: "#8B5CF6",
    title: "Toolbox Talk Record",
    desc: "Daily toolbox talk attendance sheet with topic, date, presenter, and attendee sign-off. Available in English and Swahili.",
    format: "PDF + Word",
    category: "Training",
    downloads: "5,620",
    href: "/register",
  },
  {
    icon: FileText,
    color: "#1B2A4A",
    title: "Emergency Response Plan Template",
    desc: "Site-level emergency response plan covering fire, medical, chemical spill, and evacuation scenarios with assembly point diagrams.",
    format: "Word",
    category: "Emergency",
    downloads: "1,480",
    href: "/register",
  },
  {
    icon: ClipboardList,
    color: "#10B981",
    title: "Environmental Aspect & Impact Register",
    desc: "ISO 14001-aligned register for identifying environmental aspects, rating significance, and tracking control measures.",
    format: "Excel",
    category: "Environmental",
    downloads: "970",
    href: "/register",
  },
  {
    icon: ShieldCheck,
    color: "#0EA5E9",
    title: "New Employee Safety Induction Checklist",
    desc: "Comprehensive onboarding safety checklist covering site rules, emergency procedures, PPE requirements, and sign-off by supervisor.",
    format: "PDF",
    category: "HR",
    downloads: "2,100",
    href: "/register",
  },
];

export default function TemplatesPage() {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section className="section-responsive" style={{ background: "#1B2A4A" }}>
        <div className="container-xl" style={{ textAlign: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", padding: "4px 14px", marginBottom: 20,
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
            background: "rgba(76,175,80,0.12)", color: "#66BB6A", borderLeft: "3px solid #2E7D32",
          }}>Free Templates</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>
            Stop designing. Start complying.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 540, margin: "0 auto 32px" }}>
            Production-ready HSEQ templates used by 500+ companies across Kenya &amp; UAE — free to download, free to use.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {["22,000+ downloads", "PDF & Excel formats", "Kenya & UAE compliant"].map((s) => (
              <span key={s} style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 5, height: 5, background: "#2E7D32", display: "inline-block" }} />{s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="section-responsive" style={{ background: "#F5F7FA" }}>
        <div className="container-xl">
          <div className="responsive-grid responsive-grid-2 responsive-grid-4" style={{ gap: 2, background: "rgba(27,42,74,0.06)" }}>
            {TEMPLATES.map((t) => (
              <div key={t.title} style={{ background: "#fff", padding: 28, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: `${t.color}12` }}>
                    <t.icon style={{ width: 18, height: 18, color: t.color }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, background: "#F3F4F6", color: "#6B7280", padding: "3px 8px" }}>{t.category}</span>
                </div>
                <h2 style={{ fontSize: 15, fontWeight: 800, color: "#1B2A4A", marginBottom: 8, lineHeight: 1.4 }}>{t.title}</h2>
                <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.65, flex: 1, marginBottom: 16 }}>{t.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF" }}>{t.format}</span>
                    <span style={{ margin: "0 6px", color: "#E5E7EB" }}>·</span>
                    <span style={{ fontSize: 10, color: "#9CA3AF" }}>{t.downloads} downloads</span>
                  </div>
                  <Link href={t.href} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: t.color, textDecoration: "none" }}>
                    <Download style={{ width: 13, height: 13 }} /> Free Download
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform CTA */}
      <section className="section-responsive" style={{ background: "#1B2A4A", textAlign: "center" }}>
        <div className="container-xl">
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 12 }}>
            Use these templates inside the Apex Veritas platform
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", maxWidth: 500, margin: "0 auto 32px" }}>
            Platform subscribers get a full digital library — no printing, no lost files, with automatic version control and expiry alerts.
          </p>
          <Link href="/register" className="btn-primary" style={{ fontSize: 14, padding: "14px 32px" }}>
            Start Free Trial <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
