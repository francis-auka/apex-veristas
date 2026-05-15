import { create } from "zustand";
import type { AppNotification, NotificationLevel } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface NotificationState {
  notifications:   AppNotification[];
  unreadCount:     number;
  panelOpen:       boolean;
  add:   (n: Omit<AppNotification, "id" | "read" | "createdAt">) => void;
  markRead:        (id: string) => void;
  markAllRead:     () => void;
  remove:          (id: string) => void;
  clearAll:        () => void;
  togglePanel:     () => void;
  setPanelOpen:    (open: boolean) => void;
  // Convenience shortcuts
  success: (title: string, message: string, link?: string) => void;
  error:   (title: string, message: string, link?: string) => void;
  warning: (title: string, message: string, link?: string) => void;
  info:    (title: string, message: string, link?: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount:   0,
  panelOpen:     false,

  add: (n) => {
    const notification: AppNotification = {
      ...n,
      id:        uuidv4(),
      read:      false,
      createdAt: new Date(),
    };
    set((s) => ({
      notifications: [notification, ...s.notifications].slice(0, 50), // cap at 50
      unreadCount:   s.unreadCount + 1,
    }));
  },

  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),

  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadCount:   0,
    })),

  remove: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
      unreadCount:   s.notifications.find((n) => n.id === id && !n.read)
        ? Math.max(0, s.unreadCount - 1)
        : s.unreadCount,
    })),

  clearAll: () => set({ notifications: [], unreadCount: 0 }),

  togglePanel: () => set((s) => ({ panelOpen: !s.panelOpen })),
  setPanelOpen:(open) => set({ panelOpen: open }),

  success: (title, message, link) => get().add({ title, message, level: "success", link }),
  error:   (title, message, link) => get().add({ title, message, level: "error",   link }),
  warning: (title, message, link) => get().add({ title, message, level: "warning", link }),
  info:    (title, message, link) => get().add({ title, message, level: "info",    link }),
}));
