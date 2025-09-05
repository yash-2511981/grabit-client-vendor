import { sideBarLinks } from "@/lib/data";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const params = useLocation();

  return (
    <section className="md:w-[250px] sm:w-[60px] h-full hidden sm:block border-r-2 transition-all duration-300">
      <Logo />
      <div className="mt-5 flex flex-col space-y-2 p-3 max-md:mt-13 ">
        <h3 className="font-bold text-sm hidden md:block">Dashboard</h3>
        <SidebarLink
          link={sideBarLinks[0]}
          active={params.pathname === sideBarLinks[0].navigate}
        />
      </div>
      <div className="flex flex-col space-y-2 p-3">
        <h3 className="font-bold text-sm hidden md:block">Services</h3>
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
    </section>
  );
};

export default Sidebar;
