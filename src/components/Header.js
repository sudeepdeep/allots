import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { useState } from "react";
import {
  ActivateExploreIcon,
  ActivateProfileIcon,
  ActiveAdd,
  ActiveLocationIcon,
  Add,
  ExploreIcon,
  LocationIcon,
  ProfileIcon,
} from "../assets/Icons";
import ActiveStrip from "./ActiveStrip";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import HeaderProfile from "./HeaderProfile";

function Header({ scrollPosition }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState("");
  const userId = Cookies.get("userId");
  const userStore = useSelector((store) => store.loggedInUser.userData);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const menuLists = [
    {
      title: "Global",
      path: "/",
      icon: <ExploreIcon />,
      activeIcon: <ActivateExploreIcon />,
    },
    // {
    //   title: "Inbox",
    //   path: "/inbox",
    //   icon: <MessageIcon />,
    //   activeIcon: <ActivateMessageIcon />,
    // },

    {
      title: "Add",
      path: "/add",
      icon: <Add />,
      activeIcon: <ActiveAdd />,
    },
    {
      title: "Local",
      path: "/local-news",
      icon: <LocationIcon />,
      activeIcon: <ActiveLocationIcon />,
    },
    {
      title: "Profile",
      path: `/profile`,
      icon: <HeaderProfile />,
      activeIcon: <HeaderProfile active={true} />,
    },
  ];
  return (
    <>
      <h2 className="text-xl text-white font-bold tracking-widest hidden md:block">
        <Logo />
      </h2>
      <div className="flex w-full justify-around">
        {menuLists.map((item, index) => (
          <div className="relative" key={item.path}>
            <NavLink to={item.path}>
              {({ isActive }) => (
                <>
                  <span
                    className={`itemMenu w-full h-full flex gap-2  ${
                      !isActive ? "text-white" : "text-[#c3073f]"
                    }  uppercase tracking-widest w-[100%] cursor-pointer hover:text-[#c3073f]`}
                  >
                    <>
                      {isActive ? item.activeIcon : item.icon}
                      <span className="md:block hidden">{item.title}</span>
                    </>
                  </span>
                </>
              )}
            </NavLink>
            {item.path === path && (
              <>
                <div
                  className={`relative bg-green-500 w-full ${
                    scrollPosition > 60 ? "top-2" : "top-5"
                  } hidden md:block `}
                >
                  <ActiveStrip />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <h2
        className="text-sm text-white font-thin tracking-widest hidden md:block cursor-pointer"
        onClick={() => navigate("login")}
      >
        {!userId ? (
          "login"
        ) : (
          <>
            {userStore.profileUrl ? (
              <img
                src={userStore.profileUrl}
                className="w-[50px] h-[40px] rounded-full object-cover border-2 border-slate-400"
                alt="profile"
              />
            ) : (
              <>{userStore?.username}</>
            )}
          </>
        )}
      </h2>
    </>
  );
}

export default Header;
