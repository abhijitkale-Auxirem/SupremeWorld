import { Search, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  type?: "search" | "empty" | "error";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  type = "empty",
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const isSearch = type === "search";

  const defaultTitle = isSearch ? "No Results Found" : "Nothing Here Yet";
  const defaultDescription = isSearch
    ? "Your search did not match any records. Try adjusting your search terms or clear the filter."
    : "There are no items to display at this time. Check back later.";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        {isSearch ? (
          <Search className="w-7 h-7 text-muted-foreground" />
        ) : (
          <Inbox className="w-7 h-7 text-muted-foreground" />
        )}
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
        {title ?? defaultTitle}
      </h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">
        {description ?? defaultDescription}
      </p>
      {onAction && actionLabel && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
