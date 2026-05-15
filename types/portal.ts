import type { IUser, ICompany } from "@/types";
import type { Types } from "mongoose";

// ─── Dashboard stats returned by portal API ───────────────────────────
export interface DashboardStats {
  complianceScore:         number;
  openIncidents:           number;
  upcomingAudits:          number;
  expiringDocuments:       number;
  overdueCompliance:       number;
  trainingCompletionRate:  number;
  openTasks:               number;
  pendingActions:          number;
}

// ─── Compliance calendar event ────────────────────────────────────────
export interface CalendarEvent {
  id:       string;
  title:    string;
  date:     string;           // ISO date string
  category: "compliance" | "audit" | "training" | "review";
  status:   string;
  priority: string;
}

// ─── Audit summary for listing ────────────────────────────────────────
export interface AuditSummary {
  id:            string;
  title:         string;
  auditType:     string;
  status:        string;
  scheduledDate: string;
  standard?:     string;
  findingsCount: number;
  criticalCount: number;
  score?:        number;
}

// ─── Incident summary for table ───────────────────────────────────────
export interface IncidentSummary {
  id:            string;
  title:         string;
  incidentType:  string;
  severity:      string;
  status:        string;
  occurredAt:    string;
  location:      string;
  reportedBy:    string;
  lostTimeInjury: boolean;
}

// ─── Document summary for table ───────────────────────────────────────
export interface DocumentSummary {
  id:           string;
  title:        string;
  category:     string;
  status:       string;
  version:      string;
  fileName:     string;
  fileSize:     number;
  expiryDate?:  string;
  uploadedBy:   string;
  updatedAt:    string;
}

// ─── Training summary ─────────────────────────────────────────────────
export interface TrainingSummary {
  id:              string;
  title:           string;
  category:        string;
  deliveryMethod:  string;
  status:          string;
  scheduledDate:   string;
  attendeesCount:  number;
  passRate?:       number;
  isMandatory:     boolean;
}

// ─── Kanban task ──────────────────────────────────────────────────────
export interface KanbanTask {
  id:         string;
  title:      string;
  priority:   string;
  assignedTo?: { name: string; avatarUrl?: string };
  dueDate?:   string;
  source:     string;
  tags:       string[];
}

export type KanbanBoard = Record<string, KanbanTask[]>;

// ─── Message thread ───────────────────────────────────────────────────
export interface Message {
  id:         string;
  from:       Pick<IUser, "firstName" | "lastName" | "avatarUrl">;
  subject:    string;
  body:       string;
  read:       boolean;
  sentAt:     string;
  attachments?: { fileName: string; fileUrl: string }[];
}

// ─── Report filters ───────────────────────────────────────────────────
export interface ReportFilters {
  dateFrom?:  string;
  dateTo?:    string;
  category?:  string;
  status?:    string;
  type?:      string;
}
