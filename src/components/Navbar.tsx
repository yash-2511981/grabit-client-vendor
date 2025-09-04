import { MenuIcon } from "lucide-react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="w-full text-center h-[60px] flex sm:hidden justify-between items-center px-4">
      <Logo />
      <MenuIcon />
    </nav>
  );
};

export default Navbar;
