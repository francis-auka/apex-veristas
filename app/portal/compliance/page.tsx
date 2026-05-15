"use client";
import { useState } from "react";
import { useCompliance } from "@/hooks/useCompliance";
import ComplianceGauge   from "@/components/portal/ComplianceGauge";
import ActionCard        from "@/components/portal/ActionCard";
import LoadingSpinner    from "@/components/shared/LoadingSpinner";
import { ShieldAlert, AlertTriangle, FileText, CheckCircle, List, ArrowRight } from "lucide-react";

export default function CompliancePage() {
  const { stats, loading } = useCompliance();
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) return <LoadingSpinner fullPage text="Loading compliance data…" />;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1B2A4A" }}>Compliance Hub</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>Track your regulatory standings and upcoming requirements.</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 32, borderBottom: "2px solid #E5E7EB", marginBottom: 32 }}>
        {[
          { id: "overview",     label: "Overview",       icon: ShieldAlert },
          { id: "requirements", label: "Requirements",   icon: List },
          { id: "regulations",  label: "Regulations",    icon: FileText },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              paddingBottom: 12,
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 700,
              background: "none", cursor: "pointer",
              border: "none",
              borderBottom: activeTab === t.id ? "3px solid #2E7D32" : "3px solid transparent",
              color: activeTab === t.id ? "#1B2A4A" : "#6B7280",
              marginBottom: -2,
              transition: "all 0.2s"
            }}
          >
            <t.icon style={{ width: 16, height: 16, color: activeTab === t.id ? "#2E7D32" : "#9CA3AF" }} />
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Top row */}
          <div style={{ display: "grid", gap: 24 }} className="grid-cols-1 lg:grid-cols-3">
            <ComplianceGauge score={stats?.complianceScore ?? 0} />
            <div style={{ gridColumn: "span 2", display: "grid", gap: 24 }} className="grid-cols-1 sm:grid-cols-2">
              <ActionCard title="Overdue Items" value={stats?.overdueCompliance ?? 0} subtitle="Action required immediately" icon={AlertTriangle} iconColor="#EF4444" iconBg="rgba(239,68,68,0.1)" accent="#EF4444" />
              <ActionCard title="Pending Actions" value={stats?.pendingActions ?? 0} subtitle="Awaiting review or signature" icon={CheckCircle} iconColor="#F59E0B" iconBg="rgba(245,158,11,0.1)" accent="#F59E0B" />
              <ActionCard title="Expiring Docs" value={stats?.expiringDocuments ?? 0} subtitle="Renew within 30 days" icon={FileText} iconColor="#2E7D32" iconBg="rgba(46,125,50,0.1)" accent="#2E7D32" />
            </div>
          </div>

          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", textTransform: "uppercase", letterSpacing: "0.05em" }}>Recent Compliance Activity</h2>
            </div>
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#6B7280" }}>No recent activity to display.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "overview" && (
        <div className="card" style={{ padding: 40, textAlign: "center" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1B2A4A", marginBottom: 8, textTransform: "capitalize" }}>{activeTab} Module</h2>
          <p style={{ fontSize: 13, color: "#6B7280", maxWidth: 400, margin: "0 auto" }}>
            This section is being populated with your specific {activeTab} data based on your company settings.
          </p>
        </div>
      )}
    </div>
  );
}
