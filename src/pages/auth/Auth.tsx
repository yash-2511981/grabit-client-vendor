import { useState } from "react";
import Login from "./components/login";
import Register from "./components/register";

const Auth = () => {
  const [openLogin, setOpenLogin] = useState(true);

  return (
    <>
      {openLogin ? (
        <Login setOpenLogin={setOpenLogin} />
      ) : (
        <Register setOpenLogin={setOpenLogin} />
      )}
    </>
  );
};

export default Auth;
