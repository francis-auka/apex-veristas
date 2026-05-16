import mongoose, { Document, Schema, Model, Types } from "mongoose";

export type CompanyCountry = "Kenya" | "UAE" | "Other";
export type CompanyStatus   = "active" | "suspended" | "trial" | "cancelled";

export interface ICompany extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  logoUrl?: string;
  country: CompanyCountry;
  industry: string;
  registrationNumber?: string;
  address?: string;
  website?: string;
  contactEmail: string;
  contactPhone?: string;
  status: CompanyStatus;
  subscription: Types.ObjectId | null;   // ref → Subscription
  complianceScore: number;               // 0-100
  assignedConsultant?: Types.ObjectId;   // ref → User
  settings: {
    notificationsEnabled: boolean;
    timezone: string;
    reportingFrequency: "weekly" | "monthly" | "quarterly";
  };
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    name:                 { type: String, required: true, trim: true },
    slug:                 { type: String, required: true, unique: true, lowercase: true },
    logoUrl:              { type: String },
    country:              { type: String, enum: ["Kenya","UAE","Other"], required: true },
    industry:             { type: String, required: true },
    registrationNumber:   { type: String },
    address:              { type: String },
    website:              { type: String },
    contactEmail:         { type: String, required: true, lowercase: true },
    contactPhone:         { type: String },
    status:               { type: String, enum: ["active","suspended","trial","cancelled"], default: "trial" },
    subscription:         { type: Schema.Types.ObjectId, ref: "Subscription", default: null },
    complianceScore:      { type: Number, min: 0, max: 100, default: 0 },
    assignedConsultant:   { type: Schema.Types.ObjectId, ref: "User" },
    settings: {
      notificationsEnabled: { type: Boolean, default: true },
      timezone:             { type: String, default: "Africa/Nairobi" },
      reportingFrequency:   { type: String, enum: ["weekly","monthly","quarterly"], default: "monthly" },
    },
  },
  { timestamps: true }
);

CompanySchema.index({ country: 1, status: 1 });

const Company: Model<ICompany> =
  mongoose.models.Company ?? mongoose.model<ICompany>("Company", CompanySchema);

export default Company;
