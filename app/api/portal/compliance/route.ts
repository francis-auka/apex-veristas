import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Compliance from "@/models/Compliance";
import Audit from "@/models/Audit";
import Incident from "@/models/Incident";
import Training from "@/models/Training";
import Task from "@/models/Task";
import DocumentModel from "@/models/Document";
import { apiSuccess, apiError } from "@/lib/utils";
import type { DashboardStats } from "@/types/portal";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(apiError("Unauthorized"), { status: 401 });
    }

    const companyId = session.user.companyId;
    if (!companyId) {
      return NextResponse.json(apiError("No company associated"), { status: 400 });
    }

    await connectDB();

    const now = new Date();

    const [
      totalCompliance,
      overdue,
      openIncidents,
      upcomingAudits,
      expiringDocs,
      trainings,
      openTasks,
    ] = await Promise.all([
      Compliance.countDocuments({ company: companyId }),
      Compliance.countDocuments({ company: companyId, status: "overdue" }),
      Incident.countDocuments({ company: companyId, status: { $in: ["reported", "under_investigation"] } }),
      Audit.countDocuments({
        company: companyId,
        status: "planned",
        scheduledDate: { $gte: now, $lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) },
      }),
      DocumentModel.countDocuments({
        company: companyId,
        expiryDate: { $gte: now, $lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) },
      }),
      Training.find({ company: companyId }),
      Task.countDocuments({ company: companyId, status: { $in: ["todo", "in_progress", "blocked"] } }),
    ]);

    // Calculate compliance score
    const compliant = await Compliance.countDocuments({ company: companyId, status: "compliant" });
    const complianceScore = totalCompliance > 0
      ? Math.round((compliant / totalCompliance) * 100)
      : 0;

    // Training completion rate
    const allAttendees = trainings.flatMap((t) => t.attendees);
    const passed       = allAttendees.filter((a) => a.status === "passed").length;
    const trainingCompletionRate = allAttendees.length > 0
      ? Math.round((passed / allAttendees.length) * 100)
      : 0;

    const stats: DashboardStats = {
      complianceScore,
      openIncidents,
      upcomingAudits,
      expiringDocuments:      expiringDocs,
      overdueCompliance:      overdue,
      trainingCompletionRate,
      openTasks,
      pendingActions:         overdue + openIncidents,
    };

    return NextResponse.json(apiSuccess(stats));
  } catch (err: any) {
    console.error("[compliance GET]", err);
    return NextResponse.json(apiError("Internal server error"), { status: 500 });
  }
}
