import { cn } from "@/lib/utils";

interface LoaderSkeletonProps {
  className?: string;
  variant?: "page" | "card" | "table" | "inline";
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer",
        className
      )}
    />
  );
}

export default function LoaderSkeleton({ className, variant = "page" }: LoaderSkeletonProps) {
  if (variant === "card") {
    return (
      <div className={cn("p-6 rounded-xl border border-border bg-card space-y-3", className)}>
        <SkeletonBlock className="h-5 w-2/3" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-4/5" />
        <SkeletonBlock className="h-8 w-1/3 mt-4" />
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className={cn("space-y-3", className)}>
        <SkeletonBlock className="h-10 w-full rounded-lg" />
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (variant === "inline") {
    return <SkeletonBlock className={cn("h-4 w-24 inline-block", className)} />;
  }

  return (
    <div className={cn("min-h-screen bg-background p-8", className)}>
      <div className="max-w-6xl mx-auto space-y-6">
        <SkeletonBlock className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-6 rounded-xl border border-border bg-card space-y-3">
              <SkeletonBlock className="h-5 w-1/2" />
              <SkeletonBlock className="h-8 w-3/4" />
              <SkeletonBlock className="h-3 w-full" />
            </div>
          ))}
        </div>
        <SkeletonBlock className="h-64 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonBlock className="h-48 rounded-xl" />
          <SkeletonBlock className="h-48 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
