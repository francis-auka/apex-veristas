import type { ICompany, IUser, ISubscription } from "@/types";

// ─── Admin dashboard stats ────────────────────────────────────────────
export interface AdminStats {
  totalClients:          number;
  activeSubscriptions:   number;
  mrr:                   number;    // Monthly Recurring Revenue (USD)
  churnRate:             number;    // percentage
  totalIncidents:        number;
  avgComplianceScore:    number;
  totalDocuments:        number;
  newClientsThisMonth:   number;
}

// ─── Client record for admin table ───────────────────────────────────
export interface ClientRecord {
  id:               string;
  companyName:      string;
  country:          string;
  industry:         string;
  status:           string;
  plan:             string;
  complianceScore:  number;
  userCount:        number;
  joinedAt:         string;
  assignedConsultant?: string;
}

// ─── Subscription management ──────────────────────────────────────────
export interface SubscriptionRecord {
  id:                   string;
  companyName:          string;
  plan:                 string;
  status:               string;
  billingCycle:         string;
  currency:             string;
  amount:               number;
  currentPeriodEnd:     string;
  cancelAtPeriodEnd:    boolean;
  stripeSubscriptionId?: string;
}

// ─── Team member for admin ────────────────────────────────────────────
export interface TeamMember {
  id:         string;
  name:       string;
  email:      string;
  role:       string;
  isActive:   boolean;
  clientCount: number;
  joinedAt:   string;
  lastLoginAt?: string;
  avatarUrl?:  string;
}

// ─── Regulation management ────────────────────────────────────────────
export interface RegulationRecord {
  id:           string;
  code:         string;
  title:        string;
  shortName:    string;
  jurisdiction: string;
  category:     string;
  issuingBody:  string;
  effectiveDate: string;
  isActive:     boolean;
}

// ─── Analytics chart data ─────────────────────────────────────────────
export interface ChartDataPoint {
  label:  string;
  value:  number;
  color?: string;
}

export interface LineChartData {
  labels:   string[];
  datasets: {
    label:           string;
    data:            number[];
    borderColor?:    string;
    backgroundColor?: string;
  }[];
}

// ─── Content management ───────────────────────────────────────────────
export interface ContentItem {
  id:          string;
  type:        "blog" | "guide" | "template" | "regulation_update";
  title:       string;
  slug:        string;
  status:      "draft" | "published" | "archived";
  publishedAt?: string;
  author:      string;
  tags:        string[];
}

// ─── Notification template for admin ─────────────────────────────────
export interface NotificationTemplate {
  id:       string;
  name:     string;
  subject:  string;
  trigger:  string;        // e.g. "compliance.overdue", "subscription.expiring"
  isActive: boolean;
}
