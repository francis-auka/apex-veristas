import mongoose, { Document, Schema, Model, Types } from "mongoose";

export type ComplianceStatus   = "compliant" | "non_compliant" | "in_progress" | "not_applicable" | "overdue";
export type ComplianceCategory = "health" | "safety" | "environment" | "quality";
export type CompliancePriority = "critical" | "high" | "medium" | "low";

export interface IComplianceEvidence {
  documentId?: Types.ObjectId;             // ref → Document
  fileUrl?: string;
  uploadedBy: Types.ObjectId;              // ref → User
  uploadedAt: Date;
  notes?: string;
}

export interface ICompliance extends Document {
  _id: Types.ObjectId;
  company: Types.ObjectId;                 // ref → Company
  regulation: Types.ObjectId;             // ref → Regulation
  title: string;
  description?: string;
  category: ComplianceCategory;
  priority: CompliancePriority;
  status: ComplianceStatus;
  dueDate: Date;
  completedAt?: Date;
  assignedTo?: Types.ObjectId;            // ref → User
  evidence: IComplianceEvidence[];
  notes?: string;
  recurrence?: "none" | "monthly" | "quarterly" | "annually";
  nextDueDate?: Date;
  tags: string[];
  createdBy: Types.ObjectId;              // ref → User
  createdAt: Date;
  updatedAt: Date;
}

const EvidenceSchema = new Schema<IComplianceEvidence>(
  {
    documentId: { type: Schema.Types.ObjectId, ref: "Document" },
    fileUrl:    { type: String },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    uploadedAt: { type: Date, default: Date.now },
    notes:      { type: String },
  },
  { _id: false }
);

const ComplianceSchema = new Schema<ICompliance>(
  {
    company:     { type: Schema.Types.ObjectId, ref: "Company", required: true },
    regulation:  { type: Schema.Types.ObjectId, ref: "Regulation", required: true },
    title:       { type: String, required: true },
    description: { type: String },
    category:    { type: String, enum: ["health","safety","environment","quality"], required: true },
    priority:    { type: String, enum: ["critical","high","medium","low"], default: "medium" },
    status:      { type: String, enum: ["compliant","non_compliant","in_progress","not_applicable","overdue"], default: "non_compliant" },
    dueDate:     { type: Date, required: true },
    completedAt: { type: Date },
    assignedTo:  { type: Schema.Types.ObjectId, ref: "User" },
    evidence:    { type: [EvidenceSchema], default: [] },
    notes:       { type: String },
    recurrence:  { type: String, enum: ["none","monthly","quarterly","annually"], default: "none" },
    nextDueDate: { type: Date },
    tags:        { type: [String], default: [] },
    createdBy:   { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

ComplianceSchema.index({ company: 1, status: 1 });
ComplianceSchema.index({ company: 1, dueDate: 1 });
ComplianceSchema.index({ company: 1, category: 1 });

const Compliance: Model<ICompliance> =
  mongoose.models.Compliance ??
  mongoose.model<ICompliance>("Compliance", ComplianceSchema);

export default Compliance;
