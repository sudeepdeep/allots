import Cookies from "js-cookie";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../../assets/lottie-bg.json";
import { Button } from "../../components/Button";
import Logo from "../../components/Logo";
import TextField from "../../components/TextField";
import axios, { axiosErrorToast } from "../../utils/axios";
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
          navigate("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  }
  return (
    <div className="w-full min-h-[100vh] h-auto flex md:flex-row flex-col-reverse items-center md:justify-center justify-start bg-black">
      <div className="md:w-[500px]">
        <Lottie animationData={bgImg} loop={true} autoplay={true} />
      </div>
      <div className="authCard max-w-md  flex-col items-center text-black justify-center h-auto px-10 shadow-md rounded-md">
        <div className="logo w-[80px] pt-3 mx-auto h-[80px]">
          <Logo />
        </div>
        <TextField
          name="username"
          title="Enter Username"
          value={username}
          onChange={(e) => setUsername(e)}
        />

        <TextField
          name="password"
          type="password"
          title="Enter Password"
          value={password}
          onChange={(e) => setPassword(e)}
        />
        <Button disabled={loading} text={"Login"} handleSubmit={handleLogin} />

        <h4 className="font-normal text-white">
          New user?{" "}
          <span
            className="text-[#c3073f] cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register Here
          </span>
        </h4>
      </div>
    </div>
  );
}

export default Login;
