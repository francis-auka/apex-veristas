"use client";
import { Settings, Save, User, Building, Lock, Bell } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1B2A4A" }}>Settings</h1>
          <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>Manage your account and preferences.</p>
        </div>
        <button className="btn-primary" style={{ display: "inline-flex", gap: 6 }}>
          <Save style={{ width: 16, height: 16 }} /> Save Changes
        </button>
      </div>

      <div style={{ display: "grid", gap: 32 }} className="grid-cols-1 lg:grid-cols-4">
        {/* Settings Nav */}
        <div className="card" style={{ padding: 0, gridColumn: "span 1" }}>
          <nav style={{ padding: "12px 8px" }}>
            {[
              { id: "profile",      label: "My Profile",       icon: User },
              { id: "company",      label: "Company Details",  icon: Building },
              { id: "security",     label: "Security",         icon: Lock },
              { id: "notifications",label: "Notifications",    icon: Bell },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  width: "100%", padding: "10px 14px",
                  display: "flex", alignItems: "center", gap: 10,
                  fontSize: 13, fontWeight: 600,
                  background: activeTab === t.id ? "rgba(46,125,50,0.1)" : "transparent",
                  color: activeTab === t.id ? "#2E7D32" : "#6B7280",
                  border: "none",
                  borderLeft: activeTab === t.id ? "3px solid #2E7D32" : "3px solid transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.1s"
                }}
              >
                <t.icon style={{ width: 16, height: 16 }} />
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="card" style={{ gridColumn: "span 3", borderLeft: "3px solid #2E7D32" }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1B2A4A", marginBottom: 24, textTransform: "capitalize" }}>
            {activeTab.replace("-", " ")} Settings
          </h2>
          
          {activeTab === "profile" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 400 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6B7280", letterSpacing: "0.07em" }}>First Name</label>
                <input type="text" className="input-field" defaultValue="Admin" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6B7280", letterSpacing: "0.07em" }}>Last Name</label>
                <input type="text" className="input-field" defaultValue="User" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#6B7280", letterSpacing: "0.07em" }}>Email Address</label>
                <input type="email" className="input-field" defaultValue="admin@company.com" disabled style={{ background: "#F3F4F6", color: "#9CA3AF" }} />
              </div>
            </div>
          )}

          {activeTab !== "profile" && (
            <div style={{ padding: "40px 0", textAlign: "center" }}>
              <Settings style={{ width: 48, height: 48, color: "#E5E7EB", margin: "0 auto 16px" }} />
              <p style={{ fontSize: 13, color: "#6B7280" }}>This section will be available soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
