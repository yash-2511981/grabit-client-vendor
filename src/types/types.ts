import type { LucideIcon } from "lucide-react";

export type vendorservices =
  | "viewProduct"
  | "addOrEditProduct"
  | "pendignOrders"
  | "completedOrders"
  | "allSubscriptions"
  | "addOrEditSubscriptions";

export type service = {
  text: string;
  icon: LucideIcon;
  serviceName: vendorservices;
};

export type sidebarlink = { text: string; icon: LucideIcon; navigate: string };
