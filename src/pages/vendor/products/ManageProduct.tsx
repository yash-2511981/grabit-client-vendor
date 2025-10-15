import ActionBar from "@/components/ActionBar";
import type { service, vendorservices } from "@/types/types";
import { Edit, PlusIcon, StoreIcon, Trash } from "lucide-react";
import { useState } from "react";
import AddOrEditProduct from "./forms/AddOrEditProduct";
import { Button } from "@/components/ui/button";
import useVendorStore from "@/store/store";
import ViewProducts from "../../../components/ViewProducts";
import DialogBox from "@/components/DialogueBox";
import useApi from "@/hooks/useApi";
import { DELETE_PRODUCT } from "@/lib/routes";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const productsServices: service[] = [
  { text: "All", icon: StoreIcon, serviceName: "viewProduct" },
  {
    text: "Add",
    icon: PlusIcon,
    serviceName: "addProduct",
    emptyState: true,
  },
];

const ManageProduct = () => {
  const { selectedProducts, getEditProduct, deleteProducts } = useVendorStore();
  const [openService, setOpenService] = useState<vendorservices>("viewProduct");
  const { post } = useApi();
  const [openDialogue, setOpenDialogue] = useState(false);

  const handleEditClick = () => {
    if (selectedProducts.length === 1) {
      setOpenService("editProduct");
    }
  };

  const handleDeleteClick = async () => {
    const result = await post(
      DELETE_PRODUCT,
      { selectedProducts: [...selectedProducts] },
      `${selectedProducts.length} Product${
        selectedProducts.length > 1 ? "s" : ""
      } deleted successfully `
    );

    if (result?.success) {
      deleteProducts();
    }
  };

  return (
    <div className="h-screen space-y-6 px-2 sm:p-4 flex flex-col overflow-x-hidden app-background">
      <div className="flex flex-col gap-2 max-md:mt-14">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          Products
        </h1>
        <p className="text-muted-foreground">
          Add, Review and Manage your products here.
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
            onClick={handleEditClick}
            disabled={
              selectedProducts.length !== 1 || openService === "addProduct"
            }
            variant={openService === "editProduct" ? "default" : "outline"}
            className={
              openService === "editProduct"
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "border-amber-300 text-amber-700 hover:bg-amber-50"
            }
          >
            <Edit className="w-4 h-4" />
          </Button>

          <Button
            disabled={
              selectedProducts.length === 0 || openService === "addProduct"
            }
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-50"
            onClick={() => setOpenDialogue(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col py-2 flex-1 overflow-y-auto hide-scrollbar">
        {openService === "addProduct" && (
          <AddOrEditProduct
            setOpenService={setOpenService}
            editProduct={null}
          />
        )}
        {openService === "editProduct" && (
          <AddOrEditProduct
            setOpenService={setOpenService}
            editProduct={getEditProduct(selectedProducts[0])}
          />
        )}
        {openService === "viewProduct" && <ViewProducts />}
      </div>

      <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
        <DialogContent className="sm:max-w-md">
          <DialogBox
            setOpen={setOpenDialogue}
            onConfirm={handleDeleteClick}
            itemType="Products"
            itemCount={selectedProducts.length}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageProduct;
