import type { LucideIcon } from "lucide-react";

export type vendorservices =
  | "viewProduct"
  | "addProduct"
  | "editProduct"
  | "pendignOrders"
  | "completedOrders"
  | "allSubscriptions"
  | "activeSubscription"
  | "addSubscription"
  | "editSubscription";

export type service = {
  text?: string;
  icon: LucideIcon;
  serviceName: vendorservices;
  emptyState?: boolean;
};

export type Day =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type metric = {
  label: string;
  value: string | number | undefined;
  icon: LucideIcon;
  trend?: string | number;
};

export type sidebarlink = { text: string; icon: LucideIcon; navigate: string };
