import { create } from "zustand";
import type { VendorSlices } from "src/types/vendor";
import { vendorSlices } from "./slices/vendorslices";

const useAdminStore = create<VendorSlices>()((...a) => ({
  ...vendorSlices(...a),
}));

export default useAdminStore;
