import type { sidebarlink } from "@/types/types";
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
