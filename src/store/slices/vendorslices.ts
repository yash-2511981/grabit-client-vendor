import type { Vendor, VendorSlices } from "src/types/vendor";
import type { StateCreator } from "zustand";

export const vendorSlices: StateCreator<VendorSlices> = (set) => ({
  vendor: null,
  setVendor: (vendor: Vendor) => set({ vendor }),
});
