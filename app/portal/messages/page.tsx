"use client";
import { MessageSquare, User, Loader2 } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
        <MessageSquare className="w-8 h-8" />
      </div>
      <h1 className="text-xl font-bold text-brand-navy" style={{ color: "#1B2A4A" }}>Secure Messaging</h1>
      <p className="text-sm text-gray-500 max-w-sm">
        Connect directly with clients and experts. The secure messaging feature is coming soon to your workspace.
      </p>
      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700 flex items-start gap-3 text-left">
         <div className="mt-0.5"><Loader2 className="w-3 h-3 animate-spin" /></div>
         <p>We are integrating real-time communication between professionals and companies.</p>
      </div>
    </div>
  );
}
