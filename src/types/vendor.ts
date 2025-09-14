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
  ratingCount: number;
  rating: number;
};

export type VendorSlices = {
  vendor: Vendor | null;
  setVendor: (admin: Vendor) => void;
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
  addNewProduct: (product: ProductType) => void;
  updateProduct: (product: ProductType) => void;
  selectedProducts: string[];
  selectProduct: (product: string) => void;
  deselectProduct: (product: string) => void;
  editProduct: ProductType | null;
  setEditProduct: (product: string | null) => void;
  logout: () => void;
};
