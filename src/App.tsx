import { useEffect, type ReactNode } from "react";
import useAdminStore from "./store/store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/landing";
import Auth from "./pages/auth/Auth";

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
  const { vendor } = useAdminStore();
  const isAuthenticated = !!vendor;
  return (
    <>
      {/* navbar */}
      {isAuthenticated ? (
        <PriavteRoutes>{children}</PriavteRoutes>
      ) : (
        <AuthRoutes>{children}</AuthRoutes>
      )}
      {/* footer */}
    </>
  );
}

function App() {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
