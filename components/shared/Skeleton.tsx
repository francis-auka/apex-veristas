import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        className
      )}
      style={{
        borderRadius: 0, // Ensure sharp edges
      }}
      {...props}
    />
  );
}

export function ActionCardSkeleton() {
  return (
    <div className="card h-[120px] flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-12" />
        </div>
        <Skeleton className="h-10 w-10" />
      </div>
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function ComplianceGaugeSkeleton() {
  return (
    <div className="card flex flex-col items-center justify-center p-8 space-y-6">
      <Skeleton className="h-4 w-40" />
      <div className="relative h-48 w-48 rounded-full border-8 border-gray-100 flex items-center justify-center">
        <Skeleton className="h-12 w-16" />
      </div>
      <Skeleton className="h-6 w-32" />
    </div>
  );
}
