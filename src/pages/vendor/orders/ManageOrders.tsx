import ActionBar from "@/components/ActionBar";
import type { service } from "@/types/types";
import { CircleCheckIcon, Clock } from "lucide-react";
import { useState } from "react";

const orderServices: service[] = [
  { text: "Pending", serviceName: "pendignOrders", icon: Clock },
  { text: "Completed", serviceName: "completedOrders", icon: CircleCheckIcon },
];

const ManageOrders = () => {  
  const [openService, setOpenService] = useState<string>("pendignOrders");

  return (
    <div className="h-full space-y-6 px-2 sm:p-4 flex flex-col overflow-x-hidden app-background">
      <div className="flex flex-col gap-2 max-md:mt-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">Orders</h1>
        <p className="text-muted-foreground">Manage and review your orders.</p>
      </div>
      <div className="sm:pt-4 flex">
        <ActionBar
          links={orderServices}
          setOpenService={setOpenService}
          openService={openService}
        />
      </div>
      <div className="flex flex-1 flex-col"></div>
    </div>
  );
};

export default ManageOrders;
