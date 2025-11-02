import { mockNotifications } from "@/lib/data";
import type { Vendor, VendorSlices } from "src/types/vendor";
import type { StateCreator } from "zustand";

export const vendorSlices: StateCreator<VendorSlices> = (set, get) => ({
  vendor: null,
  pendingOrders: [],
  setPendingOrders: (pendingOrders) => {
    set({ pendingOrders });
  },
  addPendingOrder: (pendingOrder) => {
    const orders = [...get().pendingOrders];
    orders.push(pendingOrder);
    set({ pendingOrders: orders });
  },
  setVendor: (vendor: Vendor) => set({ vendor }),
  bankDetails: null,
  setBankDetails: (bankDetails) => set({ bankDetails }),
  documents: null,
  setVendorDocuments: (documents) => set({ ...get().documents, documents }),
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
  updateProducts: (product) => {
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
  emptySelectedProduct: () => set({ selectedProducts: [] }),
  selectProduct: (product) => {
    const selectedProducts = [...get().selectedProducts, product];
    set({ selectedProducts });
  },
  deselectProduct: (product) => {
    const selectedProducts = [...get().selectedProducts];
    const newList = selectedProducts.filter((p) => p !== product);
    set({ selectedProducts: newList });
  },
  getEditProduct: (id) => {
    const editProduct = get().products.find((p) => p._id === id);
    return editProduct || null;
  },
  subscriptions: [],
  setSubscriptions: (subscriptions) => set({ subscriptions }),
  addSubscription: (subscription) => {
    const subscriptions = [...get().subscriptions];
    subscriptions.unshift(subscription);
    set({ subscriptions });
  },
  updateSubscription: (subscription) => {
    const subscriptions = [...get().subscriptions];
    const index = subscriptions.findIndex((s) => s._id === subscription._id);
    if (index !== -1) {
      subscriptions[index] = { ...subscriptions[index], ...subscription };
    }
    set({ subscriptions });
  },
  deleteSubscriptions: (dataDeletedSubscriptions) => {
    const subscriptions = get().subscriptions.filter(
      (s) => !dataDeletedSubscriptions.includes(s._id)
    );
    set({ subscriptions });
  },
  getEditSubscription: (id) => {
    const subscription = get().subscriptions.find((s) => s._id === id);
    return subscription || undefined;
  },
  notifications: mockNotifications,
  setNotifications: (notifications) => set({ notifications }),
  addNotifications: (notification) => {
    const notifications = [...get().notifications];
    notifications.unshift(notification);
    set({ notifications });
  },
  logout: () =>
    set({
      vendor: null,
      products: [],
      selectedProducts: [],
    }),
});
