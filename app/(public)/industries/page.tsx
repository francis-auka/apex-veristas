import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Droplets, Building2, Truck, Factory, Zap, TreePine, Ship } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries We Serve | Apex Veritas HSEQ",
  description: "Apex Veritas delivers Virtual HSEQ compliance for Oil & Gas, Construction, Manufacturing, Logistics, and more across the globe.",
};

const INDUSTRIES = [
  {
    icon: Flame,
    color: "#EF4444",
    title: "Oil & Gas",
    region: "Worldwide · Kenya roots",
    desc: "HSEQ compliance for upstream, midstream, and downstream operations. Manage SIMOPS, PTW, and contractor safety across multiple sites.",
    standards: ["OSHA 1910/1926", "ISO 45001", "NEMA Kenya", "UAE Federal"],
    stat: "43% of our clients",
  },
  {
    icon: Building2,
    color: "#6366F1",
    title: "Construction",
    region: "Worldwide · Kenya roots",
    desc: "Site safety management, incident reporting, and subcontractor compliance tracking for projects of any scale.",
    standards: ["OSHA Construction", "NCA Kenya", "Trakhees UAE", "ISO 45001"],
    stat: "Project-based billing",
  },
  {
    icon: Factory,
    color: "#F59E0B",
    title: "Manufacturing",
    region: "Worldwide · Kenya roots",
    desc: "Worker safety, chemical management, machine guarding, and environmental compliance rolled into one platform.",
    standards: ["ISO 45001", "ISO 14001", "NEMA Kenya", "EAD Abu Dhabi"],
    stat: "Reduce incidents by 60%",
  },
  {
    icon: Truck,
    color: "#2E7D32",
    title: "Logistics & Transport",
    region: "Kenya · UAE",
    desc: "Fleet safety programs, driver training matrices, and incident tracking for road and freight operations.",
    standards: ["NTSA Kenya", "RTA Dubai", "ISO 39001", "OHSAS"],
    stat: "Fleet-wide visibility",
  },
  {
    icon: Droplets,
    color: "#1B2A4A",
    title: "Water & Utilities",
    region: "Kenya",
    desc: "Environmental compliance, chemical handling SOPs, and regulatory reporting for water treatment and utility operations.",
    standards: ["NEMA Kenya", "Water Act", "ISO 14001", "ISO 45001"],
    stat: "Regulatory reporting",
  },
  {
    icon: Zap,
    color: "#8B5CF6",
    title: "Energy & Power",
    region: "Kenya · UAE",
    desc: "Electrical safety, renewable energy site management, and environmental impact tracking for power generation facilities.",
    standards: ["ERC Kenya", "DEWA UAE", "IEC Standards", "ISO 14001"],
    stat: "Grid-to-site coverage",
  },
  {
    icon: TreePine,
    color: "#10B981",
    title: "Agriculture & Forestry",
    region: "Kenya",
    desc: "Agrochemical handling, worker welfare, and environmental stewardship compliance for commercial farms and exporters.",
    standards: ["NEMA Kenya", "Global G.A.P", "ISO 14001", "KFC Standards"],
    stat: "Export-ready compliance",
  },
  {
    icon: Ship,
    color: "#0EA5E9",
    title: "Marine & Ports",
    region: "UAE · Kenya",
    desc: "Port safety management, vessel inspections, and MARPOL compliance tracking for maritime operations.",
    standards: ["MARPOL", "ISM Code", "KPA Kenya", "Maqta UAE"],
    stat: "Port authority ready",
  },
];

export default function IndustriesPage() {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section className="section-responsive" style={{ background: "#1B2A4A" }}>
        <div className="container-xl" style={{ textAlign: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", padding: "4px 14px", marginBottom: 20,
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
            background: "rgba(76,175,80,0.12)", color: "#66BB6A", borderLeft: "3px solid #2E7D32",
          }}>Industries</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>
            Built for your industry,<br />not a generic template.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto" }}>
            Pre-loaded with the regulations, standards, and workflows that matter most in your sector — in Kenya and the UAE.
          </p>
        </div>
      </section>

      {/* Industry relevance */}
      <section className="section-responsive bg-brand-navy" style={{ background: "#F5F7FA" }}>
        <div className="container-xl text-center">
          <h2 className="heading-section mb-12">Built for global high-stakes industries</h2>
          <div className="responsive-grid responsive-grid-2 responsive-grid-4" style={{ gap: 2, background: "rgba(27,42,74,0.06)" }}>
            {INDUSTRIES.map((ind) => (
              <div key={ind.title} style={{ background: "#fff", padding: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", background: `${ind.color}12` }}>
                    <ind.icon style={{ width: 20, height: 20, color: ind.color }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em" }}>{ind.region}</span>
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: "#1B2A4A", marginBottom: 8 }}>{ind.title}</h2>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, marginBottom: 16 }}>{ind.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {ind.standards.map((s) => (
                    <span key={s} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", background: "#F5F7FA", color: "#1B2A4A", border: "1px solid #E5E7EB" }}>{s}</span>
                  ))}
                </div>
                <div style={{ borderLeft: `3px solid ${ind.color}`, paddingLeft: 10, fontSize: 12, fontWeight: 700, color: ind.color }}>{ind.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-responsive" style={{ background: "#1B2A4A", textAlign: "center" }}>
        <div className="container-xl">
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Don&apos;t see your industry?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 32 }}>We&apos;re constantly expanding. Talk to us — we can likely configure a solution for you.</p>
          <Link href="/contact" className="btn-primary" style={{ fontSize: 14, padding: "14px 32px" }}>
            Contact Our Team <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
