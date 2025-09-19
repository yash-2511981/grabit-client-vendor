import { sideBarLinks } from "@/lib/data";
import Logo from "./Logo";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import useVendorStore from "@/store/store";
import useApi from "@/hooks/useApi";
import { SIGN_OUT } from "@/lib/routes";

const Sidebar = () => {
  const params = useLocation();
  const { vendor, logout } = useVendorStore();
  const navigate = useNavigate();
  const { get } = useApi();

  const handlLogout = async () => {
    try {
      const response = await get(SIGN_OUT);
      if (response?.success) {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="md:w-fit h-screen hidden md:block  border-r-2 transition-all duration-300 app-background ">
      <Logo />

      <div className="flex flex-col justify-between h-[calc(100vh-80px)]">
        <div className="flex flex-col">
          <div className="mt-5 flex flex-col space-y-2 p-3 ">
            <h3 className="font-bold text-sm">Dashboard</h3>
            <SidebarLink
              link={sideBarLinks[0]}
              active={params.pathname === sideBarLinks[0].navigate}
            />
          </div>
          <div className="flex flex-col space-y-2 p-3">
            <h3 className="font-bold text-sm">Services</h3>
            {sideBarLinks.map((link, index) => {
              if (index !== 0)
                return (
                  <SidebarLink
                    link={link}
                    key={index}
                    active={params.pathname === link.navigate}
                  />
                );
            })}
          </div>
        </div>

        <div className="flex flex-col px-4 gap-2 items-center">
          <div className="border border-amber-400 bg-amber-100 p-6 rounded-full hidden md:flex  items-center justify-center">
            <User size={40} className="text-amber-600" />
          </div>
          <p className="truncate w-[90%] text-center">{vendor?.email}</p>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Button
              variant="primary"
              className="min-w-15"
              title="Manage Profile"
              onClick={() => navigate("/vendor/profile")}
            >
              <User className="flex" />
              <span className="lg:flex hidden">Manage</span>
            </Button>
            <Button
              className="min-w-15"
              variant="outline"
              title="SignUp"
              onClick={handlLogout}
            >
              <LogOut className="flex " />
              <span className="lg:flex hidden">Sign Up</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
