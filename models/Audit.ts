import mongoose, { Document, Schema, Model, Types } from "mongoose";

export type AuditType    = "internal" | "external" | "regulatory" | "surveillance" | "certification";
export type AuditStatus  = "planned" | "in_progress" | "completed" | "cancelled";
export type FindingSeverity = "critical" | "major" | "minor" | "observation";
export type FindingStatus   = "open" | "in_progress" | "closed" | "verified";

export interface IAuditFinding {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  severity: FindingSeverity;
  status: FindingStatus;
  clause?: string;                        // ISO clause reference
  correctiveAction?: string;
  assignedTo?: Types.ObjectId;            // ref → User
  dueDate?: Date;
  closedAt?: Date;
  evidence?: string;
}

export interface IAudit extends Document {
  _id: Types.ObjectId;
  company: Types.ObjectId;               // ref → Company
  title: string;
  auditType: AuditType;
  status: AuditStatus;
  standard?: string;                     // e.g. "ISO 45001", "ISO 14001"
  scope: string;
  scheduledDate: Date;
  startDate?: Date;
  endDate?: Date;
  leadAuditor: Types.ObjectId;           // ref → User
  auditTeam: Types.ObjectId[];           // ref → User[]
  auditee?: string;
  location?: string;
  findings: IAuditFinding[];
  score?: number;                        // 0–100
  summary?: string;
  recommendations?: string;
  reportUrl?: string;                    // S3 URL
  reportS3Key?: string;
  tags: string[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FindingSchema = new Schema<IAuditFinding>(
  {
    title:            { type: String, required: true },
    description:      { type: String, required: true },
    severity:         { type: String, enum: ["critical","major","minor","observation"], required: true },
    status:           { type: String, enum: ["open","in_progress","closed","verified"], default: "open" },
    clause:           { type: String },
    correctiveAction: { type: String },
    assignedTo:       { type: Schema.Types.ObjectId, ref: "User" },
    dueDate:          { type: Date },
    closedAt:         { type: Date },
    evidence:         { type: String },
  },
  { timestamps: true }
);

const AuditSchema = new Schema<IAudit>(
  {
    company:       { type: Schema.Types.ObjectId, ref: "Company", required: true },
    title:         { type: String, required: true },
    auditType:     { type: String, enum: ["internal","external","regulatory","surveillance","certification"], required: true },
    status:        { type: String, enum: ["planned","in_progress","completed","cancelled"], default: "planned" },
    standard:      { type: String },
    scope:         { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    startDate:     { type: Date },
    endDate:       { type: Date },
    leadAuditor:   { type: Schema.Types.ObjectId, ref: "User", required: true },
    auditTeam:     [{ type: Schema.Types.ObjectId, ref: "User" }],
    auditee:       { type: String },
    location:      { type: String },
    findings:      { type: [FindingSchema], default: [] },
    score:         { type: Number, min: 0, max: 100 },
    summary:       { type: String },
    recommendations:{ type: String },
    reportUrl:     { type: String },
    reportS3Key:   { type: String },
    tags:          { type: [String], default: [] },
    createdBy:     { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

AuditSchema.index({ company: 1, status: 1 });
AuditSchema.index({ company: 1, scheduledDate: -1 });

const Audit: Model<IAudit> =
  mongoose.models.Audit ?? mongoose.model<IAudit>("Audit", AuditSchema);

export default Audit;
