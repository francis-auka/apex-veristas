import mongoose, { Document, Schema, Model, Types } from "mongoose";

export type TaskStatus   = "todo" | "in_progress" | "review" | "done" | "blocked";
export type TaskPriority = "urgent" | "high" | "medium" | "low";
export type TaskSource   = "compliance" | "audit" | "incident" | "training" | "manual";

export interface ITaskComment {
  author: Types.ObjectId;               // ref → User
  text: string;
  createdAt: Date;
}

export interface ITask extends Document {
  _id: Types.ObjectId;
  company: Types.ObjectId;              // ref → Company
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  source: TaskSource;
  sourceRef?: Types.ObjectId;           // ID of related doc/audit/incident
  assignedTo?: Types.ObjectId;          // ref → User
  createdBy: Types.ObjectId;            // ref → User
  dueDate?: Date;
  completedAt?: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  attachments: { fileUrl: string; fileName: string }[];
  comments: ITaskComment[];
  order: number;                        // for kanban column ordering
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<ITaskComment>(
  {
    author:    { type: Schema.Types.ObjectId, ref: "User", required: true },
    text:      { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const TaskSchema = new Schema<ITask>(
  {
    company:       { type: Schema.Types.ObjectId, ref: "Company", required: true },
    title:         { type: String, required: true },
    description:   { type: String },
    status:        { type: String, enum: ["todo","in_progress","review","done","blocked"], default: "todo" },
    priority:      { type: String, enum: ["urgent","high","medium","low"], default: "medium" },
    source:        { type: String, enum: ["compliance","audit","incident","training","manual"], default: "manual" },
    sourceRef:     { type: Schema.Types.ObjectId },
    assignedTo:    { type: Schema.Types.ObjectId, ref: "User" },
    createdBy:     { type: Schema.Types.ObjectId, ref: "User", required: true },
    dueDate:       { type: Date },
    completedAt:   { type: Date },
    estimatedHours:{ type: Number },
    actualHours:   { type: Number },
    tags:          { type: [String], default: [] },
    attachments: [{
      fileUrl:  { type: String },
      fileName: { type: String },
    }],
    comments:      { type: [CommentSchema], default: [] },
    order:         { type: Number, default: 0 },
  },
  { timestamps: true }
);

TaskSchema.index({ company: 1, status: 1 });
TaskSchema.index({ company: 1, assignedTo: 1 });
TaskSchema.index({ dueDate: 1 });

const Task: Model<ITask> =
  mongoose.models.Task ?? mongoose.model<ITask>("Task", TaskSchema);

export default Task;
