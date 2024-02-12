import Cookies from "js-cookie";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../../assets/earth.json";
import { Button } from "../../components/Button";
import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import axios, { axiosErrorToast } from "../../utils/axios";
import { toast } from "react-toastify";
import {
  CorrectIcon,
  ShowOffIcon,
  ShowOnIcon,
  WrongIcon,
} from "../../assets/Icons";
import StarAnimation from "../../components/StarsAnimation";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userAvailable, setUserAvailable] = useState(null);
  const existingUser = Cookies.get("token");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    repassword: "",
    email: "",
  });

  useEffect(() => {
    if (existingUser) {
      Cookies.remove("token");
    }
  }, [existingUser]);

  useEffect(() => {
    if (userData.username.length > 5) {
      handleCheckUsernameAvailable(userData.username);
    }
    setUserAvailable(null);
  }, [userData.username]);

  function handleRegister() {
    if (userData.password !== userData.repassword) {
      toast.error("passwords did not match");
    }
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

    function handleShowPassword() {
      setShowPassword((prev) => !prev.password);
    }
  }

  function handleCheckUsernameAvailable(username) {
    axios.get(`user/${username}/check-username`).then((res) => {
      if (res.data.success === "true") {
        setUserAvailable(true);
      } else {
        setUserAvailable(false);
      }
    });
  }
  return (
    <>
      {/* <div className="w-full min-h-[100vh] h-auto flex justify-center md:bg-black bg-[#161B22] pt-3">
        <div className="authCard w-[300px]">
          <div className="w-[150px] mx-auto">
            <Lottie animationData={bgImg} loop={true} autoplay={true} />
          </div>
          <div className="logo pb-3">
            <span className="flex gap-1 justify-center text-white">
              {" "}
              Sign in to <Logo />
            </span>
          </div>
          <div className="w-[300px] bg-[#161B22] md:p-3 rounded-md flex flex-col gap-2">
            <TextField
              name="username"
              title="Enter Username"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  username: e,
                })
              }
              value={userData.username}
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
              value={userData.email}
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
              onIcon={<ShowOnIcon />}
              offIcon={<ShowOffIcon />}
              value={userData.password}
            />

            <TextField
              name="re-password"
              type="password"
              title="Re-Enter Password"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  repassword: e,
                })
              }
              onIcon={<ShowOnIcon />}
              offIcon={<ShowOffIcon />}
              value={userData.repassword}
            />
            <Button
              disabled={loading}
              text="Register"
              handleSubmit={handleRegister}
              loading={loading}
              sx={"h-[40px] bg-[#c3073fd9]"}
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
      </div> */}
      <div className="w-full min-h-[100vh] h-auto flex justify-center md:bg-black bg-[#161B22] pt-2">
        <div className="authCard w-[300px]">
          <div className="w-[150px] mx-auto">
            <Lottie animationData={bgImg} loop={true} autoplay={true} />
          </div>
          <div className="logo pb-3">
            <span className="flex gap-1 justify-center text-white">
              {" "}
              Welcome to <Logo />
            </span>
          </div>
          <div className="w-[300px] bg-[#161B22] md:p-3 rounded-md flex flex-col gap-2">
            <TextField
              name="username"
              title="Enter Username"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  username: e,
                })
              }
              value={userData.username}
              sx={"bg-transparent"}
              onIcon={
                userAvailable === true ? (
                  <CorrectIcon />
                ) : (
                  userAvailable === false && <WrongIcon />
                )
              }
              toolTip={
                userAvailable === true
                  ? "username available"
                  : "username not available"
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
              value={userData.email}
              sx={"bg-transparent"}
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
              onIcon={<ShowOnIcon />}
              offIcon={<ShowOffIcon />}
              value={userData.password}
              sx={"bg-transparent"}
            />

            <TextField
              name="re-password"
              type="password"
              title="Re-Enter Password"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  repassword: e,
                })
              }
              onIcon={<ShowOnIcon />}
              offIcon={<ShowOffIcon />}
              value={userData.repassword}
              sx={"bg-transparent"}
            />
            <Button
              disabled={loading || userAvailable}
              text="Register"
              handleSubmit={handleRegister}
              loading={loading}
              sx={"h-[40px] bg-[#c3073fd9]"}
            />
          </div>

          <div className="h-[80px] border-2 mt-2 border-[#161B22] rounded-md flex gap-2 justify-center items-center">
            <h4 className="font-normal text-white ">
              Already have an account?{" "}
              <span
                className="text-[#c3073f] cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign in ➞
              </span>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
