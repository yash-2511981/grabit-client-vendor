import type { Vendor, VendorSlices } from "src/types/vendor";
import type { StateCreator } from "zustand";

export const vendorSlices: StateCreator<VendorSlices> = (set, get) => ({
  vendor: null,
  setVendor: (vendor: Vendor) => set({ vendor }),
  products: [],
  setProducts: (products) => set({ products: [...products] }),
  editProduct: null,
  setEditProduct: () => {
    const editProduct = get().products.find(
      (p) => p._id === get().selectedProducts[0]
    );
    set({ editProduct });
  },
  selectedProducts: [],
  addSelectedProducts: (product) => {
    const selectedProducts = [...get().selectedProducts, product];
    set({ selectedProducts });
  },
  logout: () =>
    set({
      vendor: null,
    }),
});
