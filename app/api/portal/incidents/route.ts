import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Incident from "@/models/Incident";
import { apiSuccess, apiError, getPaginationMeta } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

    const { searchParams } = new URL(req.url);
    const page     = Math.max(1, parseInt(searchParams.get("page")     ?? "1"));
    const limit    = Math.min(100, parseInt(searchParams.get("limit")  ?? "20"));
    const status   = searchParams.get("status")   ?? undefined;
    const severity = searchParams.get("severity") ?? undefined;
    const type     = searchParams.get("type")     ?? undefined;
    const search   = searchParams.get("search")   ?? undefined;

    const filter: Record<string, any> = { company: session.user.companyId };
    if (status)   filter.status       = status;
    if (severity) filter.severity     = severity;
    if (type)     filter.incidentType = type;
    if (search)   filter.title        = { $regex: search, $options: "i" };

    await connectDB();

    const [incidents, total] = await Promise.all([
      Incident.find(filter)
        .select("title incidentType severity status occurredAt location reportedBy lostTimeInjury")
        .populate("reportedBy", "firstName lastName")
        .sort({ occurredAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Incident.countDocuments(filter),
    ]);

    const items = incidents.map((i: any) => ({
      id:            i._id.toString(),
      title:         i.title,
      incidentType:  i.incidentType,
      severity:      i.severity,
      status:        i.status,
      occurredAt:    i.occurredAt?.toISOString(),
      location:      i.location,
      reportedBy:    `${i.reportedBy?.firstName ?? ""} ${i.reportedBy?.lastName ?? ""}`.trim(),
      lostTimeInjury:i.lostTimeInjury,
    }));

    return NextResponse.json(apiSuccess({ items, ...getPaginationMeta(total, page, limit) }));
  } catch (err: any) {
    console.error("[incidents GET]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

    const body = await req.json();
    await connectDB();

    const incident = await Incident.create({
      ...body,
      company:    session.user.companyId,
      reportedBy: session.user.id,
      reportedAt: new Date(),
    });

    return NextResponse.json(apiSuccess(incident), { status: 201 });
  } catch (err: any) {
    console.error("[incidents POST]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}
