import Lottie from "lottie-react";
import Form from "../components/Form";
import bgImg from "../assets/register.json";
import signedOut from "../assets/logout.json";
import { useValidUser } from "../utils/useValidUser";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const [viewPage, setViewPage] = useState({
    profile: false,
    edit: false,
  });

  return (
    <div>
      {!viewPage.edit && !viewPage.profile && (
        <>
          <InitialDetails setViewPage={setViewPage} />
        </>
      )}
      {(viewPage.profile && <ViewProfile setViewPage={setViewPage} />) ||
        (viewPage.edit && <EditProfile setViewPage={setViewPage} />)}
    </div>
  );
};

export default Profile;

const InitialDetails = ({ setViewPage = false }) => {
  return (
    <>
      <Button
        text={"View Profile"}
        handleSubmit={() => {
          setViewPage({
            profile: true,
            edit: false,
          });
        }}
      />
      <Button
        text={"Edit Profile"}
        handleSubmit={() => {
          setViewPage({
            profile: false,
            edit: true,
          });
        }}
      />
    </>
  );
};

const ViewProfile = ({ setViewPage = false }) => {
  const user = useSelector((store) => store.loggedInUser.userData);
  return (
    <div>
      <span
        className="cursor-pointer"
        onClick={() => setViewPage({ edit: false, profile: false })}
      >
        {"< Back"}
      </span>
      <br />
      <br />

      <>
        <span className="font-semibold">Profile Badge</span>
        <div className="profile mt-2 relative rounded-md">
          <div className="cover border-2 rounded-sm border-slate-500 h-[100px] w-full absolute">
            <img
              src={user.profileUrl}
              className="h-full w-full bg-black object-cover"
              alt="cover"
            />
          </div>
          <div className="profile  border-2 border-slate-500 rounded-full h-[60px] w-[60px] bg-black top-[56px] left-2 absolute">
            <img
              src={user.profileUrl}
              className="h-full w-full object-cover"
              alt="cover"
            />
          </div>
        </div>
        <div className="pt-[120px] bg-black rounded-md border-2 border-slate-500  p-3">
          <span className="font-semibold flex items-center gap-1 w-full">
            <div>{user?.username}</div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/32/Verified-badge.png"
              className="w-[14px] h-[14px]"
              alt="verify"
            />
          </span>
          <span className="font-normal text-[10px]">{user?.email}</span>
          <br />
          <span className="font-normal text-[13px]">{user?.bio}</span>
        </div>
      </>
    </div>
  );
};

const EditProfile = ({ setViewPage = false }) => {
  const user = useValidUser();
  const navigate = useNavigate();
  return (
    <>
      <span
        className="cursor-pointer"
        onClick={() => setViewPage({ edit: false, profile: false })}
      >
        {"< Back"}
      </span>
      <div className="w-[100%] profile flex flex-col md:flex-row items-center justify-center">
        {!user.status ? (
          <div>
            <Lottie
              animationData={signedOut}
              className=" w-[200px] mx-auto md:w-[630px]"
              loop={true}
              autoplay={true}
            />
          </div>
        ) : (
          <Lottie
            animationData={bgImg}
            className=" w-[200px] mx-auto md:w-[630px]"
            loop={true}
            autoplay={true}
          />
        )}

        {!user.status ? (
          <span className="text-center">
            Oops..!! You haven't logged in yet.
            <br />
            <span
              className="text-[#c3073f] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              {" "}
              Click here to login.
            </span>
          </span>
        ) : (
          <div>
            <Form />
          </div>
        )}
      </div>
    </>
  );
};
