import React from "react";
import Form from "../components/Form";
import bgImg from "../assets/register.json";
import Lottie from "lottie-react";
import Heading from "../components/Heading";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center md:items-start md:relative md:flex-row">
        <div className="md:fixed">
          <Heading title={"HOME"} />
        </div>
        <Lottie
          animationData={bgImg}
          className=" w-[200px] md:fixed md:w-[630px]"
          loop={true}
          autoplay={true}
        />
        <div className="md:absolute md:right-0">
          <Form />
        </div>
      </div>
    </>
  );
}

export default Home;
