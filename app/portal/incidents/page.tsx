"use client";
import { useState } from "react";
import { useIncidents, useIncidentReport } from "@/hooks/useIncidents";
import { useNotificationStore }            from "@/store/notificationStore";
import EmptyState from "@/components/shared/EmptyState";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { AlertTriangle, Plus, RefreshCw, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

const SEV_STYLES: Record<string, string> = {
  fatality:        "status-non-compliant",
  major_injury:    "status-overdue",
  minor_injury:    "status-in-progress",
  first_aid:       "status-in-progress",
  property_damage: "status-planned",
  near_miss:       "status-planned",
};
const STATUS_STYLES: Record<string, string> = {
  reported:             "status-in-progress",
  under_investigation:  "status-planned",
  awaiting_review:      "status-planned",
  closed:               "status-completed",
};

export default function IncidentsPage() {
  const [page,    setPage]    = useState(1);
  const [status,  setStatus]  = useState("");
  const [severity,setSeverity]= useState("");
  const [showForm,setShowForm]= useState(false);

  const { data, loading, error, refetch } = useIncidents({ page, limit: 20, status: status||undefined, severity: severity||undefined });
  const { report, submitting }            = useIncidentReport();
  const notify                            = useNotificationStore();

  const [newIncident, setNewIncident] = useState({
    title: "", description: "", incidentType: "accident",
    severity: "minor_injury", location: "", occurredAt: "",
  });

  async function handleReport(e: React.FormEvent) {
    e.preventDefault();
    const res = await report({ ...newIncident, occurredAt: new Date(newIncident.occurredAt) });
    if (res) {
      notify.success("Incident reported", "The incident has been recorded successfully.");
      setShowForm(false);
      refetch();
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1B2A4A" }}>Incident Register</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{data?.total ?? 0} total incidents</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary" style={{ display: "inline-flex", gap: 6 }}>
          <Plus style={{ width: 16, height: 16 }} /> Report Incident
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "All Status",   value: "",                    setter: setStatus  },
          { label: "Reported",     value: "reported",            setter: setStatus  },
          { label: "Investigating",value: "under_investigation", setter: setStatus  },
          { label: "Closed",       value: "closed",              setter: setStatus  },
        ].map(f => (
          <button key={f.value}
            onClick={() => { setStatus(f.value); setPage(1); }}
            style={{
              padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
              background: status === f.value ? "#1B2A4A" : "#fff",
              color:      status === f.value ? "#fff"    : "#6B7280",
              border:     status === f.value ? "2px solid #1B2A4A" : "1px solid #E5E7EB",
            }}
          >{f.label}</button>
        ))}
      </div>

      {/* Table */}
      {loading ? <LoadingSpinner text="Loading incidents…" /> : error ? (
        <div style={{ padding: 20, borderLeft: "3px solid #EF4444", background: "#FEF2F2", fontSize: 14, color: "#B91C1C" }}>{error}</div>
      ) : !data?.items.length ? (
        <EmptyState icon={AlertTriangle} title="No incidents recorded" description="Report your first incident to start tracking." action={{ label: "Report Incident", onClick: () => setShowForm(true) }} />
      ) : (
        <div className="card" style={{ overflow: "hidden", padding: 0 }}>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Incident","Type","Severity","Status","Location","Date","LTI"].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.items.map(inc => (
                <tr key={inc.id}>
                  <td style={{ fontWeight: 600, maxWidth: 200 }}><div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inc.title}</div></td>
                  <td style={{ textTransform: "capitalize", color: "#6B7280", fontSize: 12 }}>{inc.incidentType.replace("_"," ")}</td>
                  <td><span className={SEV_STYLES[inc.severity] ?? "status-pill"}>{inc.severity.replace("_"," ")}</span></td>
                  <td><span className={STATUS_STYLES[inc.status] ?? "status-pill"}>{inc.status.replace("_"," ")}</span></td>
                  <td style={{ color: "#6B7280", fontSize: 12 }}>{inc.location}</td>
                  <td style={{ color: "#6B7280", fontSize: 12, whiteSpace: "nowrap" }}>{formatDate(inc.occurredAt)}</td>
                  <td style={{ textAlign: "center" }}>
                    {inc.lostTimeInjury
                      ? <span style={{ width: 8, height: 8, background: "#EF4444", display: "inline-block" }} title="LTI" />
                      : <span style={{ width: 8, height: 8, background: "#D1FAE5", display: "inline-block" }} />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          {data.totalPages > 1 && (
            <div style={{ padding: "12px 16px", borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#6B7280" }}>Page {data.page} of {data.totalPages}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button disabled={!data.hasPrev} onClick={() => setPage(p => p-1)} style={{ padding: "5px 12px", fontSize: 12, border: "1px solid #E5E7EB", background: "#fff", cursor: "pointer", opacity: data.hasPrev ? 1 : 0.4 }}>← Prev</button>
                <button disabled={!data.hasNext} onClick={() => setPage(p => p+1)} style={{ padding: "5px 12px", fontSize: 12, border: "1px solid #E5E7EB", background: "#fff", cursor: "pointer", opacity: data.hasNext ? 1 : 0.4 }}>Next →</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Report form modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="card" style={{ width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1B2A4A" }}>Report an Incident</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X style={{ width: 20, height: 20, color: "#6B7280" }} />
              </button>
            </div>
            <form onSubmit={handleReport} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Incident Title", key: "title",       type: "text",     placeholder: "Brief description of the incident" },
                { label: "Location",       key: "location",    type: "text",     placeholder: "Site / Building / Department"      },
                { label: "Date & Time",    key: "occurredAt",  type: "datetime-local" },
              ].map(f => (
                <div key={f.key}>
                  <label className="data-table th" style={{ display: "block", padding: "0 0 6px", fontSize: 11, textTransform: "uppercase" }}>{f.label}</label>
                  <input
                    type={f.type} required
                    value={(newIncident as any)[f.key]}
                    onChange={e => setNewIncident(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="input-field"
                  />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6B7280", letterSpacing: "0.07em" }}>Type</label>
                  <select className="input-field" value={newIncident.incidentType} onChange={e => setNewIncident(p => ({ ...p, incidentType: e.target.value }))}>
                    {["accident","near_miss","hazard","environmental","quality","security"].map(t => <option key={t} value={t}>{t.replace("_"," ")}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6B7280", letterSpacing: "0.07em" }}>Severity</label>
                  <select className="input-field" value={newIncident.severity} onChange={e => setNewIncident(p => ({ ...p, severity: e.target.value }))}>
                    {["fatality","major_injury","minor_injury","first_aid","property_damage","near_miss"].map(s => <option key={s} value={s}>{s.replace("_"," ")}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6B7280", letterSpacing: "0.07em" }}>Description</label>
                <textarea
                  required rows={4}
                  value={newIncident.description}
                  onChange={e => setNewIncident(p => ({ ...p, description: e.target.value }))}
                  className="input-field"
                  placeholder="Provide a detailed description of what happened…"
                  style={{ resize: "vertical" }}
                />
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? "Submitting…" : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
