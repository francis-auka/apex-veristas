import mongoose, { Document as MongoDocument, Schema, Model, Types } from "mongoose";

export type DocumentCategory =
  | "policy"
  | "procedure"
  | "form"
  | "certificate"
  | "report"
  | "permit"
  | "risk_assessment"
  | "msds"
  | "other";

export type DocumentStatus = "draft" | "active" | "archived" | "expired";

export interface IDocumentVersion {
  version: string;
  fileUrl: string;
  s3Key: string;
  uploadedBy: Types.ObjectId;
  uploadedAt: Date;
  notes?: string;
}

export interface IDocument extends MongoDocument {
  _id: Types.ObjectId;
  company: Types.ObjectId;             // ref → Company
  title: string;
  description?: string;
  category: DocumentCategory;
  status: DocumentStatus;
  fileUrl: string;
  s3Key: string;
  fileName: string;
  fileSize: number;                    // bytes
  mimeType: string;
  version: string;
  versions: IDocumentVersion[];
  expiryDate?: Date;
  reviewDate?: Date;
  tags: string[];
  isTemplate: boolean;
  uploadedBy: Types.ObjectId;          // ref → User
  approvedBy?: Types.ObjectId;         // ref → User
  approvedAt?: Date;
  relatedCompliance?: Types.ObjectId;  // ref → Compliance
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const VersionSchema = new Schema<IDocumentVersion>(
  {
    version:    { type: String, required: true },
    fileUrl:    { type: String, required: true },
    s3Key:      { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    uploadedAt: { type: Date, default: Date.now },
    notes:      { type: String },
  },
  { _id: false }
);

const DocumentSchema = new Schema<IDocument>(
  {
    company:          { type: Schema.Types.ObjectId, ref: "Company", required: true },
    title:            { type: String, required: true, trim: true },
    description:      { type: String },
    category:         { type: String, enum: ["policy","procedure","form","certificate","report","permit","risk_assessment","msds","other"], required: true },
    status:           { type: String, enum: ["draft","active","archived","expired"], default: "draft" },
    fileUrl:          { type: String, required: true },
    s3Key:            { type: String, required: true },
    fileName:         { type: String, required: true },
    fileSize:         { type: Number, required: true },
    mimeType:         { type: String, required: true },
    version:          { type: String, default: "1.0" },
    versions:         { type: [VersionSchema], default: [] },
    expiryDate:       { type: Date },
    reviewDate:       { type: Date },
    tags:             { type: [String], default: [] },
    isTemplate:       { type: Boolean, default: false },
    uploadedBy:       { type: Schema.Types.ObjectId, ref: "User", required: true },
    approvedBy:       { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt:       { type: Date },
    relatedCompliance:{ type: Schema.Types.ObjectId, ref: "Compliance" },
    downloadCount:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

DocumentSchema.index({ company: 1, category: 1 });
DocumentSchema.index({ company: 1, status: 1 });
DocumentSchema.index({ expiryDate: 1 });

const DocumentModel: Model<IDocument> =
  mongoose.models.Document ??
  mongoose.model<IDocument>("Document", DocumentSchema);

export default DocumentModel;
