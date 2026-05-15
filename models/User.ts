import mongoose, { Document, Schema, Model, Types } from "mongoose";

export type UserRole = "admin" | "consultant" | "client_admin" | "client_staff";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  company: Types.ObjectId | null;   // ref → Company
  avatarUrl?: string;
  phone?: string;
  jobTitle?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName:              { type: String, required: true, trim: true },
    lastName:               { type: String, required: true, trim: true },
    email:                  { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash:           { type: String, required: true },
    role:                   { type: String, enum: ["admin","consultant","client_admin","client_staff"], default: "client_staff" },
    company:                { type: Schema.Types.ObjectId, ref: "Company", default: null },
    avatarUrl:              { type: String },
    phone:                  { type: String },
    jobTitle:               { type: String },
    isActive:               { type: Boolean, default: true },
    isEmailVerified:        { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    passwordResetToken:     { type: String },
    passwordResetExpires:   { type: Date },
    lastLoginAt:            { type: Date },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });
UserSchema.index({ company: 1 });

const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
