"use client";
import { MessageSquare, Plus } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

export default function MessagesPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1B2A4A" }}>Messages</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>Communicate with your team and virtual consultants.</p>
        </div>
        <button className="btn-primary" style={{ display: "inline-flex", gap: 6 }}>
          <Plus style={{ width: 16, height: 16 }} /> New Message
        </button>
      </div>

      <div style={{ display: "grid", gap: 24 }} className="grid-cols-1 lg:grid-cols-4">
        {/* Inbox list */}
        <div className="card" style={{ padding: 0, gridColumn: "span 1", minHeight: 500, overflowY: "auto" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #E5E7EB" }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: "#1B2A4A", textTransform: "uppercase", letterSpacing: "0.05em" }}>Inbox</h2>
          </div>
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#6B7280" }}>Your inbox is empty.</p>
          </div>
        </div>

        {/* Message View */}
        <div className="card" style={{ padding: 0, gridColumn: "span 3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 500 }}>
          <EmptyState 
            icon={MessageSquare} 
            title="Select a message" 
            description="Choose a conversation from the sidebar to view it here." 
          />
        </div>
      </div>
    </div>
  );
}
