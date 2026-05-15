import mongoose, { Document, Schema, Model, Types } from "mongoose";

export type RegulationJurisdiction = "Kenya" | "UAE" | "International" | "Both";
export type RegulationCategory     = "health" | "safety" | "environment" | "quality" | "fire" | "labor";

export interface IRegulationClause {
  number: string;                       // e.g. "4.1"
  title: string;
  description: string;
  mandatory: boolean;
}

export interface IRegulation extends Document {
  _id: Types.ObjectId;
  code: string;                         // e.g. "OHS-KE-001", "ISO-45001"
  title: string;
  shortName: string;                    // e.g. "OSHA 2007"
  description: string;
  jurisdiction: RegulationJurisdiction;
  category: RegulationCategory;
  issuingBody: string;                  // e.g. "DOSHS Kenya", "MOHRE UAE"
  effectiveDate: Date;
  reviewDate?: Date;
  documentUrl?: string;                 // external link or S3
  clauses: IRegulationClause[];
  applicableIndustries: string[];
  tags: string[];
  isActive: boolean;
  createdBy: Types.ObjectId;            // ref → User (admin)
  createdAt: Date;
  updatedAt: Date;
}

const ClauseSchema = new Schema<IRegulationClause>(
  {
    number:      { type: String, required: true },
    title:       { type: String, required: true },
    description: { type: String, required: true },
    mandatory:   { type: Boolean, default: true },
  },
  { _id: false }
);

const RegulationSchema = new Schema<IRegulation>(
  {
    code:                  { type: String, required: true, unique: true, uppercase: true },
    title:                 { type: String, required: true },
    shortName:             { type: String, required: true },
    description:           { type: String, required: true },
    jurisdiction:          { type: String, enum: ["Kenya","UAE","International","Both"], required: true },
    category:              { type: String, enum: ["health","safety","environment","quality","fire","labor"], required: true },
    issuingBody:           { type: String, required: true },
    effectiveDate:         { type: Date, required: true },
    reviewDate:            { type: Date },
    documentUrl:           { type: String },
    clauses:               { type: [ClauseSchema], default: [] },
    applicableIndustries:  { type: [String], default: [] },
    tags:                  { type: [String], default: [] },
    isActive:              { type: Boolean, default: true },
    createdBy:             { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

RegulationSchema.index({ jurisdiction: 1, category: 1 });
RegulationSchema.index({ code: 1 });

const Regulation: Model<IRegulation> =
  mongoose.models.Regulation ?? mongoose.model<IRegulation>("Regulation", RegulationSchema);

export default Regulation;
