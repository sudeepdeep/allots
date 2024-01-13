import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { store } from "../utils/store";

function AppLayout() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Provider store={store}>
      <div className="min-h-[100vh] h-auto bg-[#0D1117]">
        <div
          className={`${
            scrollPosition > 60 ? "backdrop-blur-lg" : "bg-[#010409]"
          }  shadow-lg ${
            scrollPosition > 60 ? "h-[60px]" : "h-[80px]"
          } fixed md:top-0 bottom-0 md: z-10 w-full gap-3 flex justify-between px-3 md:px-10 items-center`}
        >
          <h2 className="text-xl text-white font-bold tracking-widest hidden md:block">
            ALLOT
          </h2>
          <Header />
          <h2 className="text-sm text-white font-thin tracking-widest hidden md:block">
            dummy
          </h2>
        </div>
        <div className="h-full w-full p-[20px] md:pt-[100px] md:pb-[10px] pb-[100px] text-white">
          <Outlet />
        </div>
      </div>
    </Provider>
  );
}

export default AppLayout;
