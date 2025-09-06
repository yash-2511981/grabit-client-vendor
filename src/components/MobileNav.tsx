import { LogOut, MenuIcon, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Logo from "./Logo";
import SidebarLink from "./SidebarLink";
import { sideBarLinks } from "@/lib/data";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useVendorStore from "@/store/store";
import useApi from "@/hooks/useApi";
import { toast } from "sonner";

const MobileNav = () => {
  const params = useLocation();
  const { vendor } = useVendorStore();
  const navigate = useNavigate();
  const { post } = useApi();

  const handlLogout = async () => {
    toast.success("Logged out");
  };
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] h-screen">
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

          <div className="flex flex-col px-4 py-3 gap-2 items-center">
            <div className="border border-amber-400 bg-amber-100 p-6 rounded-full flex  items-center justify-centerw-20">
              <User size={40} className="text-amber-600" />
            </div>
            <p className="flex">{vendor?.email}</p>
            <div className="flex lex-row gap-2 items-center justify-center">
              <Button
                variant="primary"
                title="Manage Profile"
                onClick={() => navigate("/vendor/profile")}
              >
                <User className="flexn" />
                <span className="flex">Manage</span>
              </Button>
              <Button variant="outline" title="SignUp" onClick={handlLogout}>
                <LogOut className="flex" />
                <span className="flex">Sign Up</span>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
