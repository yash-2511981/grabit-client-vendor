import { useState } from "react";
import Login from "./login";
import Register from "./register";

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
