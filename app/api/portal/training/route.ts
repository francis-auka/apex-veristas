import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Training from "@/models/Training";
import { apiSuccess, apiError, getPaginationMeta } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

    const { searchParams } = new URL(req.url);
    const page   = Math.max(1, parseInt(searchParams.get("page")  ?? "1"));
    const limit  = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
    const status = searchParams.get("status")   ?? undefined;
    const search = searchParams.get("search")   ?? undefined;

    const filter: Record<string, any> = { company: session.user.companyId };
    if (status) filter.status = status;
    if (search) filter.title  = { $regex: search, $options: "i" };

    await connectDB();

    const [trainings, total] = await Promise.all([
      Training.find(filter)
        .select("title category deliveryMethod status scheduledDate attendees isMandatory")
        .sort({ scheduledDate: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Training.countDocuments(filter),
    ]);

    const items = trainings.map((t: any) => {
      const passed   = t.attendees?.filter((a: any) => a.status === "passed").length ?? 0;
      const total    = t.attendees?.length ?? 0;
      const passRate = total > 0 ? Math.round((passed / total) * 100) : undefined;
      return {
        id:             t._id.toString(),
        title:          t.title,
        category:       t.category,
        deliveryMethod: t.deliveryMethod,
        status:         t.status,
        scheduledDate:  t.scheduledDate?.toISOString(),
        attendeesCount: total,
        passRate,
        isMandatory:    t.isMandatory,
      };
    });

    return NextResponse.json(apiSuccess({ items, ...getPaginationMeta(total, page, limit) }));
  } catch (err: any) {
    console.error("[training GET]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

    const body = await req.json();
    await connectDB();

    const training = await Training.create({
      ...body,
      company:   session.user.companyId,
      createdBy: session.user.id,
    });

    return NextResponse.json(apiSuccess(training), { status: 201 });
  } catch (err: any) {
    console.error("[training POST]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}
