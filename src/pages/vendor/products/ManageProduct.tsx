import ActionBar from "@/components/ActionBar";
import type { service, vendorservices } from "@/types/types";
import { PlusIcon, StoreIcon } from "lucide-react";
import { useState } from "react";
import AddOrEditProduct from "./forms/AddProduct";

const productsServices: service[] = [
  { text: "View Products", icon: StoreIcon, serviceName: "viewProduct" },
  { text: "Add Products", icon: PlusIcon, serviceName: "addOrEditProduct" },
];

const ManageProduct = () => {
  const [openServie, setOpenService] = useState<vendorservices>("viewProduct");

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
          setOpenService={setOpenService}
          openService={openServie}
        />
      </div>
      <div className="flex flex-col py-2 flex-1 overflow-y-auto hide-scrollbar">
        {openServie === "addOrEditProduct" && <AddOrEditProduct />}
      </div>
    </div>
  );
};

export default ManageProduct;
