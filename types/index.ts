// ─── Re-export model types for convenience ────────────────────────────
export type { IUser, UserRole }               from "@/models/User";
export type { ICompany, CompanyCountry, CompanyStatus } from "@/models/Company";
export type { ISubscription, PlanTier, SubStatus, BillingCycle } from "@/models/Subscription";
export type { ICompliance, ComplianceStatus, ComplianceCategory, CompliancePriority } from "@/models/Compliance";
export type { IDocument, DocumentCategory, DocumentStatus } from "@/models/Document";
export type { IAudit, AuditType, AuditStatus, IAuditFinding, FindingSeverity } from "@/models/Audit";
export type { IIncident, IncidentType, IncidentSeverity, IncidentStatus } from "@/models/Incident";
export type { ITraining, TrainingStatus, TrainingDelivery, ITrainingAttendee } from "@/models/Training";
export type { ITask, TaskStatus, TaskPriority, TaskSource } from "@/models/Task";
export type { IRegulation, RegulationJurisdiction, RegulationCategory } from "@/models/Regulation";

// ─── Shared UI / generic types ────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success:  boolean;
  data?:    T;
  error?:   string;
  message?: string;
  code?:    string;
}

export interface PaginatedResponse<T> {
  items:       T[];
  total:       number;
  page:        number;
  limit:       number;
  totalPages:  number;
  hasNext:     boolean;
  hasPrev:     boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type SortOrder = "asc" | "desc";

export interface TableColumn<T> {
  key:       keyof T | string;
  label:     string;
  sortable?: boolean;
  width?:    string;
  render?:   (value: unknown, row: T) => React.ReactNode;
}

export interface FileUploadResult {
  fileUrl:  string;
  s3Key:    string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

// ─── Notification type ────────────────────────────────────────────────
export type NotificationLevel = "info" | "warning" | "error" | "success";

export interface AppNotification {
  id:        string;
  title:     string;
  message:   string;
  level:     NotificationLevel;
  read:      boolean;
  link?:     string;
  createdAt: Date;
}
