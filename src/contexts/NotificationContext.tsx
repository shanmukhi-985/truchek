import React, { createContext, useContext, useState } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "threat" | "info" | "success" | "warning";
  read: boolean;
  time: string;
  icon?: string;
}

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    title: "Threat Detected",
    message: "A phishing attempt was blocked from unknown-bank-login.xyz",
    type: "threat",
    read: false,
    time: "2 min ago",
  },
  {
    id: "n2",
    title: "Scan Complete",
    message: "Your URL scan for paypal.com returned a Trust Score of 98%",
    type: "success",
    read: false,
    time: "15 min ago",
  },
  {
    id: "n3",
    title: "Community Alert",
    message: "New scam pattern reported in your region: Fake IRS texts",
    type: "warning",
    read: false,
    time: "1 hr ago",
  },
  {
    id: "n4",
    title: "Weekly Report Ready",
    message: "Your security summary for the past 7 days is ready to view",
    type: "info",
    read: true,
    time: "3 hr ago",
  },
  {
    id: "n5",
    title: "Trust Score Updated",
    message: "Your community trust score increased to 94 — Great work!",
    type: "success",
    read: true,
    time: "1 day ago",
  },
  {
    id: "n6",
    title: "New Feature",
    message: "QR code scanning is now available in the Scan Center",
    type: "info",
    read: true,
    time: "2 days ago",
  },
];

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] =
    useState<Notification[]>(DEMO_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  return ctx;
}
