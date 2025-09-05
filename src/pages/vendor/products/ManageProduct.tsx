import ActionBar from "@/components/ActionBar";
import type { service } from "@/types/types";
import { PlusIcon, StoreIcon } from "lucide-react";
import { useState } from "react";

const productsServices: service[] = [
  { text: "View Products", icon: StoreIcon, serviceName: "view" },
  { text: "Add Products", icon: PlusIcon, serviceName: "add" },
];

const ManageProduct = () => {
  const [openServie, setOpenServie] = useState("view");

  return (
    <div className="h-full space-y-6 px-2 sm:p-4 flex flex-col overflow-x-hidden">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-semibold">Products</h1>
        <p className="text-muted-foreground">
          Add,Review and Manage your products here.
        </p>
      </div>
      <div className="sm:pt-4 flex">
        <ActionBar
          links={productsServices}
          setOpenService={setOpenServie}
          openService={openServie}
        />
      </div>
    </div>
  );
};

export default ManageProduct;
