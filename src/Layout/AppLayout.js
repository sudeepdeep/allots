import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Logo from "../components/Logo";
import { updatePosition, addUser } from "../utils/slice";
import { store } from "../utils/store";
import { MoveTop } from "../components/MoveTop";
import Cookies from "js-cookie";
import { AnimationLoading } from "../components/Loading";
import loadingAnimation from "../assets/articles.json";
import axios from "../utils/axios";

function AppLayout() {
  const scrollPosition = useSelector((store) => store.ui.scrollPosition);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Cookies.get("token") && Cookies.get("userId")) {
      setLoading(true);

      axios
        .get(`/user/${Cookies.get("userId")}/my-profile`)
        .then((res) => {
          setLoading(false);
          dispatch(addUser(res.data.user));
        })
        .catch((err) => {
          setLoading(false);
          navigate("/logout");
        });
    }

    const handleScroll = () => {
      dispatch(updatePosition(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading)
    return (
      <div className="h-[100vh] bg-black flex justify-center items-center">
        <AnimationLoading animation={loadingAnimation} />;
      </div>
    );
  return (
    <Provider store={store}>
      <div className="min-h-[100vh] h-auto bg-[#0D1117]">
        <div className="logo h-[60px] md:hidden flex justify-center items-center">
          <Logo />
        </div>
        <div
          className={`${
            scrollPosition > 60 ? "backdrop-blur-lg" : "bg-[#010409]"
          }  shadow-lg ${
            scrollPosition > 60 ? "h-[60px]" : "h-[80px]"
          } fixed md:top-0 bottom-0 md: z-10 w-full gap-3 flex justify-between px-3 md:px-10 items-center`}
        >
          <Header scrollPosition={scrollPosition} />
        </div>
        <>
          <div className="h-full w-full p-[20px] md:pt-[100px] md:pb-[10px] pb-[100px] text-white">
            <Outlet />
          </div>
          {scrollPosition > 60 && (
            <div
              className="h-[200px] bottom-[-80px] fixed right-9 z-40 cursor-pointer"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <MoveTop />
            </div>
          )}
        </>
      </div>
    </Provider>
  );
}

export default AppLayout;
