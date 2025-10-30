import { useEffect, type ReactNode } from "react";
import useAdminStore from "./store/store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Auth from "./pages/auth/Auth";
import useApi from "./hooks/useApi";
import { GET_ALL_PRODUCTS, GET_VENDOR_INFO } from "./lib/routes";
import useVendorStore from "./store/store";
import VendorLayout from "./pages/vendor/VendorLayout";
import ManageOrders from "./pages/vendor/orders/ManageOrders";
import ManageProfile from "./pages/vendor/profile/ManageProfile";
import ManageSubscriptions from "./pages/vendor/subscriptions/ManageSubscriptions";
import ManageWallet from "./pages/vendor/wallet/MangeWallet";
import Dashboard from "./pages/vendor/dashboard/Dashboard";
import ManageProduct from "./pages/vendor/products/ManageProduct";
import { SocketProvider } from "./context/useSocketContext";
interface RouteWrapperProps {
  children: ReactNode;
}

function AuthRoutes({ children }: RouteWrapperProps) {
  const { vendor } = useAdminStore();
  const isAuthenticated = !!vendor;
  return isAuthenticated ? <Navigate to="/vendor" /> : children;
}

function PriavteRoutes({ children }: RouteWrapperProps) {
  const { vendor } = useAdminStore();
  const isAuthenticated = !!vendor;
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  const { get } = useApi();
  const { setVendor, setProducts, vendor } = useVendorStore();

  useEffect(() => {
    const fetchData = async () => {
      const getVendorData = await get(GET_VENDOR_INFO);

      if (getVendorData?.success) {
        setVendor(getVendorData.data.restaurant);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!vendor) return;
    const fetchData = async () => {
      const [productData] = await Promise.all([get(GET_ALL_PRODUCTS)]);
      if (productData?.success) {
        setProducts(productData.data.products);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoutes>
              <Landing />
            </AuthRoutes>
          }
        />
        <Route
          path="/auth"
          element={
            <AuthRoutes>
              <Auth />
            </AuthRoutes>
          }
        />
        <Route
          path="/vendor"
          element={
            <PriavteRoutes>
              <SocketProvider>
                <VendorLayout />
              </SocketProvider>
            </PriavteRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ManageProduct />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="profile" element={<ManageProfile />} />
          <Route path="subscriptions" element={<ManageSubscriptions />} />
          <Route path="wallet" element={<ManageWallet />} />
          <Route element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
