import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  IndianRupee,
  ShoppingCart,
  Star,
  UserPlus,
  Wallet,
} from "lucide-react";

const QuickStats = () => {
  const stats = [
    {
      label: "Today's Sales",
      value: "₹2,450",
      icon: IndianRupee,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Pending Payouts",
      value: "₹12,000",
      icon: Wallet,
      color: "text-rose-600",
      bgColor: "bg-rose-100",
    },
    {
      label: "Avg. Rating",
      value: "4.7",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      label: "Avg. Order Value",
      value: "₹340",
      icon: ShoppingCart,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100",
    },
    {
      label: "New Customers",
      value: "8",
      icon: UserPlus,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      label: "Notifications",
      value: "5",
      icon: Bell,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="grid xl:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="border-amber-200 shadow-sm p-0">
            <CardContent className="p-2 flex items-center gap-3">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${stat.bgColor} ${stat.color}`}
              >
                <IconComponent size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className={`sm:text-xl text-lg font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;
