import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?:    "sm" | "md" | "lg";
  text?:    string;
  fullPage?: boolean;
}

const SIZE_MAP = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-10 w-10" };

export default function LoadingSpinner({ size = "md", text, fullPage = false }: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className={`${SIZE_MAP[size]} animate-spin`} style={{ color: "#2E7D32" }} />
      {text && <p className="text-sm font-medium" style={{ color: "#6B7280" }}>{text}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "rgba(245,247,250,0.9)", backdropFilter: "blur(4px)" }}
      >
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{content}</div>;
}
