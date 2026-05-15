import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import crypto from "crypto";

/* ─── Tailwind class merging ─────────────────────────────────────────── */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ─── Password hashing ───────────────────────────────────────────────── */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/* ─── Token generation ───────────────────────────────────────────────── */
export function generateToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

/* ─── Slug generation ────────────────────────────────────────────────── */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ─── Date / time helpers ────────────────────────────────────────────── */
export function formatDate(
  date: Date | string,
  locale: string = "en-KE"
): string {
  return new Intl.DateTimeFormat(locale, {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  }).format(new Date(date));
}

export function formatDateTime(
  date: Date | string,
  locale: string = "en-KE"
): string {
  return new Intl.DateTimeFormat(locale, {
    day:    "numeric",
    month:  "short",
    year:   "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function daysUntil(date: Date | string): number {
  const now    = new Date();
  const target = new Date(date);
  const diff   = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isOverdue(date: Date | string): boolean {
  return new Date(date) < new Date();
}

/* ─── File / size helpers ────────────────────────────────────────────── */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k     = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i     = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "text/plain",
  "text/csv",
  "video/mp4",
];

export const MAX_FILE_SIZE_MB = 50;

/* ─── Compliance score helpers ───────────────────────────────────────── */
export function getComplianceColor(score: number): string {
  if (score >= 80) return "#2E7D32"; // green-dark
  if (score >= 60) return "#F59E0B"; // amber
  return "#DC2626"; // red
}

export function getComplianceBadge(score: number): string {
  if (score >= 80) return "Compliant";
  if (score >= 60) return "Needs Attention";
  return "Non-Compliant";
}

/* ─── API response helpers ───────────────────────────────────────────── */
export function apiSuccess<T>(data: T, message?: string) {
  return { success: true, data, message };
}

export function apiError(message: string, code?: string) {
  return { success: false, error: message, code };
}

/* ─── Pagination ─────────────────────────────────────────────────────── */
export function getPaginationMeta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  };
}
