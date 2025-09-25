export type Vendor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  category: "veg" | "non-veg" | "both";
  ownerName: string;
  ownerEmail: string;
  ownerContact: string;
  restaurantImageUrl: string;
  verified: boolean;
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
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
  addNewProduct: (product: ProductType) => void;
  updateProduct: (product: ProductType) => void;
  deleteProducts: () => void;
  selectedProducts: string[];
  selectProduct: (product: string) => void;
  deselectProduct: (product: string) => void;
  editProduct: ProductType | null;
  setEditProduct: (product: string | null) => void;
  logout: () => void;
};
