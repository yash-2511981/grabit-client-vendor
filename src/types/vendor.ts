export type Vendor = {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  pincode: string;
  category?: "veg" | "non-veg" | "both";
  ownerName?: string;
  ownerEmail?: string;
  ownerContact?: string;
  restaurantImageUrl?: string;
  emailNotify?: boolean;
  smsNotify?: boolean;
  verified?: boolean;
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

  createdAt: string;
  updatedAt: string;
};

export type Subscription = {
  _id: string;
  restaurant: string;
  name: string;
  duration: "1m" | "3m" | "6m" | "12m";

  weeklyMenu: string[];

  price: number;
  save: number;
  mealTime: "breakfast" | "lunch" | "dinner";
  category: "veg" | "non-veg" | "both";

  createdAt: string;
  updatedAt: string;
};

export type BankDetailsType = {
  _id: string | undefined;
  partnerId: string | undefined;
  bankName: string | undefined;
  branchName: string | undefined;
  accountHolderName: string | undefined;
  accountNo: string | undefined;
  ifscCode: string | undefined;
};

export type VendorDocuments = {
  _id: string;
  vendorId: string;
  foodLicensIssueDate: Date | undefined;
  foodLicensExpiryDate: Date | undefined;
  aadharCardNumber: number | undefined;
  panCardNumber: string | undefined;
  verificationStatus: "pending" | "send for approval" | "rejected" | "verified";
};

export type Notification = {
  _id: string;
  text?: string;
  seen: boolean;
  code?: string;
  orderId?: string;
  createdAt: Date;
  type: "warning" | "code" | "update";
};

export type PendingOrder = {
  _id: string;
  products: {
    product: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
  }[];
  amount: number;
};

export type VendorSlices = {
  vendor: Vendor | null;
  bankDetails: BankDetailsType | null;
  documents: VendorDocuments | null;
  open: boolean | undefined;
  products: ProductType[];
  selectedProducts: string[];
  subscriptions: Subscription[];
  notifications: Notification[];
  pendingOrders: PendingOrder[];
  setPendingOrders: (pendingOrders: PendingOrder[]) => void;
  addPendingOrder: (pendingOrder: PendingOrder) => void;
  setVendor: (admin: Vendor) => void;
  setVendorDocuments: (docs: VendorDocuments) => void;
  setBankDetails: (details: BankDetailsType) => void;
  setOpen: (open: boolean) => void;
  emptySelectedProduct: () => void;
  setProducts: (products: ProductType[]) => void;
  addNewProduct: (product: ProductType) => void;
  updateProducts: (product: ProductType) => void;
  deleteProducts: () => void;
  selectProduct: (product: string) => void;
  deselectProduct: (product: string) => void;
  getEditProduct: (product: string | null) => ProductType | null;
  setSubscriptions: (subscriptions: Subscription[]) => void;
  addSubscription: (subscription: Subscription) => void;
  updateSubscription: (subscription: Subscription) => void;
  deleteSubscriptions: (subscriptionIds: string[]) => void;
  getEditSubscription: (id: string) => Subscription | undefined;
  setNotifications: (notifications: Notification[]) => void;
  addNotifications: (Notification: Notification) => void;
  logout: () => void;
};
