import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import DocumentModel from "@/models/Document";
import { apiSuccess, apiError, getPaginationMeta } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

    const { searchParams } = new URL(req.url);
    const page     = Math.max(1, parseInt(searchParams.get("page")  ?? "1"));
    const limit    = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
    const category = searchParams.get("category") ?? undefined;
    const status   = searchParams.get("status")   ?? undefined;
    const search   = searchParams.get("search")   ?? undefined;

    const filter: Record<string, any> = { company: session.user.companyId };
    if (category) filter.category = category;
    if (status)   filter.status   = status;
    if (search)   filter.title    = { $regex: search, $options: "i" };

    await connectDB();

    const [docs, total] = await Promise.all([
      DocumentModel.find(filter)
        .select("title category status version fileName fileSize expiryDate uploadedBy updatedAt")
        .populate("uploadedBy", "firstName lastName")
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      DocumentModel.countDocuments(filter),
    ]);

    const items = docs.map((d: any) => ({
      id:          d._id.toString(),
      title:       d.title,
      category:    d.category,
      status:      d.status,
      version:     d.version,
      fileName:    d.fileName,
      fileSize:    d.fileSize,
      expiryDate:  d.expiryDate?.toISOString(),
      uploadedBy:  `${d.uploadedBy?.firstName ?? ""} ${d.uploadedBy?.lastName ?? ""}`.trim(),
      updatedAt:   d.updatedAt?.toISOString(),
    }));

    return NextResponse.json(apiSuccess({
      items,
      ...getPaginationMeta(total, page, limit),
    }));
  } catch (err: any) {
    console.error("[documents GET]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json(apiError("Unauthorized"), { status: 401 });

    const body = await req.json();
    await connectDB();

    const doc = await DocumentModel.create({
      ...body,
      company:    session.user.companyId,
      uploadedBy: session.user.id,
    });

    return NextResponse.json(apiSuccess(doc), { status: 201 });
  } catch (err: any) {
    console.error("[documents POST]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}
