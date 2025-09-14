import { useNavigate } from "react-router-dom";
import logo from "/logo.png";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="items-center space-x-1 cursor-pointer flex justify-start md:justify-start p-2 transition-all duration-300"
      onClick={() => navigate("/vendor")}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center">
        <img src={logo} alt="logo" />
      </div>
      <span className="font-bold text-2xl text-gray-800">Grabit</span>
    </div>
  );
};

export default Logo;
