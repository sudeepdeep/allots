import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import {
  ActivateHomeIcon,
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
import Cookies from "js-cookie";

const menuLists = [
  {
    title: "Global",
    path: "/",
    icon: <ExploreIcon />,
    activeIcon: <ActivateHomeIcon />,
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
    icon: <ProfileIcon />,
    activeIcon: <ActivateProfileIcon />,
  },
];

function Header({ scrollPosition }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState("");
  const userId = Cookies.get("userId");

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <>
      <h2 className="text-xl text-white font-bold tracking-widest hidden md:block">
        <Logo />
      </h2>
      <div className="flex w-full justify-around">
        {menuLists.map((item, index) => (
          <div className="relative">
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
        {!userId ? "login" : "user"}
      </h2>
    </>
  );
}

export default Header;
