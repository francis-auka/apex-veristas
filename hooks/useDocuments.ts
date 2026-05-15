"use client";
import { useState, useEffect, useCallback } from "react";
import type { DocumentSummary } from "@/types/portal";
import type { PaginatedResponse } from "@/types";

interface UseDocumentsOptions {
  page?:     number;
  limit?:    number;
  category?: string;
  status?:   string;
  search?:   string;
}

export function useDocuments(options: UseDocumentsOptions = {}) {
  const { page = 1, limit = 20, category, status, search } = options;

  const [data,    setData]    = useState<PaginatedResponse<DocumentSummary> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page:  String(page),
        limit: String(limit),
        ...(category && { category }),
        ...(status   && { status   }),
        ...(search   && { search   }),
      });
      const res  = await fetch(`/api/portal/documents?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Failed to load documents");
      setData(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, category, status, search]);

  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);

  return { data, loading, error, refetch: fetchDocuments };
}

export function useDocumentUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [error,     setError]     = useState<string | null>(null);

  const upload = useCallback(async (file: File, metadata: Record<string, string>) => {
    setUploading(true);
    setProgress(0);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      Object.entries(metadata).forEach(([k, v]) => formData.append(k, v));

      const res  = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Upload failed");
      setProgress(100);
      return json.data as { fileUrl: string; s3Key: string };
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, progress, error };
}
