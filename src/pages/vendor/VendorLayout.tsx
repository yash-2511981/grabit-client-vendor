import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

function VendorLayout() {
  return (
    <div className="h-screen flex overflow-y-auto hide-scrollbar">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default VendorLayout;
