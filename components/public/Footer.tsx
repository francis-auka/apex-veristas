import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

const SOLUTIONS_QUICK = [
  { label: "Compliance Management", href: "/solutions/compliance-management" },
  { label: "Document Control",      href: "/solutions/document-control"      },
  { label: "Audit Management",      href: "/solutions/audit-management"      },
  { label: "Incident Reporting",    href: "/solutions/incident-reporting"    },
  { label: "Training & Competency", href: "/solutions/training-competency"   },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1B2A4A", color: "#fff" }}>
      {/* Top rule */}
      <div style={{ height: 4, background: "linear-gradient(90deg,#2E7D32,#4CAF50,#66BB6A)" }} />

      <div className="container-xl" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, textDecoration: "none" }}>
              <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#2E7D32,#66BB6A)" }}>
                <ShieldCheck style={{ width: 16, height: 16, color: "#fff" }} />
              </div>
              <div>
                <span style={{ display: "block", fontSize: 14, fontWeight: 800, color: "#fff" }}>Apex Veritas</span>
                <span style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#66BB6A" }}>Virtual HSEQ Solutions</span>
              </div>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", marginBottom: 24 }}>
              Safety Without Borders — empowering companies in Kenya and UAE with world-class virtual HSEQ compliance management.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { Icon: Mail,  text: "info@apexveritas.com", href: "mailto:info@apexveritas.com" },
                { Icon: Phone, text: "+254 700 000 000 (KE) · +971 4 000 0000 (AE)" },
                { Icon: MapPin,text: "Nairobi, Kenya · Dubai, UAE" },
              ].map(({ Icon, text, href }) => (
                <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Icon style={{ width: 14, height: 14, color: "#66BB6A", marginTop: 2, flexShrink: 0 }} />
                  {href
                    ? <a href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{text}</a>
                    : <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{text}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#66BB6A", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>Solutions</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SOLUTIONS_QUICK.map(s => (
                <li key={s.href}>
                  <Link href={s.href} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.15s" }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#66BB6A", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>Company</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["About Us",       "/about"         ],
                ["Industries",     "/industries"    ],
                ["Pricing",        "/pricing"       ],
                ["Resources",      "/resources"     ],
                ["Compliance Hub", "/compliance-hub"],
                ["Contact",        "/contact"       ],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h3 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#66BB6A", marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>Compliance Areas</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["OSHA 2007 (Kenya)","OSHAD-SF (UAE)","ISO 45001 — OH&S","ISO 14001 — Environment","ISO 9001 — Quality","EMCA (Kenya)","UAE EHS Framework"].map(r => (
                <li key={r} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container-xl" style={{ paddingTop: 20, paddingBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Apex Veritas Ltd. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {[["Privacy Policy","/privacy"],["Terms","/terms"],["Cookies","/cookies"]].map(([l,h]) => (
              <Link key={h} href={h} style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>{l}</Link>
            ))}
            <div style={{ display: "flex", gap: 12, marginLeft: 8 }}>
              <a href="#" aria-label="LinkedIn"><Linkedin style={{ width: 15, height: 15, color: "rgba(255,255,255,0.5)" }} /></a>
              <a href="#" aria-label="Twitter"><Twitter style={{ width: 15, height: 15, color: "rgba(255,255,255,0.5)" }} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
