import ActionBar from "@/components/ActionBar";
import type { service } from "@/types/types";
import { PlusIcon, Subscript } from "lucide-react";
import { useState } from "react";

const subscriptionServices: service[] = [
  {
    text: "All Subscriptions",
    icon: Subscript,
    serviceName: "allSubscriptions",
  },
  {
    text: "Active Subscriptions",
    icon: Subscript,
    serviceName: "allSubscriptions",
  },
  {
    text: "Add Subscriptions",
    icon: PlusIcon,
    serviceName: "addOrEditSubscriptions",
  },
];

const ManageSubscriptions = () => {
  const [openServie, setOpenServie] = useState("addOrEditSubscriptions");

  return (
    <div className="h-full space-y-6 px-2 sm:p-4 flex flex-col overflow-x-hidden app-background">
      <div className="flex flex-col gap-2 max-md:mt-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">Subscriptions</h1>
        <p className="text-muted-foreground">
          Add, Review and Manage your subscriptions.
        </p>
      </div>
      <div className="sm:pt-4 flex">
        <ActionBar
          links={subscriptionServices}
          setOpenService={setOpenServie}
          openService={openServie}
        />
      </div>
    </div>
  );
};

export default ManageSubscriptions;
