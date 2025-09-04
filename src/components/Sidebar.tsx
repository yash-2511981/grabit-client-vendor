import { sideBarLinks } from "@/lib/data";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const params = useLocation();

  return (
    <section className="md:w-[250px] sm:w-[80px] h-full hidden sm:block border-r-2">
      <Logo />
      <div className="mt-5 flex flex-col space-y-6 p-4">
        {sideBarLinks.map((link, index) => (
          <SidebarLink
            link={link}
            key={index}
            active={params.pathname === link.navigate}
          />
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
