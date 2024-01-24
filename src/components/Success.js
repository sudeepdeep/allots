import Lottie from "lottie-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import success from "../assets/success.json";
function Success() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = setTimeout(() => {
      navigate("/local-news");
    }, 1500);

    return () => clearTimeout(redirect);
  }, []);
  return (
    <>
      <div className="w-full h-[70vh] flex items-center">
        <Lottie
          animationData={success}
          className=" w-[200px] mx-auto my-auto md:w-[630px]"
          loop={true}
          autoplay={true}
        ></Lottie>
      </div>
    </>
  );
}

export default Success;
