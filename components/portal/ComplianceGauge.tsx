"use client";
import { getComplianceColor, getComplianceBadge } from "@/lib/utils";
import { ComplianceGaugeSkeleton } from "@/components/shared/Skeleton";

interface ComplianceGaugeProps {
  score:   number;
  loading?: boolean;
}

export default function ComplianceGauge({ score, loading = false }: ComplianceGaugeProps) {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;
  const color  = getComplianceColor(score);
  const badge  = getComplianceBadge(score);

  if (loading) return <ComplianceGaugeSkeleton />;

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h3 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B7280", marginBottom: 24 }}>
        Compliance Score
      </h3>

      {/* SVG gauge */}
      <div style={{ position: "relative", width: 160, height: 160 }}>
        <svg viewBox="0 0 120 120" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
          <circle cx="60" cy="60" r="52" fill="none" stroke="#F3F4F6" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="52" fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            style={{ transition: "stroke-dashoffset 1s ease-in-out, stroke 0.5s" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 36, fontWeight: 900, color }}>{score}</span>
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>out of 100</span>
        </div>
      </div>

      {/* Badge — left-border style */}
      <span style={{
        marginTop: 20,
        display: "inline-flex", alignItems: "center",
        padding: "5px 14px", fontSize: 11, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.06em",
        background: `${color}12`, color,
        borderLeft: `3px solid ${color}`,
      }}>
        {badge}
      </span>

      <div style={{ marginTop: 16, width: "100%", display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9CA3AF" }}>
        <span>Non-Compliant</span>
        <span>Target: 100</span>
      </div>
    </div>
  );
}
