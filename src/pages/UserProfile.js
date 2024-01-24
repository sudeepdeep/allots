import React from "react";
import { ViewProfile } from "./Profile";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios, { axiosErrorToast } from "../utils/axios";
import { AnimationLoading } from "../components/Loading";
import articleLoading from "../assets/articles.json";
import ArticleFeed from "../components/ArticleFeed";

function UserProfile() {
  const { username } = useParams();
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
  if (isLoading && articleLoading) return <h1>Loading...</h1>;
  return (
    <div className="flex flex-col gap-2">
      <ViewProfile user={data} />
      <ArticleFeed items={articleData} />
    </div>
  );
}

export default UserProfile;
