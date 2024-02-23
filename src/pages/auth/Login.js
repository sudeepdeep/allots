import Cookies from "js-cookie";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../../assets/earth.json";
import { Button } from "../../components/Button";
import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import axios, { axiosErrorToast } from "../../utils/axios";
import { ShowOffIcon, ShowOnIcon } from "../../assets/Icons";
function Login() {
  const existingUserCheck = Cookies.get("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingUserCheck) {
      navigate("/");
    }
  }, [existingUserCheck]);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    setLoading(true);
    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        setLoading(false);
        if (res.data.access_token) {
          Cookies.set("token", res.data.access_token);
          Cookies.set("userId", res.data.userId);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  }
  return (
    <div className="w-full min-h-[100vh] h-auto flex justify-center md:bg-black bg-[#161B22] pt-2">
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
            title="Username"
            value={username}
            onChange={(e) => setUsername(e)}
          />

          <TextField
            name="password"
            type="password"
            title="Password"
            value={password}
            onChange={(e) => setPassword(e)}
            onIcon={<ShowOnIcon />}
            offIcon={<ShowOffIcon />}
          />
          <Button
            disabled={loading}
            text={"Login"}
            loading={loading}
            handleSubmit={handleLogin}
            btnHeight={true}
            sx={"h-[40px] bg-[#c3073fd9]"}
          />
          <p
            onClick={() => navigate("/audio-login")}
            className="cursor-pointer text-right text-slate-300"
          >
            Login with audio 🗣
          </p>
        </div>
        <p className="text-slate-400 text-center mt-3">or</p>
        <Button
          disabled={loading}
          text={"Login as Guest"}
          handleSubmit={() => navigate("/")}
          sx={"h-[40px] bg-transparent"}
        />

        <div className="h-[80px] border-2 border-[#161B22] rounded-md flex gap-2 justify-center items-center">
          <h4 className="font-normal text-white ">
            New user?{" "}
            <span
              className="text-[#c3073f] cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Create an account
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
