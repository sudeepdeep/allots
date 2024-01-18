import Lottie from "lottie-react";
import Form from "../components/Form";
import bgImg from "../assets/register.json";

const Profile = () => {
  return (
    <>
      <div className="w-[100%] profile flex flex-col md:flex-row">
        <div className=" ">
          <Lottie
            animationData={bgImg}
            className=" w-[200px] mx-auto md:w-[630px]"
            loop={true}
            autoplay={true}
          />
        </div>
        <Form />
      </div>
    </>
  );
};

export default Profile;
