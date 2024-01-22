import React, { useEffect, useState } from "react";
import axios, { axiosErrorToast } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Lottie from "lottie-react";
import logo from "../../assets/loginlogo.png";
import bgImg from "../../assets/register.json";
import TextField from "../../components/TextField";
import { Button } from "../../components/Button";
import Logo from "../../components/Logo";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const existingUser = Cookies.get("token");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    if (existingUser) {
      Cookies.remove("token");
    }
  }, [existingUser]);

  function handleRegister() {
    setLoading(true);

    axios
      .post("/user", {
        username: userData.username,
        password: userData.password,
        email: userData.email,
      })
      .then((res) => {
        setLoading(false);

        navigate("/success");
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  }
  return (
    <>
      <div className="w-full min-h-[100vh] h-auto flex md:flex-row flex-col-reverse items-center md:justify-center justify-start bg-black">
        <div className="md:w-[500px]">
          <Lottie animationData={bgImg} loop={true} autoplay={true} />
        </div>
        <div className="authCard max-w-md  flex-col items-center text-black justify-center h-auto px-10 shadow-md rounded-md">
          <div className="logo w-[80px] pt-3  mx-auto h-[80px]">
            <Logo />
          </div>

          <TextField
            name="username"
            title="Enter Username"
            onChange={(e) =>
              setUserData({
                ...userData,
                username: e,
              })
            }
          />

          <TextField
            name="email"
            type="email"
            title="Enter Email"
            onChange={(e) =>
              setUserData({
                ...userData,
                email: e,
              })
            }
          />

          <TextField
            name="password"
            type="password"
            title="Enter Password"
            onChange={(e) =>
              setUserData({
                ...userData,
                password: e,
              })
            }
          />

          <Button
            disabled={loading}
            text="Register"
            handleSubmit={handleRegister}
          />

          <h4 className="font-normal mt-2 text-white">
            Already had an account!{" "}
            <span
              className="text-[#c3073f] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </h4>
        </div>
      </div>
    </>
  );
}

export default Register;
