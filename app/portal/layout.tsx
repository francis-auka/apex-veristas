import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/portal/Sidebar";
import Topbar  from "@/components/portal/Topbar";
import SessionProvider from "@/components/shared/SessionProvider";

import PageTransition from "@/components/shared/PageTransition";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden lg:pl-60">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
