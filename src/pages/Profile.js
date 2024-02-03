import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import uploadLoad from "../assets/articles.json";
import signedOut from "../assets/logout.json";
import { Button } from "../components/Button";
import Form from "../components/Form";
import { AnimationLoading } from "../components/Loading";
import { useValidUser } from "../utils/useValidUser";
import Cookies from "js-cookie";
import { MailIcon } from "../assets/Icons";
const Profile = () => {
  const user = useValidUser();
  const userStore = useSelector((store) => store.loggedInUser.userData);
  const navigate = useNavigate();

  const [viewPage, setViewPage] = useState({
    profile: false,
    edit: false,
  });

  if (!Cookies.get("userId"))
    return (
      <div className="flex flex-col items-center justify-center md:flex-row">
        <div>
          <AnimationLoading animation={signedOut} />
        </div>

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
      </div>
    );

  return (
    <div className="md:max-w-md mx-auto">
      {!viewPage.edit && !viewPage.profile && (
        <>
          <InitialDetails setViewPage={setViewPage} />
        </>
      )}
      {(viewPage.profile && (
        <>
          <span
            className="cursor-pointer"
            onClick={() => setViewPage({ edit: false, profile: false })}
          >
            {"< Back"}
          </span>
          <br />
          <br />
          <ViewProfile user={userStore} />
        </>
      )) ||
        (viewPage.edit && (
          <>
            <span
              className="cursor-pointer"
              onClick={() => setViewPage({ edit: false, profile: false })}
            >
              {"< Back"}
            </span>
            <EditProfile setViewPage={setViewPage} />
          </>
        ))}
    </div>
  );
};

export default Profile;

const InitialDetails = ({ setViewPage = false }) => {
  const navigate = useNavigate();
  return (
    <div>
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

      <Button text={"Logout"} handleSubmit={() => navigate("/logout")} />
    </div>
  );
};

export const ViewProfile = ({ user = false }) => {
  return (
    <div>
      <>
        <span className="font-semibold">Profile Badge</span>
        <div className="profile mt-2 relative rounded-md">
          <div className="cover border-2 rounded-sm border-slate-500 h-[100px] w-full absolute">
            {user.coverUrl ? (
              <div>
                <img
                  src={user.coverUrl}
                  className="h-[100px] w-full bg-black object-cover"
                  alt="cover"
                />
              </div>
            ) : (
              <>
                <div className="h-full w-full bg-black object-cover"></div>
              </>
            )}
          </div>
          <div className="profile  border-2 border-slate-500 overflow-hidden rounded-full h-[60px] w-[60px] bg-black top-[66px] left-2 absolute">
            {user.profileUrl ? (
              <div>
                <img
                  src={user.profileUrl}
                  className="h-[60px] w-[60px] object-cover"
                  alt="cover"
                />
              </div>
            ) : (
              <>
                <div className="h-full w-full bg-black object-cover"></div>
              </>
            )}
          </div>
        </div>
        <div className="pt-[140px] bg-black rounded-md border-2 border-slate-500  p-3">
          <span className="font-semibold flex items-center gap-1 w-full">
            <div>{user?.username}</div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/32/Verified-badge.png"
              className="w-[14px] h-[14px]"
              alt="verify"
            />
          </span>
          <span className="font-normal text-[10px] flex items-center gap-1">
            <div>{user?.email}</div>
            <MailIcon />
          </span>
          <span className="font-normal text-[13px]">{user?.bio}</span>
        </div>
      </>
    </div>
  );
};

const EditProfile = () => {
  return (
    <div className="mt-3">
      <Form />
    </div>
  );
};
