import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { formatDate } from "@/utils/helpers";
import { 
  Bell, 
  Trash2, 
  CheckCheck, 
  UserPlus, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  ShieldAlert 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationContext();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Map notification types to Lucide components
  const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    connection: UserPlus,
    message: MessageSquare,
    event: Calendar,
    investment: TrendingUp,
    system: ShieldAlert,
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Notifications" 
        description="Your activity and alerts." 
        breadcrumbs={[{ label: "Notifications" }]}
        actions={
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCheck className="w-4 h-4 mr-1.5" />
            Mark All as Read
          </Button>
        } 
      />
      <div className="space-y-2 max-w-2xl">
        {notifications.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No notifications.</div>
        )}
        {notifications.map((n) => {
          // Fallback to the Bell icon if the type doesn't exist in TYPE_ICONS
          const IconComponent = TYPE_ICONS[n.type] ?? Bell;

          return (
            <div 
              key={n.id} 
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer", 
                n.isRead ? "border-border bg-card" : "border-gold/20 bg-gold/5"
              )} 
              onClick={() => markAsRead(n.id)}
            >
              <span className="flex-shrink-0 text-muted-foreground pt-0.5">
                <IconComponent className="w-5 h-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{n.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(n.createdAt, "relative")}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!n.isRead && <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />}
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setDeleteId(n.id); 
                  }} 
                  aria-label="Delete notification"
                >
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <ConfirmationModal 
        open={!!deleteId} 
        onOpenChange={(o) => !o && setDeleteId(null)} 
        title="Delete Notification" 
        description="This notification will be permanently removed." 
        confirmLabel="Delete Notification" 
        onConfirm={() => { 
          deleteNotification(deleteId!); 
          setDeleteId(null); 
        }} 
      />
    </DashboardLayout>
  );
}