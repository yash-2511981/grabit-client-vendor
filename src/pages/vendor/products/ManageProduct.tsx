import ActionBar from "@/components/ActionBar";
import type { service, vendorservices } from "@/types/types";
import { Edit, PlusIcon, StoreIcon, Trash } from "lucide-react";
import { useState } from "react";
import AddOrEditProduct from "./forms/AddProduct";
import { Button } from "@/components/ui/button";
import useVendorStore from "@/store/store";
import { toast } from "sonner";

const productsServices: service[] = [
  { text: "View Products", icon: StoreIcon, serviceName: "viewProduct" },
  { text: "Add Products", icon: PlusIcon, serviceName: "addOrEditProduct" },
];

const ManageProduct = () => {
  const { selectedProducts, setEditProduct } = useVendorStore();
  const [openService, setOpenService] = useState<vendorservices>("viewProduct");

  const handleEditClick = () => {
    if (selectedProducts.length === 1) {
      setEditProduct();
      setOpenService("addOrEditProduct");
    } else if (selectedProducts.length >= 1) {
      toast.warning("Please select only one product to edit");
    } else if (selectedProducts.length == 0) {
      toast.warning("Select at least one product which you wanted to edit");
    }
  };

  const handleDeleteClick = () => {};

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
          openService={openService}
        />
        <div className="flex gap-2 ml-4">
          <Button
            className="p-2 justify-center gap-2 border rounded-sm flex"
            onClick={handleEditClick}
            disabled={selectedProducts.length !== 1}
          >
            <Edit />
          </Button>

          <Button
            disabled={selectedProducts.length === 0}
            className="p-2 flex justify-center gap-2 border rounded-sm"
            onClick={handleDeleteClick}
          >
            <Trash />
          </Button>
        </div>
      </div>
      <div className="flex flex-col py-2 flex-1 overflow-y-auto hide-scrollbar">
        {openService === "addOrEditProduct" && <AddOrEditProduct />}
      </div>
    </div>
  );
};

export default ManageProduct;
