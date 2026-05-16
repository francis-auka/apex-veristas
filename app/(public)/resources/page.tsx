import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Video, BookOpen, Download, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources | Apex Veritas HSEQ",
  description: "Free HSEQ guides, whitepapers, toolkits, and webinar recordings to help you build a safer, more compliant organisation.",
};

const RESOURCES = [
  {
    type: "Guide",
    icon: BookOpen,
    color: "#2E7D32",
    title: "Getting Started with ISO 45001",
    desc: "A practical, jargon-free roadmap for implementing an OH&S management system — whether you are starting from scratch or upgrading from OHSAS 18001.",
    tags: ["ISO 45001", "All Industries"],
    action: "Download Free",
    href: "/register",
  },
  {
    type: "Whitepaper",
    icon: FileText,
    color: "#6366F1",
    title: "HSEQ in East Africa: The Compliance Gap Report 2025",
    desc: "Our annual survey of 250 companies in Kenya reveals the most common compliance failures, audit findings, and the cost of non-compliance.",
    tags: ["Kenya", "Research"],
    action: "Download Free",
    href: "/register",
  },
  {
    type: "Toolkit",
    icon: Download,
    color: "#F59E0B",
    title: "Incident Investigation Toolkit",
    desc: "Includes a 5-Why analysis template, a RIDDOR-compatible report form, corrective action register, and an investigation interview checklist.",
    tags: ["Incidents", "Templates"],
    action: "Download Free",
    href: "/register",
  },
  {
    type: "Webinar",
    icon: Video,
    color: "#EF4444",
    title: "OSHAD-SF Explained: What UAE Businesses Must Know",
    desc: "A 45-minute recorded session walking through key requirements of the Abu Dhabi Occupational Health & Safety framework and common compliance pitfalls.",
    tags: ["UAE", "OSHAD"],
    action: "Watch Recording",
    href: "/register",
  },
  {
    type: "Guide",
    icon: BookOpen,
    color: "#1B2A4A",
    title: "Building a Training Matrix from Scratch",
    desc: "Step-by-step instructions for mapping mandatory training to roles, managing certifications, and handling expiry — with a downloadable Excel template.",
    tags: ["Training", "HR"],
    action: "Download Free",
    href: "/register",
  },
  {
    type: "Whitepaper",
    icon: FileText,
    color: "#10B981",
    title: "The ROI of Virtual HSEQ Consulting",
    desc: "How companies in Kenya and UAE are cutting HSEQ staffing costs by 40–60% while improving compliance scores using virtual consultant models.",
    tags: ["Strategy", "ROI"],
    action: "Download Free",
    href: "/register",
  },
];

const CATEGORIES = ["All", "Guides", "Whitepapers", "Toolkits", "Webinars"];

export default function ResourcesPage() {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section className="section-responsive" style={{ background: "#1B2A4A" }}>
        <div className="container-xl" style={{ textAlign: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", padding: "4px 14px", marginBottom: 20,
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
            background: "rgba(76,175,80,0.12)", color: "#66BB6A", borderLeft: "3px solid #2E7D32",
          }}>Resources</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>
            Free tools to build a<br />safer organisation.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 540, margin: "0 auto" }}>
            Practical guides, investigation toolkits, regulatory explainers, and recorded webinars — all free, no strings attached.
          </p>
        </div>
      </section>

      {/* Filter tabs - visual only */}
      <section style={{ background: "#fff", borderBottom: "1px solid #F3F4F6", overflowX: "auto" }}>
        <div className="container-xl" style={{ display: "flex", gap: 0, minWidth: "max-content" }}>
          {CATEGORIES.map((c, i) => (
            <span key={c} style={{
              padding: "14px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
              borderBottom: i === 0 ? "2px solid #2E7D32" : "2px solid transparent",
              color: i === 0 ? "#2E7D32" : "#6B7280",
            }}>{c}</span>
          ))}
        </div>
      </section>

      {/* Resource Cards */}
      <section className="section-responsive" style={{ background: "#F5F7FA" }}>
        <div className="container-xl">
          <div className="responsive-grid responsive-grid-2 responsive-grid-3" style={{ gap: 2, background: "rgba(27,42,74,0.06)" }}>
            {RESOURCES.map((r) => (
              <div key={r.title} style={{ background: "#fff", padding: 32, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: `${r.color}12` }}>
                    <r.icon style={{ width: 16, height: 16, color: r.color }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: r.color }}>{r.type}</span>
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1B2A4A", marginBottom: 10, lineHeight: 1.4 }}>{r.title}</h2>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, flex: 1, marginBottom: 20 }}>{r.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                  {r.tags.map((t) => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", background: "#F5F7FA", color: "#1B2A4A", border: "1px solid #E5E7EB" }}>{t}</span>
                  ))}
                </div>
                <Link href={r.href} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: r.color, textDecoration: "none" }}>
                  {r.action} <ArrowRight style={{ width: 14, height: 14 }} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-responsive" style={{ background: "#fff" }}>
        <div className="container-xl" style={{ maxWidth: 640, textAlign: "center" }}>
          <BookOpen style={{ width: 40, height: 40, color: "#2E7D32", margin: "0 auto 16px" }} />
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#1B2A4A", marginBottom: 10 }}>Get new resources first</h2>
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 28 }}>Practical HSEQ content, released monthly. No spam. Unsubscribe anytime.</p>
          <form style={{ display: "flex", flexWrap: "wrap", gap: 0, maxWidth: 480, margin: "0 auto" }}>
            <input
              type="email"
              placeholder="you@company.com"
              style={{ flex: 1, padding: "12px 16px", minWidth: 200, fontSize: 14, border: "1px solid #D1D5DB", outline: "none", color: "#1A1A2E" }}
            />
            <Link href="/register" className="btn-primary" style={{ fontSize: 13, padding: "12px 20px", whiteSpace: "nowrap", flexGrow: 1, justifyContent: "center" }}>
              Subscribe
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}
