import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthUser {
  id:        string;
  email:     string;
  name:      string;
  role:      string;
  companyId: string | null;
  avatarUrl: string | null;
}

interface AuthState {
  user:      AuthUser | null;
  isLoading: boolean;
  setUser:   (user: AuthUser | null) => void;
  setLoading:(loading: boolean) => void;
  logout:    () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:      null,
      isLoading: false,
      setUser:   (user) => set({ user }),
      setLoading:(isLoading) => set({ isLoading }),
      logout:    () => set({ user: null }),
    }),
    {
      name:    "apex-auth",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);

// Selectors
export const selectUser      = (s: AuthState) => s.user;
export const selectIsAdmin   = (s: AuthState) => s.user?.role === "admin";
export const selectCompanyId = (s: AuthState) => s.user?.companyId;
