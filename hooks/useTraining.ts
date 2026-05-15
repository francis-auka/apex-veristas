"use client";
import { useState, useEffect, useCallback } from "react";

interface TrainingItem {
  id:             string;
  title:          string;
  category:       string;
  deliveryMethod: string;
  status:         string;
  scheduledDate:  string;
  attendeesCount: number;
  passRate?:      number;
  isMandatory:    boolean;
}

interface TrainingData {
  items:      TrainingItem[];
  total:      number;
  page:       number;
  totalPages: number;
  hasPrev:    boolean;
  hasNext:    boolean;
}

interface UseTrainingOptions {
  page?:    number;
  limit?:   number;
  status?:  string;
  search?:  string;
}

export function useTraining(opts: UseTrainingOptions = {}) {
  const { page = 1, limit = 20, status, search } = opts;
  const [data,    setData]    = useState<TrainingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (status) params.set("status", status);
      if (search) params.set("search", search);
      const res  = await fetch(`/api/portal/training?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setData(json.data);
    } catch (e: any) {
      setError(e.message ?? "Failed to load training");
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, search]);

  useEffect(() => { fetch_(); }, [fetch_]);
  return { data, loading, error, refetch: fetch_ };
}
