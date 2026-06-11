import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableColumn } from "@/types/common.types";
import EmptyState from "./EmptyState";
import LoaderSkeleton from "./LoaderSkeleton";
import { cn } from "@/lib/utils";

interface DataTableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  pagination?: {
    page: number;
    perPage: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  onSort?: (key: string, order: "asc" | "desc") => void;
  searchQuery?: string;
  className?: string;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  isLoading = false,
  pagination,
  onSort,
  searchQuery,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
    onSort?.(key, newOrder);
  };

  const SortIcon = ({ col }: { col: TableColumn<T> }) => {
    if (!col.sortable) return null;
    if (sortKey !== col.key) return <ChevronsUpDown className="w-3.5 h-3.5 ml-1 text-muted-foreground" />;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 ml-1 text-gold" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 ml-1 text-gold" />
    );
  };

  if (isLoading) return <LoaderSkeleton variant="table" />;

  if (!data.length) {
    return (
      <EmptyState
        type={searchQuery ? "search" : "empty"}
        onAction={searchQuery ? () => {} : undefined}
        actionLabel={searchQuery ? "Clear Search" : undefined}
      />
    );
  }

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.perPage) : 1;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn(
                      "font-semibold text-foreground text-xs uppercase tracking-wider whitespace-nowrap",
                      col.sortable && "cursor-pointer select-none hover:text-gold transition-colors"
                    )}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <span className="flex items-center">
                      {col.label}
                      <SortIcon col={col} />
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIdx) => (
                <TableRow
                  key={rowIdx}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className="text-sm py-3">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {(pagination.page - 1) * pagination.perPage + 1}–
            {Math.min(pagination.page * pagination.perPage, pagination.total)} of {pagination.total}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={pagination.page === 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={pagination.page === pageNum ? "default" : "outline"}
                  size="icon"
                  className={cn("h-8 w-8 text-xs", pagination.page === pageNum && "bg-royal-black text-gold")}
                  onClick={() => pagination.onPageChange(pageNum)}
                  aria-label={`Page ${pageNum}`}
                  aria-current={pagination.page === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={pagination.page === totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
