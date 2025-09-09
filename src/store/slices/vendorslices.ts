import type { ProductType } from "@/types/formType";
import type { Vendor, VendorSlices } from "src/types/vendor";
import type { StateCreator } from "zustand";

export const vendorSlices: StateCreator<VendorSlices> = (set) => ({
  vendor: null,
  setVendor: (vendor: Vendor) => set({ vendor }),
  editProduct: null,
  setEditProduct: (product: ProductType) => {
    set({ editProduct: product });
  },
  logout: () =>
    set({
      vendor: null,
    }),
});
