import { MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import Logo from "./Logo";
import SidebarLink from "./SidebarLink";
import { sideBarLinks } from "@/lib/data";
import { useLocation } from "react-router-dom";
import SidebarFooter from "./SidebarFooter";

const MobileNav = () => {
  const params = useLocation();

  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="w-[220px] h-screen app-background">
        <Logo />
        <div className="flex flex-col justify-between h-[calc(100vh-80px)]">
          <div className="flex flex-col">
            <div className="mt-5 flex flex-col space-y-2 p-3 ">
              <h3 className="font-bold text-sm">Dashboard</h3>
              <SheetClose asChild>
                <SidebarLink
                  link={sideBarLinks[0]}
                  active={params.pathname === sideBarLinks[0].navigate}
                />
              </SheetClose>
            </div>
            <div className="flex flex-col space-y-2 p-3">
              <h3 className="font-bold text-sm">Services</h3>
              {sideBarLinks.map((link, index) => {
                if (index !== 0)
                  return (
                    <SheetClose asChild key={index}>
                      <SidebarLink
                        link={link}
                        active={params.pathname === link.navigate}
                      />
                    </SheetClose>
                  );
              })}
            </div>
          </div>
          <SidebarFooter />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
