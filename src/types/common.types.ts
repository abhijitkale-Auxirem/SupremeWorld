export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FilterState {
  search: string;
  category: string;
  status: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  perPage: number;
}

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export type TabStatus = "under-working" | "completed" | "history";

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatsCard {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
}
