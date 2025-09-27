import {
  CheckCircle,
  Clock,
  Package,
  Repeat,
  RotateCcw,
  ShoppingCart,
  TrendingUp,
  UserPlus,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import CurrentPendingOrders from "./components/CurrentPendingOrders";

import DashboardOVerviewCard from "@/components/DashboardOverviewCard";
import QuickStats from "./components/QuickStatCard";

const Dashboard = () => {
  const buisnessMetric = [
    { label: "Revenue", value: "₹42,350", icon: TrendingUp, trend: "+12%" },
    { label: "Customers", value: "120", icon: Users, trend: "+8%" },
    { label: "Repeat Rate", value: "32%", icon: Repeat, trend: "+5%" },
    { label: "New", value: "10", icon: UserPlus, trend: "+2" },
  ];

  const productStats = [
    {
      label: "Total Products",
      value: "80",
      icon: Package,
      trend: "+5 new",
    },
    {
      label: "Total Subscriptions",
      value: "10",
      icon: RotateCcw,
      trend: "Available",
    },
    {
      label: "Active Subscriptions",
      value: "32",
      icon: Zap,
      trend: "Running",
    },
    {
      label: "Customer Rate",
      value: "27%",
      icon: TrendingUp,
      trend: "Of total",
    },
  ];

  const orderStats = [
    {
      label: "Total",
      value: "270",
      icon: ShoppingCart,
    },
    {
      label: "Completed",
      value: "250",
      icon: CheckCircle,
    },
    {
      label: "Pending",
      value: "5",
      icon: Clock,
    },
    {
      label: "Cancelled",
      value: "15",
      icon: XCircle,
    },
  ];
  return (
    <div className="h-full space-y-6 px-2 sm:p-4 flex flex-col overflow-x-hidden app-background">
      <div className="flex flex-col gap-2 max-md:mt-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">
          Business Dashboard
        </h1>
        <p className="text-muted-foreground text-sm sm:w-fit">
          Track your sales, revenue, and overall store performance at a glance.
        </p>
      </div>
      <div className="overflow-y-auto hide-scrollbar mb-6 lg:mb-0">
        <div className="sm:pt-4 flex flex-col gap-3">
          <QuickStats />
          <div className="grid xl:grid-cols-3 grid-cols-1 gap-3">
            <div className="lg:col-span-2 grid lg:grid-cols-2  grid-cols-1 gap-3">
              <DashboardOVerviewCard
                cardTitle="Buisness Overview"
                cardDescription="This month's performance"
                metrics={buisnessMetric}
              />
              <DashboardOVerviewCard
                cardTitle="Prodcut & Subscriptions"
                cardDescription="Menu insights"
                metrics={productStats}
              />
            </div>
            <div className="md:col-span-1">
              <DashboardOVerviewCard
                cardTitle="Orders Overview"
                cardDescription="This month's orders"
                metrics={orderStats}
              />
            </div>
          </div>
          <div className="w-full">
            <CurrentPendingOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
