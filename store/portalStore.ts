import { create } from "zustand";
import type { DashboardStats, CalendarEvent } from "@/types/portal";

interface PortalState {
  // Dashboard
  stats:         DashboardStats | null;
  statsLoading:  boolean;
  setStats:      (stats: DashboardStats) => void;
  setStatsLoading:(v: boolean) => void;

  // Calendar events
  calendarEvents:    CalendarEvent[];
  setCalendarEvents: (events: CalendarEvent[]) => void;

  // Active sidebar item
  activePath: string;
  setActivePath: (path: string) => void;

  // Global search
  searchQuery:    string;
  setSearchQuery: (q: string) => void;

  // Document upload modal
  uploadModalOpen:    boolean;
  setUploadModalOpen: (open: boolean) => void;

  // Sidebar
  sidebarOpen:    boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar:  () => void;
}

export const usePortalStore = create<PortalState>((set) => ({
  stats:          null,
  statsLoading:   false,
  setStats:       (stats) => set({ stats }),
  setStatsLoading:(statsLoading) => set({ statsLoading }),

  calendarEvents:    [],
  setCalendarEvents: (calendarEvents) => set({ calendarEvents }),

  activePath:    "",
  setActivePath: (activePath) => set({ activePath }),

  searchQuery:    "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  uploadModalOpen:    false,
  setUploadModalOpen: (uploadModalOpen: boolean) => set({ uploadModalOpen }),

  sidebarOpen:    false,
  setSidebarOpen: (sidebarOpen: boolean) => set({ sidebarOpen }),
  toggleSidebar:  () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  quickActionsOpen:    false,
  setQuickActionsOpen:(quickActionsOpen: boolean) => set({ quickActionsOpen }),
}));
