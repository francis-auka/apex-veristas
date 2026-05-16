import { LucideIcon } from "lucide-react";
import { ActionCardSkeleton } from "@/components/shared/Skeleton";

interface ActionCardProps {
  title:      string;
  value:      string | number;
  subtitle?:  string;
  icon:       LucideIcon;
  iconColor?: string;
  iconBg?:    string;
  trend?:     { value: number; label: string };
  loading?:   boolean;
  accent?:    string;   // left-border color
}

export default function ActionCard({
  title, value, subtitle, icon: Icon,
  iconColor = "#2E7D32",
  iconBg    = "rgba(46,125,50,0.1)",
  trend, loading = false,
  accent = "#2E7D32",
}: ActionCardProps) {
  if (loading) return <ActionCardSkeleton />;

  return (
    <div
      className="card"
      style={{ borderLeft: `3px solid ${accent}`, padding: "18px 20px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B7280" }}>
          {title}
        </span>
        <div style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: iconBg }}>
          <Icon style={{ width: 18, height: 18, color: iconColor }} />
        </div>
      </div>

      <div style={{ fontSize: 28, fontWeight: 900, color: "#1B2A4A", lineHeight: 1 }}>{value}</div>

      {subtitle && (
        <p style={{ marginTop: 5, fontSize: 12, color: "#6B7280" }}>{subtitle}</p>
      )}

      {trend && (
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: trend.value >= 0 ? "#2E7D32" : "#EF4444" }}>
            {trend.value >= 0 ? "▲" : "▼"} {Math.abs(trend.value)}%
          </span>
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>{trend.label}</span>
        </div>
      )}
    </div>
  );
}
