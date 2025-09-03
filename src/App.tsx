import { useEffect, type ReactNode } from "react";
import useAdminStore from "./store/store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/landing";
import Auth from "./pages/auth/Auth";
import useApi from "./hooks/useApi";
import { GET_VENDOR_INFO } from "./lib/routes";
import useVendorStore from "./store/store";

interface RouteWrapperProps {
  children: ReactNode;
}

function AuthRoutes({ children }: RouteWrapperProps) {
  const { vendor } = useAdminStore();
  const isAuthenticated = !!vendor;
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}

function PriavteRoutes({ children }: RouteWrapperProps) {
  const { vendor } = useAdminStore();
  const isAuthenticated = !!vendor;
  return isAuthenticated ? children : <Navigate to="/" />;
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* navbar */}
      {children}
      {/* footer */}
    </>
  );
}

function App() {
  const { get } = useApi();
  const { setVendor, vendor } = useVendorStore();
  console.log(vendor);

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

  return (
    <BrowserRouter>
      <Layout>
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
            path="/dashboard"
            element={
              <PriavteRoutes>
                <Dashboard />
              </PriavteRoutes>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
