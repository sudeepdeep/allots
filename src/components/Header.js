import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivateExploreIcon,
  ActivateMessageIcon,
  ActiveAdd,
  ActiveLocationIcon,
  Add,
  ExploreIcon,
  LocationIcon,
  MessageIcon,
} from "../assets/Icons";
import axios from "../utils/axios";
import { assignUsers, clearUsers } from "../utils/slice";
import ActiveStrip from "./ActiveStrip";
import HeaderProfile from "./HeaderProfile";
import Logo from "./Logo";
import AllMessages from "../pages/messages/AllMessages";

function Header({ scrollPosition }) {
  const location = useLocation();
  const dispatch = useDispatch();
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

    {
      title: "Local",
      path: "/local-news",
      icon: <LocationIcon />,
      activeIcon: <ActiveLocationIcon />,
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
      title: "Messages",
      path: "/messages",
      icon: <MessageIcon />,
      activeIcon: <ActivateMessageIcon />,
    },

    {
      title: "Profile",
      path: `/profile`,
      icon: <HeaderProfile />,
      activeIcon: <HeaderProfile active={true} />,
    },
  ];

  function handleSearch(e) {
    if (e) {
      axios
        .get(`/user/${Cookies.get("userId")}`, {
          params: { search: e },
        })
        .then((res) => {
          dispatch(assignUsers(res.data));
        });
    } else {
      dispatch(clearUsers());
    }
  }

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
                    className={`itemMenu w-full h-full pt-2 flex gap-2  ${
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
                  className={`relative  w-full ${
                    scrollPosition > 60 ? "top-1" : "top-3"
                  } hidden md:block `}
                >
                  <ActiveStrip />
                </div>
              </>
            )}
          </div>
        ))}
        {Cookies.get("userId") && (
          <>
            <div className="text-white md:block hidden">
              <input
                type="text"
                placeholder="search user"
                className="bg-[#0D1117] w-[200px]"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <h2
        className="text-sm text-white font-thin tracking-widest hidden md:block cursor-pointer"
        onClick={() => navigate("login")}
      >
        {userStore.profileUrl ? (
          <img
            src={userStore.profileUrl}
            className="w-[50px] h-[40px] rounded-full object-cover border-2 border-slate-400"
            alt="profile"
          />
        ) : (
          <>{userStore?.username}</>
        )}
      </h2>
    </>
  );
}

export default Header;
