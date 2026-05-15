import mongoose, { Document, Schema, Model, Types } from "mongoose";

export type PlanTier   = "starter" | "professional" | "enterprise";
export type SubStatus  = "active" | "past_due" | "cancelled" | "trialing" | "paused";
export type BillingCycle = "monthly" | "annual";

export interface ISubscription extends Document {
  _id: Types.ObjectId;
  company: Types.ObjectId;             // ref → Company
  plan: PlanTier;
  status: SubStatus;
  billingCycle: BillingCycle;
  currency: "KES" | "AED" | "USD";
  amount: number;                      // in smallest currency unit (cents/fils)
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  features: string[];                  // list of enabled feature keys
  maxUsers: number;
  maxDocuments: number;
  trialEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    company:               { type: Schema.Types.ObjectId, ref: "Company", required: true },
    plan:                  { type: String, enum: ["starter","professional","enterprise"], required: true },
    status:                { type: String, enum: ["active","past_due","cancelled","trialing","paused"], default: "trialing" },
    billingCycle:          { type: String, enum: ["monthly","annual"], default: "monthly" },
    currency:              { type: String, enum: ["KES","AED","USD"], default: "USD" },
    amount:                { type: Number, required: true },
    stripeCustomerId:      { type: String },
    stripeSubscriptionId:  { type: String },
    stripePriceId:         { type: String },
    currentPeriodStart:    { type: Date, required: true },
    currentPeriodEnd:      { type: Date, required: true },
    cancelAtPeriodEnd:     { type: Boolean, default: false },
    features:              { type: [String], default: [] },
    maxUsers:              { type: Number, default: 5 },
    maxDocuments:          { type: Number, default: 100 },
    trialEnd:              { type: Date },
  },
  { timestamps: true }
);

SubscriptionSchema.index({ company: 1 });
SubscriptionSchema.index({ stripeSubscriptionId: 1 });
SubscriptionSchema.index({ stripeCustomerId: 1 });

const Subscription: Model<ISubscription> =
  mongoose.models.Subscription ??
  mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

export default Subscription;
