"use client";
import { useCompliance } from "@/hooks/useCompliance";
import { useSession }    from "next-auth/react";
import ComplianceGauge   from "@/components/portal/ComplianceGauge";
import ActionCard        from "@/components/portal/ActionCard";
import {
  AlertTriangle, Clock, FileWarning, GraduationCap,
  CheckSquare, ShieldAlert, TrendingUp, Calendar,
  ArrowRight, MessageSquare, Loader2
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function PortalDashboard() {
  const { data: session }        = useSession();
  const { stats, loading, error } = useCompliance();
  const [requests, setRequests] = useState<any[]>([]);
  const [fetchingReqs, setFetchingReqs] = useState(false);

  const userName = session?.user?.name?.split(" ")[0] ?? "there";
  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  useEffect(() => {
    if (session?.user?.role === "professional" && session?.user?.email) {
      fetchServiceRequests();
    }
  }, [session]);

  async function fetchServiceRequests() {
    try {
      setFetchingReqs(true);
      // First get the pro id
      const { data: pro } = await supabase.from("pros").select("id").eq("user_email", session?.user?.email).single();
      if (pro) {
        const { data, error } = await supabase
          .from("service_requests")
          .select("*")
          .eq("pro_id", pro.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        setRequests(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingReqs(false);
    }
  }

  if (session?.user?.role === "professional") {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div 
          className="relative overflow-hidden rounded-2xl px-8 py-10"
          style={{ background: "linear-gradient(135deg,#1B2A4A 0%,#243B55 100%)" }}
        >
          <div className="relative z-10">
            <p className="mb-2 text-sm font-medium opacity-70 text-white">{greeting},</p>
            <h2 className="text-3xl font-black text-white">{userName} 👋</h2>
            <p className="mt-2 text-sm opacity-70 text-white max-w-lg">
              Welcome to your professional dashboard. Here you can manage your consultant profile, 
              view hiring requests, and update your HSEQ credentials.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/portal/professional-profile" className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg text-sm hover:bg-green-500 transition-all">
                Edit Profile
              </Link>
              <Link href="/portal/messages" className="px-6 py-2.5 bg-white/10 text-white font-bold rounded-lg text-sm hover:bg-white/20 transition-all border border-white/10">
                View Inbox
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center space-y-4">
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
               <TrendingUp className="w-6 h-6" />
             </div>
             <h3 className="font-bold text-brand-navy">Marketplace Performance</h3>
             <p className="text-xs text-gray-500">Complete your profile to start appearing in search results.</p>
             <div className="pt-4 text-2xl font-black text-gray-900">0 Views</div>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center space-y-4">
             <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
               <ShieldAlert className="w-6 h-6" />
             </div>
             <h3 className="font-bold text-brand-navy">Verification Status</h3>
             <p className="text-xs text-gray-500">Upgrade your profile with verified certifications.</p>
             <div className="pt-4">
                <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-[10px] font-black uppercase rounded-full border border-yellow-100">
                  Manual Review
                </span>
             </div>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm text-center space-y-4">
             <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto">
               <MessageSquare className="w-6 h-6" />
             </div>
             <h3 className="font-bold text-brand-navy">Hire Requests</h3>
             <p className="text-xs text-gray-500">Check below for active service requests from clients.</p>
             <div className="pt-4 text-2xl font-black text-gray-900">{requests.length} Requests</div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
           <h3 className="text-lg font-bold text-brand-navy mb-6">Recent Service Requests</h3>
           {fetchingReqs ? (
              <div className="flex items-center justify-center py-10">
                 <Loader2 className="w-6 h-6 animate-spin text-green-600" />
              </div>
           ) : requests.length === 0 ? (
              <div className="py-10 text-center border-2 border-dashed border-gray-100 rounded-xl">
                 <p className="text-sm text-gray-400">No active service requests yet.</p>
              </div>
           ) : (
              <div className="space-y-4">
                 {requests.map(req => (
                   <div key={req.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
                      <div>
                        <p className="text-xs font-bold text-brand-navy">{req.service_type}</p>
                        <p className="text-[10px] text-gray-500">{req.client_email} · {new Date(req.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[9px] font-bold uppercase rounded-full">
                           {req.status}
                        </span>
                        <Link href="/portal/messages" className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
                           <MessageSquare className="w-4 h-4" />
                        </Link>
                      </div>
                   </div>
                 ))}
              </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div
        className="relative overflow-hidden rounded-2xl px-8 py-7"
        style={{ background: "linear-gradient(135deg,#1B2A4A 0%,#2E7D32 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 80% 50%, #66BB6A 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="mb-1 text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
              {greeting},
            </p>
            <h2 className="text-2xl font-extrabold text-white">{userName} 👋</h2>
            <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              {formatDate(new Date())} · Here&apos;s your HSEQ overview for today
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-2">
            <Link href="/portal/compliance" className="flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
              View Compliance <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-600">
          ⚠️ Could not load dashboard data: {error}
        </div>
      )}

      {/* Stats grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <ActionCard
          title="Open Incidents"
          value={stats?.openIncidents ?? "—"}
          subtitle="Requires investigation"
          icon={AlertTriangle}
          iconColor="#EF4444"
          iconBg="rgba(239,68,68,0.1)"
          loading={loading}
        />
        <ActionCard
          title="Overdue Items"
          value={stats?.overdueCompliance ?? "—"}
          subtitle="Past due date"
          icon={Clock}
          iconColor="#F59E0B"
          iconBg="rgba(245,158,11,0.1)"
          loading={loading}
        />
        <ActionCard
          title="Expiring Documents"
          value={stats?.expiringDocuments ?? "—"}
          subtitle="In the next 30 days"
          icon={FileWarning}
          iconColor="#6366F1"
          iconBg="rgba(99,102,241,0.1)"
          loading={loading}
        />
        <ActionCard
          title="Upcoming Audits"
          value={stats?.upcomingAudits ?? "—"}
          subtitle="Next 30 days"
          icon={Calendar}
          iconColor="#2E7D32"
          iconBg="rgba(46,125,50,0.1)"
          loading={loading}
        />
      </div>

      {/* Middle row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Compliance gauge */}
        <ComplianceGauge score={stats?.complianceScore ?? 0} loading={loading} />

        {/* Quick stats column */}
        <div className="space-y-5">
          <ActionCard
            title="Training Completion"
            value={stats?.trainingCompletionRate ? `${stats.trainingCompletionRate}%` : "—"}
            subtitle="Across all staff"
            icon={GraduationCap}
            iconColor="#4CAF50"
            iconBg="rgba(76,175,80,0.1)"
            loading={loading}
          />
          <ActionCard
            title="Open Tasks"
            value={stats?.openTasks ?? "—"}
            subtitle="Requiring action"
            icon={CheckSquare}
            iconColor="#1B2A4A"
            iconBg="rgba(27,42,74,0.1)"
            loading={loading}
          />
          <ActionCard
            title="Pending Actions"
            value={stats?.pendingActions ?? "—"}
            subtitle="Total outstanding"
            icon={ShieldAlert}
            iconColor="#EF4444"
            iconBg="rgba(239,68,68,0.1)"
            loading={loading}
          />
        </div>

        {/* Quick links */}
        <div
          className="rounded-2xl bg-white p-6 card-shadow"
          style={{ border: "1px solid rgba(27,42,74,0.07)" }}
        >
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>
            Quick Actions
          </h3>
          <div className="space-y-2">
            {[
              { label: "Report an Incident",     href: "/portal/incidents",  color: "#EF4444" },
              { label: "Upload a Document",       href: "/portal/documents",  color: "#6366F1" },
              { label: "Schedule an Audit",       href: "/portal/audits",     color: "#2E7D32" },
              { label: "Add Training Session",    href: "/portal/training",   color: "#F59E0B" },
              { label: "View Compliance Calendar",href: "/portal/compliance/calendar", color: "#1B2A4A" },
              { label: "Create a Task",           href: "/portal/tasks",      color: "#4CAF50" },
            ].map((qa) => (
              <Link
                key={qa.href}
                href={qa.href}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-gray-50"
                style={{ color: "#1A1A2E" }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: qa.color }}
                  />
                  {qa.label}
                </span>
                <ArrowRight className="h-4 w-4" style={{ color: "#9CA3AF" }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
