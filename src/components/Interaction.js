import React, { useState } from "react";
import { NewLikeIcon, CommentIcon, ShareIcon } from "../assets/Icons";
import likeAnimation from "../assets/likeanimation.json";
import { AnimationLoading } from "./Loading";
import axios, { axiosErrorToast } from "../utils/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

function Interaction({
  articleId = false,
  likedPost = false,
  commentsCount = 0,
  likesCount = 0,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [updateLike, setUpdateLike] = useState(likedPost);
  function handleLike() {
    setUpdateLike(true);
    axios
      .post(`/article/like-article/${articleId}/${Cookies.get("userId")}`)
      .then((res) => {
        queryClient.invalidateQueries("articles");
      })
      .catch((err) => axiosErrorToast(err));
  }

  function handleDislike() {
    setUpdateLike(false);
    axios
      .post(`/article/dislike-article/${articleId}/${Cookies.get("userId")}`)
      .then((res) => {
        queryClient.invalidateQueries("articles");
      })
      .catch((err) => axiosErrorToast(err));
  }

  async function handleCopyLink() {
    const text = `${window.location.origin}/public-article/${articleId}`;
    await navigator.clipboard.writeText(text);
    toast.success("article link to clipboard");
  }

  return (
    <>
      <div className=" flex items-center justify-around w-full h-[60px] mt-3">
        {updateLike ? (
          <div
            onClick={handleDislike}
            className="cursor-pointer flex items-center"
          >
            <AnimationLoading
              animation={likeAnimation}
              autoplay={true}
              loop={false}
              styles="w-[34px] h-[34px]"
            />
            <span className="text-slate-500">
              {likesCount > 0 && <>{likesCount}</>}
            </span>
          </div>
        ) : (
          <div className="cursor-pointer flex gap-2" onClick={handleLike}>
            <NewLikeIcon />
            <span className="text-slate-500">
              {likesCount > 0 && <>{likesCount}</>}
            </span>
          </div>
        )}
        <div
          className="cursor-pointer flex gap-2"
          onClick={() => navigate(`/comments/${articleId}`)}
        >
          <CommentIcon />{" "}
          <span className="text-slate-500">
            {commentsCount > 0 && <>{commentsCount}</>}
          </span>
        </div>
        <div className="cursor-pointer" onClick={handleCopyLink}>
          <ShareIcon />
        </div>
      </div>
    </>
  );
}

export default Interaction;
