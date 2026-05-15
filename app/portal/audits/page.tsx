"use client";
import { useState } from "react";
import { useAudits } from "@/hooks/useAudits";
import EmptyState    from "@/components/shared/EmptyState";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { ClipboardList, Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const STATUS_STYLES: Record<string,string> = {
  planned:     "status-planned",
  in_progress: "status-in-progress",
  completed:   "status-completed",
  cancelled:   "status-non-compliant",
};

export default function AuditsPage() {
  const [page,   setPage]  = useState(1);
  const [status, setStatus]= useState("");

  const { data, loading, error } = useAudits({ page, limit: 20, status: status||undefined });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1B2A4A" }}>Audit Management</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{data?.total ?? 0} audits scheduled</p>
        </div>
        <button className="btn-primary" style={{ display: "inline-flex", gap: 6 }}>
          <Plus style={{ width: 16, height: 16 }} /> Schedule Audit
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {["","planned","in_progress","completed","cancelled"].map(s => (
          <button key={s} onClick={() => { setStatus(s); setPage(1); }} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
            background: status === s ? "#1B2A4A" : "#fff",
            color:      status === s ? "#fff"    : "#6B7280",
            border:     status === s ? "2px solid #1B2A4A" : "1px solid #E5E7EB",
          }}>{s ? s.replace("_"," ") : "All Audits"}</button>
        ))}
      </div>

      {loading ? <LoadingSpinner text="Loading audits…" /> : error ? (
        <div style={{ padding: 16, borderLeft: "3px solid #EF4444", background: "#FEF2F2", color: "#B91C1C", fontSize: 13 }}>{error}</div>
      ) : !data?.items.length ? (
        <EmptyState icon={ClipboardList} title="No audits scheduled" description="Plan your first HSEQ audit to track compliance." />
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>
              {["Audit","Type","Standard","Status","Scheduled","Findings","Score"].map(h => <th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {data.items.map(a => (
                <tr key={a.id}>
                  <td>
                    <Link href={`/portal/audits/${a.id}`} style={{ fontWeight: 600, color: "#1B2A4A", textDecoration: "none", fontSize: 13 }}>
                      {a.title}
                    </Link>
                  </td>
                  <td style={{ fontSize: 12, color: "#6B7280", textTransform: "capitalize" }}>{a.auditType.replace("_"," ")}</td>
                  <td style={{ fontSize: 12, color: "#6B7280" }}>{a.standard ?? "—"}</td>
                  <td><span className={STATUS_STYLES[a.status] ?? "status-pill"}>{a.status.replace("_"," ")}</span></td>
                  <td style={{ fontSize: 12, color: "#6B7280", whiteSpace: "nowrap" }}>{formatDate(a.scheduledDate)}</td>
                  <td style={{ textAlign: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{a.findingsCount}</span>
                    {a.criticalCount > 0 && <span style={{ marginLeft: 6, fontSize: 10, color: "#EF4444", fontWeight: 700 }}>({a.criticalCount} crit)</span>}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {a.score != null
                      ? <span style={{ fontWeight: 700, color: a.score >= 80 ? "#2E7D32" : a.score >= 60 ? "#F59E0B" : "#EF4444" }}>{a.score}%</span>
                      : <span style={{ color: "#9CA3AF", fontSize: 12 }}>—</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
