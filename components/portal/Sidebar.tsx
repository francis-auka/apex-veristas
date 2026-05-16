"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { PORTAL_NAV } from "@/constants/navigation";
import { usePortalStore } from "@/store/portalStore";
import {
  LayoutDashboard, ShieldCheck, FolderOpen, ClipboardList, AlertTriangle,
  GraduationCap, CheckSquare, BarChart2, MessageSquare, Settings,
  LogOut, ChevronLeft, ChevronRight, ShieldAlert,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, ShieldCheck, FolderOpen, ClipboardList, AlertTriangle,
  GraduationCap, CheckSquare, BarChart2, MessageSquare, Settings,
};

export default function Sidebar() {
  const pathname  = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const { sidebarOpen, setSidebarOpen } = usePortalStore();

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          width: collapsed ? 64 : 240,
          height: "100vh",
          background: "#111E35",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          transition: "transform 0.3s ease, width 0.25s ease",
          flexShrink: 0,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
        className="lg:relative lg:translate-x-0"
      >
      {/* Logo strip */}
      <div style={{
        display: "flex",
        height: 56,
        alignItems: "center",
        padding: collapsed ? "0 12px" : "0 16px",
        gap: 10,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.15)",
      }}>
        <div style={{
          width: 28, height: 28, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg,#2E7D32,#66BB6A)",
        }}>
          <ShieldAlert style={{ width: 14, height: 14, color: "#fff" }} />
        </div>
        {!collapsed && (
          <div style={{ overflow: "hidden" }}>
            <span style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#fff", whiteSpace: "nowrap" }}>Apex Veritas</span>
            <span style={{ display: "block", fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#66BB6A" }}>HSEQ Platform</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
        {PORTAL_NAV.map((item) => {
          const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`sidebar-item ${isActive ? "sidebar-item-active" : "sidebar-item-inactive"}`}
              style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "10px 12px" : "9px 12px" }}
            >
              <Icon style={{ width: 17, height: 17, flexShrink: 0 }} />
              {!collapsed && <span style={{ fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: 8 }}>
        {!collapsed && user && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 4 }}>
            <div style={{
              width: 28, height: 28, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg,#2E7D32,#4CAF50)",
              fontSize: 10, fontWeight: 700, color: "#fff",
            }}>
              {user.name?.split(" ").map(n => n[0]).join("").slice(0,2)}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="sidebar-item sidebar-item-inactive"
          style={{ width: "100%", background: "none", border: "none", cursor: "pointer", justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "10px 12px" : "9px 12px" }}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut style={{ width: 15, height: 15, flexShrink: 0 }} />
          {!collapsed && <span style={{ fontSize: 13 }}>Sign out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute", top: 64, right: -12,
          width: 24, height: 24,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#fff",
          border: "1px solid #E5E7EB",
          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          cursor: "pointer",
          zIndex: 10,
        }}
        aria-label="Toggle sidebar"
      >
        {collapsed
          ? <ChevronRight style={{ width: 13, height: 13, color: "#1B2A4A" }} />
          : <ChevronLeft  style={{ width: 13, height: 13, color: "#1B2A4A" }} />
        }
      </button>
    </aside>
    </>
  );
}
