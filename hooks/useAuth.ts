"use client";
import { useSession } from "next-auth/react";
import { useAuthStore }  from "@/store/authStore";
import { useEffect }     from "react";

/**
 * Syncs the NextAuth session into Zustand for convenient access.
 * Must be used inside a SessionProvider.
 */
export function useAuth() {
  const { data: session, status } = useSession();
  const { user, setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    setLoading(status === "loading");

    if (status === "authenticated" && session?.user) {
      setUser({
        id:        session.user.id,
        email:     session.user.email!,
        name:      session.user.name!,
        role:      session.user.role,
        companyId: session.user.companyId,
        avatarUrl: session.user.avatarUrl,
      });
    }

    if (status === "unauthenticated") {
      logout();
    }
  }, [status, session, setUser, setLoading, logout]);

  return {
    user,
    isLoading:       status === "loading",
    isAuthenticated: status === "authenticated",
    isAdmin:         user?.role === "admin",
    isConsultant:    user?.role === "consultant",
    isClientAdmin:   user?.role === "client_admin",
  };
}
