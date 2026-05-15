"use client";
import { useState } from "react";
import EmptyState    from "@/components/shared/EmptyState";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { GraduationCap, Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useTraining }  from "@/hooks/useTraining";

const STATUS_STYLES: Record<string,string> = {
  scheduled:    "status-planned",
  in_progress:  "status-in-progress",
  completed:    "status-completed",
  cancelled:    "status-non-compliant",
};

export default function TrainingPage() {
  const [page,   setPage]   = useState(1);
  const [status, setStatus] = useState("");

  const { data, loading, error } = useTraining({ page, limit: 20, status: status||undefined });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1B2A4A" }}>Training & Competency</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{data?.total ?? 0} training sessions</p>
        </div>
        <button className="btn-primary" style={{ display: "inline-flex", gap: 6 }}>
          <Plus style={{ width: 16, height: 16 }} /> Add Training
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {["","scheduled","in_progress","completed","cancelled"].map(s => (
          <button key={s} onClick={() => { setStatus(s); setPage(1); }} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
            background: status === s ? "#1B2A4A" : "#fff",
            color:      status === s ? "#fff"    : "#6B7280",
            border:     status === s ? "2px solid #1B2A4A" : "1px solid #E5E7EB",
          }}>{s ? s.replace("_"," ") : "All"}</button>
        ))}
      </div>

      {loading ? <LoadingSpinner text="Loading training…" /> : error ? (
        <div style={{ padding: 16, borderLeft: "3px solid #EF4444", background: "#FEF2F2", color: "#B91C1C", fontSize: 13 }}>{error}</div>
      ) : !data?.items.length ? (
        <EmptyState icon={GraduationCap} title="No training sessions" description="Schedule your first training session for the team." />
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>
              {["Session","Category","Delivery","Status","Date","Attendees","Pass Rate","Mandatory"].map(h => <th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {data.items.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{t.title}</td>
                  <td style={{ fontSize: 12, color: "#6B7280" }}>{t.category}</td>
                  <td style={{ fontSize: 12, color: "#6B7280", textTransform: "capitalize" }}>{t.deliveryMethod.replace("_"," ")}</td>
                  <td><span className={STATUS_STYLES[t.status] ?? "status-pill"}>{t.status.replace("_"," ")}</span></td>
                  <td style={{ fontSize: 12, color: "#6B7280", whiteSpace: "nowrap" }}>{formatDate(t.scheduledDate)}</td>
                  <td style={{ textAlign: "center", fontSize: 13, fontWeight: 600 }}>{t.attendeesCount}</td>
                  <td style={{ textAlign: "center" }}>
                    {t.passRate != null
                      ? <span style={{ fontWeight: 700, color: t.passRate >= 80 ? "#2E7D32" : "#F59E0B" }}>{t.passRate}%</span>
                      : <span style={{ color: "#9CA3AF", fontSize: 12 }}>—</span>
                    }
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {t.isMandatory
                      ? <span className="badge-red">Required</span>
                      : <span style={{ fontSize: 11, color: "#9CA3AF" }}>Optional</span>
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
