import React from "react";
import { ViewProfile } from "./Profile";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios, { axiosErrorToast } from "../utils/axios";
import { AnimationLoading } from "../components/Loading";
import loadingAnimation from "../assets/articles.json";
import ArticleFeed from "../components/ArticleFeed";

function UserProfile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("user-data", () =>
    axios
      .get(`/user/${username}/user-profile`)
      .then((res) => res.data)
      .catch((err) => axiosErrorToast(err))
  );
  const { data: articleData, isLoading: articleLoading } = useQuery(
    "article-data",
    () =>
      axios
        .get(`/article/articles/${username}`)
        .then((res) => res.data)
        .catch((err) => axiosErrorToast(err))
  );
  if (isLoading && articleLoading)
    return (
      <div className="h-[100vh] bg-black flex justify-center items-center">
        <AnimationLoading animation={loadingAnimation} />;
      </div>
    );
  return (
    <div className="max-w-md mx-auto">
      <span className="cursor-pointer" onClick={() => navigate(-1)}>
        {"< Back"}
      </span>
      <br />
      <br />
      <ViewProfile user={data} />
      <div className="mt-2">
        <ArticleFeed items={articleData} />
      </div>
    </div>
  );
}

export default UserProfile;
