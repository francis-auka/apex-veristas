"use client";
import { BarChart2, Download, Filter } from "lucide-react";
import ActionCard from "@/components/portal/ActionCard";
import EmptyState from "@/components/shared/EmptyState";

export default function ReportsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1B2A4A" }}>Analytics & Reports</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>Generate and visualize HSEQ performance data.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-outline" style={{ display: "inline-flex", gap: 6 }}>
            <Filter style={{ width: 16, height: 16 }} /> Filters
          </button>
          <button className="btn-primary" style={{ display: "inline-flex", gap: 6 }}>
            <Download style={{ width: 16, height: 16 }} /> Export full report
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gap: 24, marginBottom: 32 }} className="grid-cols-1 sm:grid-cols-3">
        <ActionCard title="Reports Generated" value="8" subtitle="This month" icon={BarChart2} accent="#2E7D32" iconColor="#2E7D32" iconBg="rgba(46,125,50,0.1)" />
        <ActionCard title="Custom Dashboards" value="2" subtitle="Active views" icon={BarChart2} accent="#1B2A4A" iconColor="#1B2A4A" iconBg="rgba(27,42,74,0.1)" />
        <ActionCard title="Scheduled Exports" value="1" subtitle="Weekly summary" icon={BarChart2} accent="#F59E0B" iconColor="#F59E0B" iconBg="rgba(245,158,11,0.1)" />
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB" }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", textTransform: "uppercase", letterSpacing: "0.05em" }}>Saved Reports</h2>
        </div>
        <EmptyState 
          icon={BarChart2} 
          title="No saved reports" 
          description="Create your first custom report to easily access it later." 
          action={{ label: "Create Report", onClick: () => {} }}
        />
      </div>
    </div>
  );
}
