"use client";
import { useState } from "react";
import { useDocuments, useDocumentUpload } from "@/hooks/useDocuments";
import { useNotificationStore }            from "@/store/notificationStore";
import EmptyState   from "@/components/shared/EmptyState";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { FolderOpen, Upload, Search, X, FileText } from "lucide-react";
import { formatDate, formatFileSize } from "@/lib/utils";

const CATEGORIES = ["","policy","procedure","form","certificate","report","permit","risk_assessment","msds","other"];
const STATUS_STYLES: Record<string,string> = {
  active:"status-compliant", draft:"status-in-progress", archived:"status-planned", expired:"status-non-compliant",
};

export default function DocumentsPage() {
  const [page,     setPage]    = useState(1);
  const [category, setCategory]= useState("");
  const [search,   setSearch]  = useState("");
  const [showUpload,setShowUpload]= useState(false);
  const [uploadFile,setUploadFile]= useState<File|null>(null);
  const [meta, setMeta] = useState({ title: "", category: "policy", description: "" });

  const { data, loading, error, refetch } = useDocuments({ page, limit: 20, category: category||undefined, search: search||undefined });
  const { upload, uploading, error: uploadError } = useDocumentUpload();
  const notify = useNotificationStore();

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadFile) return;
    const res = await upload(uploadFile, { ...meta, folder: "documents" });
    if (res) {
      // Register in DB
      await fetch("/api/portal/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...meta, fileUrl: res.fileUrl, s3Key: res.s3Key, fileName: uploadFile.name, fileSize: uploadFile.size, mimeType: uploadFile.type }),
      });
      notify.success("Document uploaded", `${uploadFile.name} has been saved.`);
      setShowUpload(false);
      setUploadFile(null);
      refetch();
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1B2A4A" }}>Document Control</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{data?.total ?? 0} documents stored</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="btn-primary" style={{ display: "inline-flex", gap: 6 }}>
          <Upload style={{ width: 16, height: 16 }} /> Upload Document
        </button>
      </div>

      {/* Search + filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#9CA3AF" }} />
          <input
            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search documents…"
            className="input-field" style={{ paddingLeft: 36 }}
          />
        </div>
        <select value={category} onChange={e => { setCategory(e.target.value); setPage(1); }} className="input-field" style={{ width: "auto", minWidth: 150 }}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c ? c.replace("_"," ") : "All Categories"}</option>)}
        </select>
      </div>

      {loading ? <LoadingSpinner text="Loading documents…" /> : error ? (
        <div style={{ padding: 16, borderLeft: "3px solid #EF4444", background: "#FEF2F2", fontSize: 14, color: "#B91C1C" }}>{error}</div>
      ) : !data?.items.length ? (
        <EmptyState icon={FolderOpen} title="No documents yet" description="Upload your first HSEQ document to get started." action={{ label: "Upload Document", onClick: () => setShowUpload(true) }} />
      ) : (
        <div className="card" style={{ overflow: "hidden", padding: 0 }}>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>
              {["Document","Category","Status","Version","Size","Expiry","Uploaded"].map(h => <th key={h}>{h}</th>)}
            </tr></thead>
            <tbody>
              {data.items.map(doc => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <FileText style={{ width: 14, height: 14, color: "#6B7280", flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{doc.title}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{doc.fileName}</div>
                  </td>
                  <td style={{ fontSize: 12, color: "#6B7280", textTransform: "capitalize" }}>{doc.category.replace("_"," ")}</td>
                  <td><span className={STATUS_STYLES[doc.status] ?? "status-pill"}>{doc.status}</span></td>
                  <td style={{ fontSize: 12, color: "#6B7280" }}>v{doc.version}</td>
                  <td style={{ fontSize: 12, color: "#9CA3AF" }}>{formatFileSize(doc.fileSize)}</td>
                  <td style={{ fontSize: 12, color: doc.expiryDate ? "#F59E0B" : "#9CA3AF" }}>{doc.expiryDate ? formatDate(doc.expiryDate) : "—"}</td>
                  <td style={{ fontSize: 12, color: "#9CA3AF" }}>{doc.uploadedBy || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.totalPages > 1 && (
            <div style={{ padding: "10px 16px", borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "#6B7280" }}>Page {data.page} of {data.totalPages}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button disabled={!data.hasPrev} onClick={() => setPage(p=>p-1)} style={{ padding: "4px 12px", fontSize: 12, border: "1px solid #E5E7EB", background: "#fff", cursor: "pointer", opacity: data.hasPrev?1:0.4 }}>← Prev</button>
                <button disabled={!data.hasNext} onClick={() => setPage(p=>p+1)} style={{ padding: "4px 12px", fontSize: 12, border: "1px solid #E5E7EB", background: "#fff", cursor: "pointer", opacity: data.hasNext?1:0.4 }}>Next →</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="card" style={{ width: "100%", maxWidth: 500, position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1B2A4A" }}>Upload Document</h2>
              <button onClick={() => setShowUpload(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X style={{ width: 18, height: 18, color: "#6B7280" }} /></button>
            </div>
            <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {uploadError && <div style={{ padding: 10, borderLeft: "3px solid #EF4444", background: "#FEF2F2", fontSize: 12, color: "#B91C1C" }}>{uploadError}</div>}

              {/* Drop zone */}
              <label style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 8, padding: "28px 20px", cursor: "pointer",
                border: `2px dashed ${uploadFile ? "#2E7D32" : "#D1D5DB"}`,
                background: uploadFile ? "rgba(46,125,50,0.04)" : "#F9FAFB",
              }}>
                <input type="file" style={{ display: "none" }} onChange={e => setUploadFile(e.target.files?.[0] ?? null)} />
                <Upload style={{ width: 24, height: 24, color: uploadFile ? "#2E7D32" : "#9CA3AF" }} />
                <span style={{ fontSize: 13, color: uploadFile ? "#2E7D32" : "#6B7280", fontWeight: 600 }}>
                  {uploadFile ? uploadFile.name : "Click to select a file"}
                </span>
                {!uploadFile && <span style={{ fontSize: 11, color: "#9CA3AF" }}>PDF, Word, Excel, Images up to 50MB</span>}
              </label>

              <div>
                <label style={{ display: "block", marginBottom: 5, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6B7280", letterSpacing: "0.07em" }}>Document Title</label>
                <input required className="input-field" value={meta.title} onChange={e => setMeta(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Fire Safety Procedure v2" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 5, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6B7280", letterSpacing: "0.07em" }}>Category</label>
                <select className="input-field" value={meta.category} onChange={e => setMeta(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.filter(Boolean).map(c => <option key={c} value={c}>{c.replace("_"," ")}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                <button type="button" onClick={() => setShowUpload(false)} className="btn-ghost">Cancel</button>
                <button type="submit" disabled={uploading || !uploadFile} className="btn-primary">
                  {uploading ? "Uploading…" : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
