import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../utils/slice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkToken = Cookies.get("token");
  useEffect(() => {
    if (checkToken) {
      Cookies.remove("token");
      Cookies.remove("userId");
    }
    dispatch(clearUser());
    navigate("/login");
  }, [checkToken]);
  return (
    <div className="bg-black flex text-white items-center justify-center font-semibold tracking-wide">
      Logging out.. please wait
    </div>
  );
}

export default Logout;
