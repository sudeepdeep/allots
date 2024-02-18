import React, { useState } from "react";
import { dateConverter } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Interaction from "./Interaction";
import Cookies from "js-cookie";
import axios, { axiosErrorToast } from "../utils/axios";
import { useQueryClient } from "react-query";
import { DeleteIcon, MessageIcon } from "../assets/Icons";
import { useSelector } from "react-redux";
import AlertDialog from "./AlertDialog";
import { toast } from "react-toastify";

function ArticleFeed({ items, handleDelete = false }) {
  const [showDialog, setShowDialog] = useState(false);
  const [articleId, setArticleId] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((store) => store.loggedInUser.userData);

  function handleDeletePost() {
    axios
      .post(`/article/delete-article/${articleId}/${Cookies.get("userId")}`)
      .then((res) => {
        queryClient.invalidateQueries("articles");
        toast.success("Article deleted successfully.");
      })
      .catch((err) => axiosErrorToast(err));
  }

  function handleDeleteArticle() {
    setShowDialog(true);
  }
  if (showDialog)
    return (
      <AlertDialog
        title="Are you sure you want to delete?"
        handleSubmit={() => handleDelete(articleId)}
        setDilog={setShowDialog}
      />
    );

  return (
    <>
      <div className="timeline max-w-xl">
        <>
          {items?.map((post, feedIndex) => (
            <div>
              <div className="postCard bg-[#010409] relative w-full h-auto  p-6 mb-3  rounded-md">
                {user.username === post.username && (
                  <p
                    className="cursor-pointer absolute w-[40px] h-[40px] top-0 hover:bg-[#C3073F] right-0 rounded-bl-xl flex justify-center items-center transition duration-300 ease-in-out"
                    onClick={() => {
                      setArticleId(post._id);
                      handleDeleteArticle();
                    }}
                  >
                    <DeleteIcon />
                  </p>
                )}

                <div className="postTitle flex gap-1 items-center p-2">
                  <div className="displayPic w-[100px] h-[40px] cursor-pointer rounded-md border-[#0D1117] border-2 overflow-hidden">
                    <img
                      src={post?.coverUrl}
                      alt="profilePic"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="userName font-semibold ml-2 text-white cursor-pointer">
                    {post?.title}
                    <span className="font-light flex items-center gap-2">
                      by{" "}
                      <span
                        className={`text-[#c3073f] ${
                          post.username === "anonymous"
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                        onClick={() => {
                          post.username !== "anonymous" &&
                            navigate(`/user-profile/${post.username}`);
                        }}
                      >
                        {post?.username}
                      </span>
                      {post.userType !== "anonymous" && (
                        <>
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/32/Verified-badge.png"
                            className="w-[14px] h-[14px]"
                            alt="verify"
                          />
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <div className="postImages grid gap-4">
                  <div className="postText mt-2 text-white">
                    {post.abstract}
                  </div>

                  <div className="postText mt-2 text-white">
                    Full Article -{" "}
                    <button
                      onClick={() => navigate(`/public-article/${post._id}`)}
                      className="text-[#c3073f]"
                      target="_blank"
                    >
                      click here
                    </button>
                  </div>
                  <>
                    <div
                      className="coverImage py-2 md:h-[400px] h-[200px] overflow-hidden max-w-full rounded-lg cursor-pointer"
                      onClick={() => window.open(post?.coverUrl, "_blank")}
                    >
                      <img
                        src={post?.coverUrl}
                        alt="coverImage"
                        className="h-full  w-full object-cover"
                      />
                    </div>
                  </>
                </div>
                {Cookies.get("userId") && (
                  <Interaction
                    articleId={post._id}
                    likedPost={post.likedBy.includes(Cookies.get("userId"))}
                    commentsCount={post.comments.length}
                    likesCount={post.likedBy.length}
                  />
                )}

                <div className="postFooter flex gap-2 items-center justify-between">
                  <div className="postText mt-2 text-white">
                    Published- {dateConverter(post?.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </>
  );
}

export default ArticleFeed;
