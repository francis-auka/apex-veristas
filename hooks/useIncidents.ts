"use client";
import { useState, useEffect, useCallback } from "react";
import type { IncidentSummary } from "@/types/portal";
import type { PaginatedResponse } from "@/types";

interface UseIncidentsOptions {
  page?:     number;
  limit?:    number;
  status?:   string;
  severity?: string;
  type?:     string;
  search?:   string;
}

export function useIncidents(options: UseIncidentsOptions = {}) {
  const { page = 1, limit = 20, status, severity, type, search } = options;

  const [data,    setData]    = useState<PaginatedResponse<IncidentSummary> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page:  String(page),
        limit: String(limit),
        ...(status   && { status   }),
        ...(severity && { severity }),
        ...(type     && { type     }),
        ...(search   && { search   }),
      });
      const res  = await fetch(`/api/portal/incidents?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Failed to load incidents");
      setData(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, severity, type, search]);

  useEffect(() => { fetchIncidents(); }, [fetchIncidents]);

  return { data, loading, error, refetch: fetchIncidents };
}

export function useIncidentReport() {
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const report = useCallback(async (payload: Record<string, unknown>) => {
    setSubmitting(true);
    setError(null);
    try {
      const res  = await fetch("/api/portal/incidents", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Failed to submit incident");
      return json.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { report, submitting, error };
}
