import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Globe, AlertCircle, CheckCircle2, Clock, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance Hub | Apex Veritas HSEQ",
  description: "Stay up to date with HSEQ regulatory frameworks for Kenya (OSHA, NEMA, DOSH) and UAE (OSHAD, DEWA, Trakhees). Your compliance reference library.",
};

const REGULATIONS = [
  {
    country: "Kenya",
    flag: "🇰🇪",
    color: "#2E7D32",
    frameworks: [
      { name: "OSHA 2007", body: "DOSH", scope: "Occupational Safety & Health — all employers" },
      { name: "EMCA 1999 & NEMA", body: "NEMA", scope: "Environmental management & compliance" },
      { name: "Work Injury Benefits Act", body: "DOSH / WIBA", scope: "Worker injury compensation" },
      { name: "ISO 45001:2018", body: "International", scope: "OH&S management systems" },
      { name: "ISO 14001:2015", body: "International", scope: "Environmental management systems" },
      { name: "Public Health Act", body: "Ministry of Health", scope: "Workplace health & sanitation" },
    ],
  },
  {
    country: "United Arab Emirates",
    flag: "🇦🇪",
    color: "#1B2A4A",
    frameworks: [
      { name: "OSHAD-SF", body: "Abu Dhabi OHS Centre", scope: "AD Emirate OHS framework — all sectors" },
      { name: "Dubai OHS Law No. 8/2015", body: "Dubai Municipality", scope: "OHS in Dubai Emirate" },
      { name: "Trakhees Regulations", body: "Ports, Customs & Free Zone Corp", scope: "Free zone construction & operations" },
      { name: "Federal Law No. 8/1980", body: "Ministry of HR", scope: "UAE Labour Law — worker rights" },
      { name: "ISO 45001:2018", body: "International", scope: "OH&S management systems" },
      { name: "MARPOL / IMO", body: "International", scope: "Marine pollution & port operations" },
    ],
  },
];

const UPDATES = [
  { date: "May 2026", country: "🇰🇪", title: "DOSH issues updated noise & vibration exposure limits", tag: "Kenya · Industrial" },
  { date: "Apr 2026", country: "🇦🇪", title: "OSHAD-SF Version 3.2 — Heat stress chapter revised", tag: "UAE · Construction" },
  { date: "Mar 2026", country: "🇰🇪", title: "NEMA publishes new EIA regulation amendments", tag: "Kenya · Environmental" },
  { date: "Feb 2026", country: "🇦🇪", title: "Dubai DM updates food safety inspection protocols", tag: "UAE · F&B" },
  { date: "Jan 2026", country: "🇰🇪", title: "Work Injury Benefits Act — new claim timelines effective", tag: "Kenya · All Sectors" },
];

export default function ComplianceHubPage() {
  return (
    <div style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: "#1B2A4A", padding: "80px 0" }}>
        <div className="container-xl" style={{ textAlign: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", padding: "4px 14px", marginBottom: 20,
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
            background: "rgba(76,175,80,0.12)", color: "#66BB6A", borderLeft: "3px solid #2E7D32",
          }}>Compliance Hub</span>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>
            Know your regulations.<br />Before the regulator does.
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 580, margin: "0 auto" }}>
            A continuously updated reference library covering HSEQ frameworks for Kenya and the UAE — built into your Apex Veritas subscription.
          </p>
        </div>
      </section>

      {/* Regulatory Frameworks */}
      <section className="section" style={{ background: "#F5F7FA" }}>
        <div className="container-xl">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="heading-section">Supported Regulatory Frameworks</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(480px,1fr))", gap: 2, background: "rgba(27,42,74,0.06)" }}>
            {REGULATIONS.map((r) => (
              <div key={r.country} style={{ background: "#fff", padding: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: `2px solid ${r.color}` }}>
                  <span style={{ fontSize: 28 }}>{r.flag}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#1B2A4A" }}>{r.country}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>{r.frameworks.length} Frameworks</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {r.frameworks.map((f) => (
                    <div key={f.name} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", background: "#F9FAFB", borderLeft: `3px solid ${r.color}` }}>
                      <CheckCircle2 style={{ width: 15, height: 15, color: r.color, marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A" }}>{f.name} <span style={{ fontWeight: 400, color: "#9CA3AF" }}>· {f.body}</span></div>
                        <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{f.scope}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Updates */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container-xl" style={{ maxWidth: 800 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1B2A4A" }}>Recent Regulatory Updates</h2>
            <span style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>Updated monthly</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "rgba(27,42,74,0.06)" }}>
            {UPDATES.map((u) => (
              <div key={u.title} style={{ background: "#fff", padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ minWidth: 60, textAlign: "center" }}>
                  <div style={{ fontSize: 20 }}>{u.country}</div>
                  <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>{u.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1B2A4A", marginBottom: 4 }}>{u.title}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#2E7D32", background: "rgba(46,125,50,0.08)", padding: "2px 8px", borderLeft: "2px solid #2E7D32" }}>{u.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: "#9CA3AF", textAlign: "center" }}>Platform subscribers get real-time alerts when regulations affecting their industry change.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1B2A4A", padding: "80px 0", textAlign: "center" }}>
        <div className="container-xl">
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Stay ahead of every regulatory change</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 32 }}>Platform subscribers receive automated alerts when their regulations are updated.</p>
          <Link href="/register" className="btn-primary" style={{ fontSize: 14, padding: "14px 32px" }}>
            Get Full Access <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
