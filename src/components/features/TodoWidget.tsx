import { useState } from "react";
import { Plus, Trash2, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TodoItem, TabStatus } from "@/types/common.types";
import { generateId, formatDate } from "@/utils/helpers";
import { cn } from "@/lib/utils";
import ConfirmationModal from "@/components/common/ConfirmationModal";

interface TodoWidgetProps {
  storageKey: string;
}

const MOCK_TODOS: TodoItem[] = [
  { id: "t1", title: "Update investor pitch deck", priority: "high", status: "in-progress", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "t2", title: "Follow up with James Thornton", priority: "medium", status: "pending", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: "t3", title: "Review partnership proposal", priority: "low", status: "completed", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const TAB_OPTIONS: { value: TabStatus; label: string }[] = [
  { value: "under-working", label: "Working" },
  { value: "completed", label: "Completed" },
  { value: "history", label: "History" },
];

export default function TodoWidget({ storageKey }: TodoWidgetProps) {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>(storageKey + "_todos", MOCK_TODOS);
  const [tab, setTab] = useState<TabStatus>("under-working");
  const [newTitle, setNewTitle] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = todos.filter((t) => {
    if (tab === "under-working") return t.status === "pending" || t.status === "in-progress";
    if (tab === "completed") return t.status === "completed";
    return true;
  });

  const addTodo = () => {
    if (!newTitle.trim()) return;
    const item: TodoItem = { id: generateId(), title: newTitle, priority: "medium", status: "pending", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    setTodos((prev) => [item, ...prev]);
    setNewTitle("");
  };

  const toggleStatus = (id: string) => {
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, status: t.status === "completed" ? "pending" : "completed", updatedAt: new Date().toISOString() } : t));
  };

  const PRIORITY_COLORS = { high: "text-destructive", medium: "text-gold", low: "text-muted-foreground" };

  return (
    <div className="p-5 rounded-xl border border-border bg-card">
      <h3 className="font-display font-semibold text-foreground mb-3">Task List</h3>

      {/* Tabs */}
      <div className="flex border-b border-border mb-3">
        {TAB_OPTIONS.map((t) => (
          <button key={t.value} onClick={() => setTab(t.value)} className={cn("px-3 py-1.5 text-xs font-medium transition-colors border-b-2", tab === t.value ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground")}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Add */}
      <div className="flex gap-2 mb-3">
        <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add a task..." className="h-8 text-xs flex-1" onKeyDown={(e) => e.key === "Enter" && addTodo()} />
        <Button size="icon" className="h-8 w-8 bg-success text-success-foreground hover:bg-success/90" onClick={addTodo} aria-label="Create task"><Plus className="w-4 h-4" /></Button>
      </div>

      {/* List */}
      <div className="space-y-2 max-h-52 overflow-y-auto scrollbar-thin">
        {filtered.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">No tasks in this category.</p>}
        {filtered.map((t) => (
          <div key={t.id} className="flex items-center gap-2 group">
            <button onClick={() => toggleStatus(t.id)} className="flex-shrink-0 focus-visible:outline-none" aria-label={t.status === "completed" ? "Mark incomplete" : "Mark complete"}>
              {t.status === "completed" ? <Check className="w-4 h-4 text-success" /> : <Circle className="w-4 h-4 text-muted-foreground" />}
            </button>
            <span className={cn("text-xs flex-1 truncate", t.status === "completed" && "line-through text-muted-foreground")}>{t.title}</span>
            <span className={cn("text-xs capitalize flex-shrink-0", PRIORITY_COLORS[t.priority])}>{t.priority}</span>
            <button onClick={() => setDeleteId(t.id)} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" aria-label="Delete task">
              <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
        ))}
      </div>

      <ConfirmationModal open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} title="Delete Task" description="This task will be permanently removed." confirmLabel="Delete Task" onConfirm={() => { setTodos((prev) => prev.filter((t) => t.id !== deleteId)); setDeleteId(null); }} />
    </div>
  );
}
