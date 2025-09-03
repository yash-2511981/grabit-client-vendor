import { create } from "zustand";
import type { VendorSlices } from "src/types/vendor";
import { vendorSlices } from "./slices/vendorslices";

const useVendorStore = create<VendorSlices>()((...a) => ({
  ...vendorSlices(...a),
}));

export default useVendorStore;
