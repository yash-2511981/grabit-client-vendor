import { sideBarLinks } from "@/lib/data";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  const params = useLocation();

  return (
    <section className="md:w-[250px] h-screen hidden md:block  border-r-2 transition-all duration-300 app-background ">
      <Logo />

      <div className="flex flex-col justify-between h-[calc(100vh-70px)]">
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
        <SidebarFooter />
      </div>
    </section>
  );
};

export default Sidebar;
