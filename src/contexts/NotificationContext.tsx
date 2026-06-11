import React, { createContext, useContext, useState, useCallback } from "react";
import { Notification } from "@/types/user.types";

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    userId: "user_1",
    type: "connection",
    title: "New Connection Request",
    message: "James Okafor wants to connect with you.",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "n2",
    userId: "user_1",
    type: "investment",
    title: "Investment Opportunity",
    message: "A new deal matching your profile is now available in Deal Flow.",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "n3",
    userId: "user_1",
    type: "event",
    title: "Upcoming Event Reminder",
    message: "Global Entrepreneur Summit starts in 2 days.",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "n4",
    userId: "user_1",
    type: "system",
    title: "Profile Verification",
    message: "Your profile has been submitted for verification review.",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const addNotification = useCallback(
    (n: Omit<Notification, "id" | "createdAt">) => {
      const newN: Notification = {
        ...n,
        id: `n_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [newN, ...prev]);
    },
    []
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotificationContext must be used within NotificationProvider");
  return ctx;
}
