import React from "react";
import { ViewProfile } from "./Profile";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axios, { axiosErrorToast } from "../utils/axios";
import { AnimationLoading } from "../components/Loading";
import loadingAnimation from "../assets/loading.json";
import ArticleFeed from "../components/ArticleFeed";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { MessageIcon } from "../assets/Icons";

function UserProfile({ handleBack = false }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("user-data", () =>
    axios
      .get(`/user/${!!username ? username : "snapnews"}/user-profile`)
      .then((res) => res.data)
      .catch((err) => axiosErrorToast(err))
  );
  const { data: articleData, isLoading: articleLoading } = useQuery(
    "article-data",
    () =>
      axios
        .get(`/article/articles/${!!username ? username : "snapnews"}`)
        .then((res) => res.data)
        .catch((err) => axiosErrorToast(err))
  );
  if (isLoading && articleLoading)
    return (
      <div className="h-[100vh] bg-black flex justify-center items-center">
        <AnimationLoading animation={loadingAnimation} />;
      </div>
    );

  function handleDelete(articleId) {
    axios
      .post(`/article/delete-article/${articleId}/${Cookies.get("userId")}`)
      .then((res) => {
        queryClient.invalidateQueries("article-data");
        toast.success("Article deleted successfully.");
      })
      .catch((err) => axiosErrorToast(err));
  }

  function handleCheckConnection(userId) {
    axios
      .get(`/user/${Cookies.get("userId")}/${userId}/check-message-id`)
      .then((res) => {
        navigate(`/messages/${res.data.messageId}`);
      });
  }

  return (
    <div className="max-w-md mx-auto">
      <span
        className="cursor-pointer"
        onClick={() => {
          handleBack ? handleBack() : navigate(-1);
        }}
      >
        {"< Back"}
      </span>
      <br />
      <br />
      <ViewProfile user={data} />
      <div
        onClick={() => handleCheckConnection(data._id)}
        className="hover:bg-[#C3073F] bg-[#c3073fd0] transition duration-300 ease-in-out cursor-pointer w-full h-[50px] rounded-md flex items-center justify-center my-3"
      >
        Message <MessageIcon />
      </div>
      <div className="mt-2">
        <ArticleFeed items={articleData} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default UserProfile;
