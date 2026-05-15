import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Company from "@/models/Company";
import Subscription from "@/models/Subscription";
import { apiSuccess, apiError, getPaginationMeta } from "@/lib/utils";

// GET /api/admin/clients
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(apiError("Forbidden"), { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page    = Math.max(1, parseInt(searchParams.get("page")    ?? "1"));
    const limit   = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
    const status  = searchParams.get("status")  ?? undefined;
    const country = searchParams.get("country") ?? undefined;
    const search  = searchParams.get("search")  ?? undefined;

    const filter: Record<string, any> = {};
    if (status)  filter.status  = status;
    if (country) filter.country = country;
    if (search)  filter.name    = { $regex: search, $options: "i" };

    await connectDB();

    const [companies, total] = await Promise.all([
      Company.find(filter)
        .populate("subscription", "plan status billingCycle")
        .populate("assignedConsultant", "firstName lastName")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Company.countDocuments(filter),
    ]);

    const items = companies.map((c: any) => ({
      id:               c._id.toString(),
      companyName:      c.name,
      country:          c.country,
      industry:         c.industry,
      status:           c.status,
      plan:             c.subscription?.plan ?? "none",
      complianceScore:  c.complianceScore,
      userCount:        0, // TODO: join with User model
      joinedAt:         c.createdAt?.toISOString(),
      assignedConsultant: c.assignedConsultant
        ? `${c.assignedConsultant.firstName} ${c.assignedConsultant.lastName}`
        : undefined,
    }));

    return NextResponse.json(apiSuccess({ items, ...getPaginationMeta(total, page, limit) }));
  } catch (err: any) {
    console.error("[admin/clients GET]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}

// POST /api/admin/clients
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(apiError("Forbidden"), { status: 403 });
    }

    const body = await req.json();
    await connectDB();

    const company = await Company.create(body);
    return NextResponse.json(apiSuccess(company), { status: 201 });
  } catch (err: any) {
    console.error("[admin/clients POST]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}
