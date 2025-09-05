import ActionBar from "@/components/ActionBar";
import type { service } from "@/types/types";
import { PlusIcon, Subscript } from "lucide-react";
import { useState } from "react";

const subscriptionServices: service[] = [
  { text: "Review", icon: Subscript, serviceName: "review" },
  { text: "Edit", icon: PlusIcon, serviceName: "add" },
];

const ManageProfile = () => {
  const [openServie, setOpenServie] = useState("review");

  return (
    <div className="h-full space-y-6 px-2 sm:p-4 flex flex-col overflow-x-hidden">
      <div className="flex flex-col gap-2">
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

export default ManageProfile;
