import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Apex Veritas compliance portal",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen items-center justify-center p-4"
      style={{ background: "linear-gradient(160deg,#0f1e35 0%,#1B2A4A 50%,#1a3a20 100%)" }}
    >
      {/* Background orbs */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle,#2E7D32 0%,transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle,#4CAF50 0%,transparent 70%)", filter: "blur(60px)" }}
      />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
