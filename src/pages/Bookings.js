import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import articleLoading from "../assets/loading.json";
import ArticleFeed from "../components/ArticleFeed";
import { AnimationLoading } from "../components/Loading";
import axios, { axiosErrorToast } from "../utils/axios";
import { useLocation } from "../utils/useLocation";
import Select from "../components/Select";
import { sectionOptions } from "./Home";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { QuestionIcon } from "../assets/Icons";

const Bookings = () => {
  const locs = useLocation();
  const queryClient = useQueryClient();

  const [section, setSection] = useState("home");
  const [data, setData] = useState(null);

  const { data: articleData, isLoading } = useQuery(
    ["articles", locs],
    () =>
      axios
        .get("/article", {
          params: { lat: locs.latitude, lng: locs.longitude },
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setData(data);
      },
    }
  );

  function handleSectionChange(e) {
    if (e === "home") {
      setData(articleData);
    } else {
      const filteredData = articleData.filter((item) => item.section === e);
      setData(filteredData);
    }
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
        <AnimationLoading animation={articleLoading} />
      </>
    );

  function handleDelete(articleId) {
    axios
      .post(`/article/delete-article/${articleId}/${Cookies.get("userId")}`)
      .then((res) => {
        queryClient.invalidateQueries("articles");
        toast.success("Article deleted successfully.");
      })
      .catch((err) => axiosErrorToast(err));
  }
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-center font-bold my-5">
        Local News By <br />{" "}
        <span className="flex justify-center gap-2">
          SNAPNEWS{" "}
          <div
            className="cursor-pointer"
            title="Shows Local news around 50KM from your current location"
          >
            <QuestionIcon />
          </div>
        </span>
      </h2>

      <Select
        onChange={handleSectionChange}
        options={sectionOptions}
        title={"Section"}
        value={section}
      />
      <div className="mt-2">
        <ArticleFeed items={data} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Bookings;
