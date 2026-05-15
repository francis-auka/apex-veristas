import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Audit from "@/models/Audit";
import { apiSuccess, apiError, getPaginationMeta } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

    const { searchParams } = new URL(req.url);
    const page   = Math.max(1, parseInt(searchParams.get("page")  ?? "1"));
    const limit  = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
    const status = searchParams.get("status") ?? undefined;
    const type   = searchParams.get("type")   ?? undefined;
    const search = searchParams.get("search") ?? undefined;

    const filter: Record<string, any> = { company: session.user.companyId };
    if (status) filter.status    = status;
    if (type)   filter.auditType = type;
    if (search) filter.title     = { $regex: search, $options: "i" };

    await connectDB();

    const [audits, total] = await Promise.all([
      Audit.find(filter)
        .select("title auditType status scheduledDate standard findings score")
        .sort({ scheduledDate: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Audit.countDocuments(filter),
    ]);

    const items = audits.map((a: any) => ({
      id:            a._id.toString(),
      title:         a.title,
      auditType:     a.auditType,
      status:        a.status,
      scheduledDate: a.scheduledDate?.toISOString(),
      standard:      a.standard,
      findingsCount: a.findings?.length ?? 0,
      criticalCount: a.findings?.filter((f: any) => f.severity === "critical").length ?? 0,
      score:         a.score,
    }));

    return NextResponse.json(apiSuccess({ items, ...getPaginationMeta(total, page, limit) }));
  } catch (err: any) {
    console.error("[audits GET]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

    const body = await req.json();
    await connectDB();

    const audit = await Audit.create({
      ...body,
      company:    session.user.companyId,
      createdBy:  session.user.id,
      leadAuditor: body.leadAuditor ?? session.user.id,
    });

    return NextResponse.json(apiSuccess(audit), { status: 201 });
  } catch (err: any) {
    console.error("[audits POST]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}
