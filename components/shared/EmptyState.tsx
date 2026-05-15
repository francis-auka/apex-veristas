import { LucideIcon, Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?:        LucideIcon;
  title:        string;
  description?: string;
  action?:      { label: string; onClick: () => void };
}

export default function EmptyState({ icon: Icon = Inbox, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div
        className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl"
        style={{ background: "rgba(46,125,50,0.08)" }}
      >
        <Icon className="h-9 w-9" style={{ color: "#4CAF50" }} />
      </div>
      <h3 className="mb-2 text-base font-semibold" style={{ color: "#1B2A4A" }}>{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm leading-relaxed" style={{ color: "#6B7280" }}>
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
