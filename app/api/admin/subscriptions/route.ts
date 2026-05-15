import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Subscription from "@/models/Subscription";
import Company from "@/models/Company";
import { apiSuccess, apiError, getPaginationMeta } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(apiError("Forbidden"), { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page   = Math.max(1, parseInt(searchParams.get("page")  ?? "1"));
    const limit  = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
    const status = searchParams.get("status") ?? undefined;
    const plan   = searchParams.get("plan")   ?? undefined;

    const filter: Record<string, any> = {};
    if (status) filter.status = status;
    if (plan)   filter.plan   = plan;

    await connectDB();

    const [subs, total] = await Promise.all([
      Subscription.find(filter)
        .populate("company", "name")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Subscription.countDocuments(filter),
    ]);

    const items = subs.map((s: any) => ({
      id:                   s._id.toString(),
      companyName:          s.company?.name ?? "Unknown",
      plan:                 s.plan,
      status:               s.status,
      billingCycle:         s.billingCycle,
      currency:             s.currency,
      amount:               s.amount,
      currentPeriodEnd:     s.currentPeriodEnd?.toISOString(),
      cancelAtPeriodEnd:    s.cancelAtPeriodEnd,
      stripeSubscriptionId: s.stripeSubscriptionId,
    }));

    return NextResponse.json(apiSuccess({ items, ...getPaginationMeta(total, page, limit) }));
  } catch (err: any) {
    console.error("[admin/subscriptions GET]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}
