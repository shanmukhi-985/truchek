export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: number | string;
  dividerAfter?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    id: "scan",
    label: "Scan Center",
    path: "/scan",
    icon: "ScanLine",
    badge: "New",
  },
  {
    id: "history",
    label: "Scan History",
    path: "/history",
    icon: "History",
  },
  {
    id: "community",
    label: "Community",
    path: "/community",
    icon: "Users",
    badge: 3,
    dividerAfter: true,
  },
  {
    id: "notifications",
    label: "Notifications",
    path: "/notifications",
    icon: "Bell",
  },
  {
    id: "bookmarks",
    label: "Bookmarks",
    path: "/bookmarks",
    icon: "Bookmark",
    dividerAfter: true,
  },
  {
    id: "profile",
    label: "Profile",
    path: "/profile",
    icon: "UserCircle",
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: "Settings",
    dividerAfter: true,
  },
  {
    id: "help",
    label: "Help & Support",
    path: "/help",
    icon: "HelpCircle",
  },
];
