import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { store } from "../utils/store";

function AppLayout() {
  return (
    <Provider store={store}>
      <div className="flex flex-col-reverse justify-between md:justify-normal md:flex-col h-screen bg-[#0D1117]">
        <div className="bg-[#010409] h-[200px] md:h-[60px] w-full gap-3 flex justify-between px-3 md:px-10 items-center">
          <h2 className="text-xl text-white font-bold tracking-widest hidden md:block">
            ALLOT
          </h2>
          <Header />
          <h2 className="text-sm text-white font-thin tracking-widest hidden md:block">
            dummy
          </h2>
        </div>
        <div className="h-90 md:h-[90vh] w-full mx-auto p-[20px] overflow-auto text-white">
          <Outlet />
        </div>
      </div>
    </Provider>
  );
}

export default AppLayout;
