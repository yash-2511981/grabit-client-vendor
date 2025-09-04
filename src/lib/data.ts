import type { sidebarlink } from "@/types/types";
import {
  LayoutDashboard,
  ListOrderedIcon,
  StoreIcon,
  SubscriptIcon,
  Wallet,
} from "lucide-react";

export const sideBarLinks: sidebarlink[] = [
  { text: "Dashboard", icon: LayoutDashboard, navigate: "/dashboard" },
  { text: "Products", icon: StoreIcon, navigate: "/dashboard/products" },
  { text: "Orders", icon: ListOrderedIcon, navigate: "/dashboard/orders" },
  {
    text: "Subscriptions",
    icon: SubscriptIcon,
    navigate: "/dashboard/subscriptions",
  },
  { text: "Wallet", icon: Wallet, navigate: "/dashboard/wallet" },
];
