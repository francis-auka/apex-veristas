import Link from "next/link";
import { ShieldCheck, FolderOpen, ClipboardList, AlertTriangle, GraduationCap, Users, ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/constants/solutions";

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck, FolderOpen, ClipboardList, AlertTriangle, GraduationCap, Users,
};

export default function SolutionCards() {
  return (
    <section className="section-responsive" style={{ background: "#F5F7FA" }}>
      <div className="container-xl">
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <span className="badge-green" style={{ marginBottom: 16, display: "inline-flex" }}>Our Solutions</span>
          <h2 className="heading-section" style={{ marginBottom: 16 }}>
            Everything your HSEQ programme needs
          </h2>
          <p style={{ maxWidth: 560, margin: "0 auto", color: "#6B7280", lineHeight: 1.65 }}>
            Purpose-built modules for Health, Safety, Environment and Quality — all connected, 
            built for Kenya and UAE regulatory landscapes.
          </p>
        </div>

        <div className="responsive-grid responsive-grid-2 responsive-grid-3" style={{ gap: 1, background: "rgba(27,42,74,0.08)" }}>
          {SOLUTIONS.map((sol) => {
            const Icon = ICON_MAP[sol.icon] ?? ShieldCheck;
            return (
              <Link
                key={sol.slug}
                href={`/solutions/${sol.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#fff",
                  padding: 28,
                  transition: "all 0.2s",
                  borderBottom: "3px solid transparent",
                  textDecoration: "none",
                }}
                className="group hover:border-b-green-dark"
              >
                {/* Icon block */}
                <div style={{
                  width: 44, height: 44, marginBottom: 20,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(46,125,50,0.09)",
                  borderLeft: "3px solid #2E7D32",
                }}>
                  <Icon style={{ width: 22, height: 22, color: "#2E7D32" }} />
                </div>

                <h3 className="heading-card" style={{ marginBottom: 4 }}>{sol.title}</h3>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#4CAF50", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {sol.tagline}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "#6B7280", marginBottom: 20, flex: 1 }}>
                  {sol.description}
                </p>

                <ul style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                  {sol.features.slice(0, 3).map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#4B5563" }}>
                      <span style={{ width: 16, height: 16, background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1, flexShrink: 0 }}>
                        <span style={{ width: 6, height: 6, background: "#2E7D32", display: "block" }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#2E7D32" }}>
                  Learn more
                  <ArrowRight style={{ width: 14, height: 14, transition: "transform 0.2s" }} className="group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link href="/solutions" className="btn-outline" style={{ display: "inline-flex" }}>
            View All Solutions <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
