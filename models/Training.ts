import mongoose, { Document, Schema, Model, Types } from "mongoose";

export type TrainingStatus     = "scheduled" | "in_progress" | "completed" | "cancelled";
export type TrainingDelivery   = "online" | "classroom" | "on_the_job" | "blended";
export type AttendeeStatus     = "enrolled" | "attended" | "passed" | "failed" | "absent";

export interface ITrainingAttendee {
  user: Types.ObjectId;                  // ref → User
  status: AttendeeStatus;
  score?: number;
  certificateUrl?: string;
  completedAt?: Date;
  expiryDate?: Date;
}

export interface ITraining extends Document {
  _id: Types.ObjectId;
  company: Types.ObjectId;              // ref → Company
  title: string;
  description?: string;
  category: string;                     // e.g. "Fire Safety", "First Aid", "ISO 45001"
  deliveryMethod: TrainingDelivery;
  status: TrainingStatus;
  provider?: string;
  trainer?: string;
  scheduledDate: Date;
  duration: number;                     // minutes
  location?: string;
  maxAttendees?: number;
  attendees: ITrainingAttendee[];
  materials: { title: string; fileUrl: string; s3Key: string }[];
  isMandatory: boolean;
  validityPeriodMonths?: number;        // how long cert is valid
  passScore?: number;                   // percentage
  tags: string[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AttendeeSchema = new Schema<ITrainingAttendee>(
  {
    user:           { type: Schema.Types.ObjectId, ref: "User", required: true },
    status:         { type: String, enum: ["enrolled","attended","passed","failed","absent"], default: "enrolled" },
    score:          { type: Number },
    certificateUrl: { type: String },
    completedAt:    { type: Date },
    expiryDate:     { type: Date },
  },
  { _id: false }
);

const TrainingSchema = new Schema<ITraining>(
  {
    company:              { type: Schema.Types.ObjectId, ref: "Company", required: true },
    title:                { type: String, required: true },
    description:          { type: String },
    category:             { type: String, required: true },
    deliveryMethod:       { type: String, enum: ["online","classroom","on_the_job","blended"], required: true },
    status:               { type: String, enum: ["scheduled","in_progress","completed","cancelled"], default: "scheduled" },
    provider:             { type: String },
    trainer:              { type: String },
    scheduledDate:        { type: Date, required: true },
    duration:             { type: Number, required: true },
    location:             { type: String },
    maxAttendees:         { type: Number },
    attendees:            { type: [AttendeeSchema], default: [] },
    materials: [{
      title:   { type: String },
      fileUrl: { type: String },
      s3Key:   { type: String },
    }],
    isMandatory:          { type: Boolean, default: false },
    validityPeriodMonths: { type: Number },
    passScore:            { type: Number },
    tags:                 { type: [String], default: [] },
    createdBy:            { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

TrainingSchema.index({ company: 1, status: 1 });
TrainingSchema.index({ company: 1, scheduledDate: -1 });

const Training: Model<ITraining> =
  mongoose.models.Training ?? mongoose.model<ITraining>("Training", TrainingSchema);

export default Training;
