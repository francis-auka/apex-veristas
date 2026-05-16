"use client";
import { Bell, Search, Plus } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";
import { usePortalStore }       from "@/store/portalStore";

interface TopbarProps {
  title?:    string;
  subtitle?: string;
}

export default function Topbar({ title = "Dashboard", subtitle }: TopbarProps) {
  const unreadCount      = useNotificationStore((s) => s.unreadCount);
  const togglePanel      = useNotificationStore((s) => s.togglePanel);
  const setUploadOpen    = usePortalStore((s) => s.setUploadModalOpen);
  const searchQuery      = usePortalStore((s) => s.searchQuery);
  const setSearchQuery   = usePortalStore((s) => s.setSearchQuery);

  return (
    <header
      className="flex h-16 items-center justify-between gap-4 px-6"
      style={{
        background:   "#fff",
        borderBottom: "1px solid rgba(27,42,74,0.08)",
        position:     "sticky",
        top:          0,
        zIndex:       30,
      }}
    >
      {/* Page title */}
      <div>
        <h1 className="text-base font-bold" style={{ color: "#1B2A4A" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs" style={{ color: "#6B7280" }}>{subtitle}</p>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: "#9CA3AF" }}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-52 border py-2 pl-9 pr-4 text-sm transition-shadow focus:shadow-md focus:outline-none"
            style={{
              borderColor:     "#e5e7eb",
              backgroundColor: "#F9FAFB",
              color:           "#1A1A2E",
            }}
          />
        </div>

        {/* Quick upload */}
        <button
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:scale-105 hover:shadow-md"
          style={{ background: "#2E7D32" }}
          title="Upload Document"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Upload</span>
        </button>

        {/* Notification bell */}
        <button
          onClick={togglePanel}
          className="relative flex h-9 w-9 items-center justify-center transition-colors hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" style={{ color: "#1B2A4A" }} />
          {unreadCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 flex h-4 w-4 min-w-[16px] items-center justify-center text-[9px] font-bold text-white"
              style={{ background: "#EF4444" }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
