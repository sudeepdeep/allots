import Lottie from "lottie-react";
import { useState } from "react";
import { useQuery } from "react-query";
import articleLoading from "../assets/articles.json";
import ArticleFeed from "../components/ArticleFeed";
import Section from "../components/Section";
import axios from "../utils/axios";
import { useLocation } from "../utils/useLocation";

const Bookings = () => {
  const locs = useLocation();

  const [section, setSection] = useState("home");

  const { data, isLoading } = useQuery(["articles", locs], () =>
    axios
      .get("/article", {
        params: { lat: locs.latitude, lng: locs.longitude },
      })
      .then((res) => res.data)
  );

  function handleSectionChange(e) {
    setSection(e);
  }

  if (!locs) {
    return (
      <>
        <span>
          Please allow location permission to show Articles in your area
        </span>
        <br />
        <button
          className="p-2 bg-[#c3073f] rounded-md my-2"
          onClick={() => window.location.reload()}
        >
          Allow
        </button>
      </>
    );
  }

  if (isLoading)
    return (
      <>
        <Lottie
          animationData={articleLoading}
          className=" w-[200px] mx-auto my-auto md:w-[630px]"
          loop={true}
          autoplay={true}
        ></Lottie>
      </>
    );
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-center font-bold my-5">Local News</h2>
      <ArticleFeed items={data} />
    </div>
  );
};

export default Bookings;
