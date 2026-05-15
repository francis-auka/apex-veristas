"use client";
import { useState, useEffect, useCallback } from "react";
import type { AuditSummary } from "@/types/portal";
import type { PaginatedResponse } from "@/types";

interface UseAuditsOptions {
  page?:    number;
  limit?:   number;
  status?:  string;
  type?:    string;
  search?:  string;
}

export function useAudits(options: UseAuditsOptions = {}) {
  const { page = 1, limit = 20, status, type, search } = options;

  const [data,    setData]    = useState<PaginatedResponse<AuditSummary> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const fetchAudits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page:  String(page),
        limit: String(limit),
        ...(status && { status }),
        ...(type   && { type   }),
        ...(search && { search }),
      });
      const res  = await fetch(`/api/portal/audits?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Failed to load audits");
      setData(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, type, search]);

  useEffect(() => { fetchAudits(); }, [fetchAudits]);

  return { data, loading, error, refetch: fetchAudits };
}

export function useAudit(id: string) {
  const [audit,   setAudit]   = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res  = await fetch(`/api/portal/audits/${id}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.error ?? "Audit not found");
        setAudit(json.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return { audit, loading, error };
}
