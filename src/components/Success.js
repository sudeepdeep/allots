import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import success from "../assets/success.json";
import { AnimationLoading } from "./Loading";
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
        <AnimationLoading animation={success} />
      </div>
    </>
  );
}

export default Success;
