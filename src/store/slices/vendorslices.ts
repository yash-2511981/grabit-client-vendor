import type { Vendor, VendorSlices } from "src/types/vendor";
import type { StateCreator } from "zustand";

export const vendorSlices: StateCreator<VendorSlices> = (set, get) => ({
  vendor: null,
  setVendor: (vendor: Vendor) => set({ vendor }),
  open: undefined,
  setOpen: (open) => set({ open }),
  products: [],
  setProducts: (products) => set({ products }),
  addNewProduct: (product) => {
    const products = [...get().products];
    products.unshift(product);
    const newProducts = [...products];
    set({ products: newProducts });
  },
  updateProduct: (product) => {
    const products = [...get().products];
    const index = products.findIndex((p) => p._id === product._id);

    if (index !== -1) {
      products[index] = { ...products[index], ...product }; // replace at index
      set({ products });
    }
  },
  deleteProducts: () => {
    const { products, selectedProducts } = get();

    set({
      products: products.filter((p) => !selectedProducts.includes(p._id)),
      selectedProducts: [],
    });
  },
  selectedProducts: [],
  selectProduct: (product) => {
    const selectedProducts = [...get().selectedProducts, product];
    set({ selectedProducts });
  },
  deselectProduct: (product) => {
    const selectedProducts = [...get().selectedProducts];
    const newList = selectedProducts.filter((p) => p !== product);
    set({ selectedProducts: newList });
  },
  editProduct: null,
  setEditProduct: (id) => {
    const editProduct = get().products.find((p) => p._id === id);

    set({ editProduct });
  },
  logout: () =>
    set({
      vendor: null,
      products: [],
      selectedProducts: [],
    }),
});
