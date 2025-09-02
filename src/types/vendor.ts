export interface Vendor {
  id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
}

export interface VendorSlices {
  vendor: Vendor | null;
  setVendor: (admin: Vendor) => void;
}
