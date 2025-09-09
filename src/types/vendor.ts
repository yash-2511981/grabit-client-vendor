import type { ProductType } from "./formType";

export type Vendor = {
  id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
};

export type VendorSlices = {
  vendor: Vendor | null;
  setVendor: (admin: Vendor) => void;
  editProduct: ProductType | null;
  setEditProduct: (product: ProductType) => void;
  logout: () => void;
};
