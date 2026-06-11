import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Category {
  value: string;
  label: string;
  count?: number;
}

interface CategorySectionProps {
  categories: Category[];
  selected: string;
  onSelect: (value: string) => void;
  label?: string;
  className?: string;
  allLabel?: string;
}

export default function CategorySection({
  categories,
  selected,
  onSelect,
  label,
  className,
  allLabel = "All",
}: CategorySectionProps) {
  const allCategories: Category[] = [{ value: "", label: allLabel }, ...categories];

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected === cat.value
                ? "bg-royal-black text-gold border border-gold"
                : "bg-muted text-muted-foreground hover:bg-muted/80 border border-transparent"
            )}
            aria-pressed={selected === cat.value}
          >
            {cat.label}
            {cat.count !== undefined && (
              <span
                className={cn(
                  "text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center",
                  selected === cat.value ? "bg-gold/20 text-gold" : "bg-border text-muted-foreground"
                )}
              >
                {cat.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
