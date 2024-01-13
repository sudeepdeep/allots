import Lottie from "lottie-react";
import Body from "../components/Body";
import Form from "../components/Form";
import bgImg from "../assets/register.json";

const Profile = () => {
  return (
    <>
      <Body>
        <Lottie
          animationData={bgImg}
          className=" w-[200px] md:w-[630px]"
          loop={true}
          autoplay={true}
        />
        <Form />
      </Body>
    </>
  );
};

export default Profile;
