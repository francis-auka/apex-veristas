"use client";
import { CheckSquare, Plus, Search } from "lucide-react";
import ActionCard from "@/components/portal/ActionCard";
import EmptyState from "@/components/shared/EmptyState";

export default function TasksPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1B2A4A" }}>Task Management</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>Manage and assign HSEQ action items.</p>
        </div>
        <button className="btn-primary" style={{ display: "inline-flex", gap: 6 }}>
          <Plus style={{ width: 16, height: 16 }} /> Create Task
        </button>
      </div>

      <div style={{ display: "grid", gap: 24, marginBottom: 32 }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <ActionCard title="Total Tasks" value="12" icon={CheckSquare} accent="#1B2A4A" iconColor="#1B2A4A" iconBg="rgba(27,42,74,0.1)" />
        <ActionCard title="To Do" value="5" icon={CheckSquare} accent="#6B7280" iconColor="#6B7280" iconBg="rgba(107,114,128,0.1)" />
        <ActionCard title="In Progress" value="4" icon={CheckSquare} accent="#F59E0B" iconColor="#F59E0B" iconBg="rgba(245,158,11,0.1)" />
        <ActionCard title="Overdue" value="3" icon={CheckSquare} accent="#EF4444" iconColor="#EF4444" iconBg="rgba(239,68,68,0.1)" />
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 300 }}>
          <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#9CA3AF" }} />
          <input placeholder="Search tasks…" className="input-field" style={{ paddingLeft: 36 }} />
        </div>
        <select className="input-field" style={{ width: 150 }} defaultValue="">
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <EmptyState 
          icon={CheckSquare} 
          title="No tasks found" 
          description="You don't have any tasks assigned to you right now." 
        />
      </div>
    </div>
  );
}
