import mongoose, { Document, Schema, Model, Types } from "mongoose";

export type IncidentType     = "accident" | "near_miss" | "hazard" | "environmental" | "quality" | "security";
export type IncidentSeverity = "fatality" | "major_injury" | "minor_injury" | "first_aid" | "property_damage" | "near_miss";
export type IncidentStatus   = "reported" | "under_investigation" | "closed" | "awaiting_review";

export interface IWitness {
  name: string;
  contact?: string;
  statement?: string;
}

export interface IIncident extends Document {
  _id: Types.ObjectId;
  company: Types.ObjectId;               // ref → Company
  title: string;
  description: string;
  incidentType: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  occurredAt: Date;
  location: string;
  department?: string;
  reportedBy: Types.ObjectId;            // ref → User
  reportedAt: Date;
  injuredParty?: string;
  witnesses: IWitness[];
  immediateActions?: string;
  rootCause?: string;
  correctiveActions?: string;
  preventiveActions?: string;
  investigationLead?: Types.ObjectId;    // ref → User
  investigationStartDate?: Date;
  investigationEndDate?: Date;
  attachments: { fileUrl: string; s3Key: string; fileName: string }[];
  lostTimeInjury: boolean;
  lostDays?: number;
  regulatoryNotificationRequired: boolean;
  regulatoryNotifiedAt?: Date;
  closedAt?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const WitnessSchema = new Schema<IWitness>(
  {
    name:      { type: String, required: true },
    contact:   { type: String },
    statement: { type: String },
  },
  { _id: false }
);

const IncidentSchema = new Schema<IIncident>(
  {
    company:                       { type: Schema.Types.ObjectId, ref: "Company", required: true },
    title:                         { type: String, required: true },
    description:                   { type: String, required: true },
    incidentType:                  { type: String, enum: ["accident","near_miss","hazard","environmental","quality","security"], required: true },
    severity:                      { type: String, enum: ["fatality","major_injury","minor_injury","first_aid","property_damage","near_miss"], required: true },
    status:                        { type: String, enum: ["reported","under_investigation","closed","awaiting_review"], default: "reported" },
    occurredAt:                    { type: Date, required: true },
    location:                      { type: String, required: true },
    department:                    { type: String },
    reportedBy:                    { type: Schema.Types.ObjectId, ref: "User", required: true },
    reportedAt:                    { type: Date, default: Date.now },
    injuredParty:                  { type: String },
    witnesses:                     { type: [WitnessSchema], default: [] },
    immediateActions:              { type: String },
    rootCause:                     { type: String },
    correctiveActions:             { type: String },
    preventiveActions:             { type: String },
    investigationLead:             { type: Schema.Types.ObjectId, ref: "User" },
    investigationStartDate:        { type: Date },
    investigationEndDate:          { type: Date },
    attachments: [{
      fileUrl:  { type: String },
      s3Key:    { type: String },
      fileName: { type: String },
    }],
    lostTimeInjury:                { type: Boolean, default: false },
    lostDays:                      { type: Number },
    regulatoryNotificationRequired:{ type: Boolean, default: false },
    regulatoryNotifiedAt:          { type: Date },
    closedAt:                      { type: Date },
    tags:                          { type: [String], default: [] },
  },
  { timestamps: true }
);

IncidentSchema.index({ company: 1, status: 1 });
IncidentSchema.index({ company: 1, occurredAt: -1 });
IncidentSchema.index({ company: 1, severity: 1 });

const Incident: Model<IIncident> =
  mongoose.models.Incident ?? mongoose.model<IIncident>("Incident", IncidentSchema);

export default Incident;
