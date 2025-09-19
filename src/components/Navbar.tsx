import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="w-full text-center h-[60px] flex md:hidden justify-between items-center px-2 bg-transparent fixed">
      <div className="w-12 h-12 rounded-full flex items-center justify-center">
        <img src="/logo.png" alt="logo" />
      </div>
      <MobileNav />
    </nav>
  );
};

export default Navbar;
