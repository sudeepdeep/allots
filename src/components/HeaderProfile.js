import React from "react";
import { ActivateProfileIcon, ProfileIcon } from "../assets/Icons";
import { useSelector } from "react-redux";

function HeaderProfile({ active = false }) {
  const user = useSelector((store) => store.loggedInUser.userData);
  return (
    <>
      {user.profileUrl ? (
        <>
          <div className="md:hidden block">
            <img
              src={user.profileUrl}
              alt="profile"
              className={`profile w-[30px] h-[30px] ${
                active && "border-2 border-[#c3073f]"
              } rounded-full object-cover`}
            />
          </div>
          <div className="md:block hidden">
            {active ? <ActivateProfileIcon /> : <ProfileIcon />}
          </div>
        </>
      ) : (
        <>{active ? <ActivateProfileIcon /> : <ProfileIcon />}</>
      )}
    </>
  );
}

export default HeaderProfile;
