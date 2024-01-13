import React from "react";
import { NavLink } from "react-router-dom";

import {
  HomeIcon,
  ExploreIcon,
  MessageIcon,
  Add,
  ProfileIcon,
  ActivateHomeIcon,
  ActivateMessageIcon,
  ActivateExploreIcon,
  ActiveAdd,
  ActivateProfileIcon,
} from "../assets/Icons";
import Logo from "./Logo";

const menuLists = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
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
    title: "Bookings",
    path: "/bookings",
    icon: <ExploreIcon />,
    activeIcon: <ActivateExploreIcon />,
  },
  {
    title: "Profile",
    path: `/profile`,
    icon: <ProfileIcon />,
    activeIcon: <ActivateProfileIcon />,
  },
];

function Header() {
  return (
    <>
      <h2 className="text-xl text-white font-bold tracking-widest hidden md:block">
        <Logo />
      </h2>
      {menuLists.map((item, index) => (
        <>
          <NavLink to={item.path}>
            {({ isActive }) => (
              <span
                className={`itemMenu flex gap-2  ${
                  !isActive ? "text-white" : "text-[#c3073f]"
                }  uppercase tracking-widest w-[100%] cursor-pointer hover:text-[#c3073f]`}
              >
                {isActive ? item.activeIcon : item.icon}
                <span className="md:block hidden">{item.title}</span>
              </span>
            )}
          </NavLink>
        </>
      ))}

      <h2 className="text-sm text-white font-thin tracking-widest hidden md:block">
        user
      </h2>
    </>
  );
}

export default Header;
