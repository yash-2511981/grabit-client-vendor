import type { sidebarlink } from "@/types/types";
import type { Notification } from "@/types/vendor";
import {
  Calendar,
  LayoutDashboard,
  ListOrderedIcon,
  StoreIcon,
  UserCircle,
  Wallet,
} from "lucide-react";

export const sideBarLinks: sidebarlink[] = [
  { text: "Dashboard", icon: LayoutDashboard, navigate: "/vendor" },
  { text: "Products", icon: StoreIcon, navigate: "/vendor/products" },
  { text: "Orders", icon: ListOrderedIcon, navigate: "/vendor/orders" },
  {
    text: "Subscriptions",
    icon: Calendar,
    navigate: "/vendor/subscriptions",
  },
  { text: "Wallet", icon: Wallet, navigate: "/vendor/wallet" },
  { text: "Profile", icon: UserCircle, navigate: "/vendor/profile" },
];

export const mockNotifications: Notification[] = [
  // Code notifications (2)
  {
    _id: "66f123456789abcd12345003",
    orderId: "66f123456789abcd12340101",
    code: "878787",
    seen: false,
    type: "code",
    createdAt: new Date("2025-09-28T11:15:00Z"),
  },
  {
    _id: "66f123456789abcd12345001",
    text: "Your restaurant's operating hours have been updated. Please review the changes.",
    seen: false,
    type: "warning",
    createdAt: new Date("2025-09-28T10:30:00Z"),
  },
  {
    _id: "66f123456789abcd12345004",
    code: "776677",
    orderId: "66f123456789abcd12340102",
    seen: true,
    type: "code",
    createdAt: new Date("2025-09-27T09:22:00Z"),
  },
  // Warning notifications (2)

  {
    _id: "66f123456789abcd12345002",
    text: "Low inventory alert: Some menu items are running out of stock.",
    seen: true,
    type: "warning",
    createdAt: new Date("2025-09-27T15:45:00Z"),
  },

  // Update notifications (2)
  {
    _id: "66f123456789abcd12345005",
    text: "New feature available: Customer feedback system has been activated for your restaurant.",
    seen: false,
    type: "update",
    createdAt: new Date("2025-09-28T08:00:00Z"),
  },
  {
    _id: "66f123456789abcd12345006",

    text: "System maintenance completed successfully. All services are now running normally.",
    seen: true,
    type: "update",
    createdAt: new Date("2025-09-26T22:30:00Z"),
  },
];
