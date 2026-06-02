"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ShieldCheck, ArrowRight, ChevronDown, Globe2, Award } from "lucide-react";

const STATS = [
  { value: "500+", label: "Companies Protected" },
  { value: "98%",  label: "Compliance Rate"     },
  { value: "2",    label: "Countries Served"    },
  { value: "24/7", label: "Expert Support"      },
];

const TRUST = ["ISO 45001 Aligned", "ISO 14001 Aligned", "Kenya OSHA 2007", "UAE OSHAD-SF"];

export default function HeroSection() {
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      if (floatRef.current) floatRef.current.style.transform = `translateY(${Math.sin(t * 0.7) * 10}px)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className="section-responsive"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(160deg,#0C1828 0%,#1B2A4A 50%,#122115 100%)",
      }}
    >
      {/* Orbs */}
      <div style={{ position: "absolute", top: -80, left: -80, width: 500, height: 500, background: "radial-gradient(circle,rgba(46,125,50,0.18) 0%,transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, right: -80, width: 500, height: 500, background: "radial-gradient(circle,rgba(76,175,80,0.12) 0%,transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.035,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container-xl" style={{ position: "relative", zIndex: 10, paddingTop: 80, paddingBottom: 80 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" style={{ position: "relative", zIndex: 10 }}>

          {/* Left */}
          <div>
            {/* Country + tagline badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {[ "Worldwide Virtual Services", "Kenyan-Based HQ" ].map(b => (
                <div key={b} className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">{b}</span>
                </div>
              ))}
            </div>

            <h1 style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}>
              Safety Without <span style={{
                backgroundImage: "linear-gradient(90deg,#4CAF50,#66BB6A)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Borders</span>
            </h1>

            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.6,
              marginBottom: 40,
              maxWidth: 580,
            }}>
              Based in Nairobi and serving companies worldwide. Our virtual HSEQ platform centralises 
              documents, audits, incidents and training with global standards and local expertise.
            </p>

            {/* Trust */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
              {TRUST.map(t => (
                <span key={t} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "4px 12px", fontSize: 11, fontWeight: 500,
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <ShieldCheck style={{ width: 11, height: 11, color: "#4CAF50" }} />
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <Link href="/register" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", fontSize: 15, fontWeight: 700, color: "#fff",
                background: "linear-gradient(135deg,#2E7D32,#4CAF50)",
                boxShadow: "0 6px 28px rgba(46,125,50,0.45)",
                transition: "all 0.2s",
              }}>
                Start Free 14-Day Trial <ArrowRight style={{ width: 18, height: 18 }} />
              </Link>
              <Link href="/solutions" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.82)",
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.22)",
                transition: "all 0.2s",
              }}>
                Explore Solutions
              </Link>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.38)" }}>
              No credit card required · Cancel anytime · Setup in under 10 minutes
            </p>
          </div>

          {/* Right — floating dashboard */}
          <div className="hidden lg:flex justify-center">
            <div ref={floatRef} style={{ position: "relative", width: "100%", maxWidth: 400 }}>
              {/* Main card */}
              <div style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(24px)",
                padding: 28,
                boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Compliance Overview</span>
                  <span className="badge-green" style={{ fontSize: 10 }}>Live</span>
                </div>

                {/* Ring gauge */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                  <div style={{ position: "relative", width: 140, height: 140 }}>
                    <svg viewBox="0 0 120 120" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#hg)" strokeWidth="10" strokeDasharray={`${0.87*314} 314`} strokeLinecap="butt" />
                      <defs>
                        <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#2E7D32" />
                          <stop offset="100%" stopColor="#66BB6A" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontSize: 32, fontWeight: 900, color: "#fff" }}>87%</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#66BB6A" }}>Compliant</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Open Incidents",    val: "2",   color: "#F59E0B" },
                    { label: "Overdue Items",     val: "3",   color: "#EF4444" },
                    { label: "Expiring Docs",     val: "1",   color: "#F59E0B" },
                    { label: "Training Done",     val: "94%", color: "#4CAF50" },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{r.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Float chips */}
              <div style={{
                position: "absolute", top: -16, right: -16,
                padding: "8px 16px",
                background: "rgba(46,125,50,0.92)",
                border: "1px solid rgba(76,175,80,0.4)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 24px rgba(46,125,50,0.4)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <Award style={{ width: 14, height: 14, color: "#fff" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>ISO 45001 Ready</span>
              </div>
              <div style={{
                position: "absolute", bottom: -16, left: -16,
                padding: "8px 16px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <ShieldCheck style={{ width: 14, height: 14, color: "#4CAF50" }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>Audit Ready in 2hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          marginTop: 80,
          background: "rgba(255,255,255,0.08)",
          gap: 1,
        }} className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} style={{
              padding: "24px 20px",
              textAlign: "center",
              background: "rgba(27,42,74,0.8)",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{
                fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 900,
                backgroundImage: "linear-gradient(90deg,#4CAF50,#66BB6A)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{s.value}</div>
              <div style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.48)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)" }} className="animate-bounce">
        <ChevronDown style={{ width: 22, height: 22, color: "rgba(255,255,255,0.3)" }} />
      </div>
    </section>
  );
}
