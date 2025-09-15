import ActionBar from "@/components/ActionBar";
import type { service, vendorservices } from "@/types/types";
import { Edit, PlusIcon, StoreIcon, Trash } from "lucide-react";
import { useState } from "react";
import AddOrEditProduct from "./forms/AddProduct";
import { Button } from "@/components/ui/button";
import useVendorStore from "@/store/store";
import ViewProducts from "./component/ViewProducts";
import DialogBox from "@/components/DialogueBox";
import useApi from "@/hooks/useApi";
import { DELETE_PRODUCT } from "@/lib/routes";

const productsServices: service[] = [
  { text: "View Products", icon: StoreIcon, serviceName: "viewProduct" },
  {
    text: "Add Product",
    icon: PlusIcon,
    serviceName: "addProduct",
    emptyState: true,
  },
];

const ManageProduct = () => {
  const { selectedProducts, setEditProduct, editProduct, deleteProducts } =
    useVendorStore();
  const [openService, setOpenService] = useState<vendorservices>("viewProduct");
  const { post } = useApi();
  const [openDialogue, setOpenDialogue] = useState(false);

  const handleEditClick = () => {
    if (selectedProducts.length === 1) {
      setEditProduct(selectedProducts[0]);
      setOpenService("editProduct");
    }
  };

  const handleDeleteClick = async () => {
    console.log(selectedProducts);
    const result = await post(
      DELETE_PRODUCT,
      { selectedProducts: [...selectedProducts] },
      `${selectedProducts.length} Product${
        selectedProducts.length > 1 && "s"
      } deleted successfully `
    );

    if (result?.success) {
      deleteProducts();
    }
  };

  return (
    <div className="h-full space-y-6 px-2 sm:p-4 flex flex-col overflow-x-hidden relative">
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
            onClick={handleEditClick}
            disabled={
              selectedProducts.length !== 1 || openService === "addProduct"
            }
            variant={openService === "editProduct" ? "primary" : "outline"}
          >
            <Edit />
          </Button>

          <Button
            disabled={
              selectedProducts.length === 0 || openService === "addProduct"
            }
            variant="outline"
            onClick={() => setOpenDialogue(true)}
          >
            <Trash />
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
            editProduct={editProduct}
          />
        )}
        {openService === "viewProduct" && <ViewProducts />}
      </div>
      {openDialogue && (
        <DialogBox
          open={openDialogue}
          setOpen={setOpenDialogue}
          action={handleDeleteClick}
        />
      )}
    </div>
  );
};

export default ManageProduct;
