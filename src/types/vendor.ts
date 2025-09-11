export type Vendor = {
  id: string;
  name: string;
  email: string;
  contact: string;
  address: string;
};

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: "veg" | "non-veg";
  imageUrl: string;
};

export type VendorSlices = {
  vendor: Vendor | null;
  setVendor: (admin: Vendor) => void;
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
  editProduct: ProductType | null;
  setEditProduct: () => void;
  selectedProducts: string[];
  addSelectedProducts: (product: string) => void;
  logout: () => void;
};
