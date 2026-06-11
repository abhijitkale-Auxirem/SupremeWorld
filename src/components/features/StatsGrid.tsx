import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  className?: string;
}

export default function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat, i) => (
        <div key={i} className="p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors">
          <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
          <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
          {stat.change && (
            <div className={cn("flex items-center gap-1 mt-1.5 text-xs font-medium",
              stat.changeType === "positive" ? "text-success" :
              stat.changeType === "negative" ? "text-destructive" :
              "text-muted-foreground"
            )}>
              {stat.changeType === "positive" && <TrendingUp className="w-3 h-3" />}
              {stat.changeType === "negative" && <TrendingDown className="w-3 h-3" />}
              {stat.changeType === "neutral" && <Minus className="w-3 h-3" />}
              {stat.change}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
