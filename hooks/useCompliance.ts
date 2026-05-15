"use client";
import { useState, useEffect, useCallback } from "react";
import type { DashboardStats, CalendarEvent } from "@/types/portal";
import { usePortalStore } from "@/store/portalStore";

export function useCompliance() {
  const { stats, statsLoading, setStats, setStatsLoading } = usePortalStore();
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    setError(null);
    try {
      const res  = await fetch("/api/portal/compliance");
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Failed to load compliance data");
      setStats(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setStatsLoading(false);
    }
  }, [setStats, setStatsLoading]);

  useEffect(() => {
    if (!stats) fetchStats();
  }, [stats, fetchStats]);

  return { stats, loading: statsLoading, error, refetch: fetchStats };
}

export function useComplianceCalendar(month?: string) {
  const { calendarEvents, setCalendarEvents } = usePortalStore();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const fetchCalendar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = month ? `?month=${month}` : "";
      const res  = await fetch(`/api/portal/compliance/calendar${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Failed to load calendar");
      setCalendarEvents(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [month, setCalendarEvents]);

  useEffect(() => { fetchCalendar(); }, [fetchCalendar]);

  return { events: calendarEvents, loading, error, refetch: fetchCalendar };
}

export function useComplianceItem(id: string) {
  const [item,    setItem]    = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const updateStatus = useCallback(async (status: string, notes?: string) => {
    try {
      const res  = await fetch(`/api/portal/compliance/${id}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ status, notes }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setItem(json.data);
      return true;
    } catch {
      return false;
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        const res  = await fetch(`/api/portal/compliance/${id}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.error);
        setItem(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return { item, loading, error, updateStatus };
}
