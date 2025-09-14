import type { LucideIcon } from "lucide-react";

export type vendorservices =
  | "viewProduct"
  | "addProduct"
  | "editProduct"
  | "pendignOrders"
  | "completedOrders"
  | "allSubscriptions"
  | "addOrEditSubscriptions";

export type service = {
  text?: string;
  icon: LucideIcon;
  serviceName: vendorservices;
  emptyState?: boolean;
};

export type sidebarlink = { text: string; icon: LucideIcon; navigate: string };
