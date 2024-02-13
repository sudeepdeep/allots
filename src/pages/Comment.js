import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../components/TextField";
import { useQuery, useQueryClient } from "react-query";
import axios, { axiosErrorToast } from "../utils/axios";
import { AnimationLoading } from "../components/Loading";
import articleLoading from "../assets/loading.json";
import { SendIcon } from "../assets/Icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Comment() {
  const navigate = useNavigate();
  const store = useSelector((store) => store.loggedInUser.userData);
  const { articleId } = useParams();
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentData, setCommentData] = useState({
    username: store.username,
    commentText: "",
  });

  useEffect(() => {
    setCommentData({
      ...commentData,
      username: store.username,
    });
  }, [store.username]);

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery("get-article", () =>
    axios
      .get(`/article/${articleId}`)
      .then((res) => res.data)
      .catch((err) => axiosErrorToast(err))
  );
  function handleChange(e) {
    setCommentData({
      ...commentData,
      commentText: e,
    });
  }

  function handlePostComment() {
    setCommentLoading(true);
    axios
      .post(`/article/post-comment/${articleId}`, { ...commentData })
      .then((res) => {
        toast.success("Commented successfully");
        setCommentData({
          ...commentData,
          commentText: "",
        });
        queryClient.invalidateQueries("get-article");
        setCommentLoading(false);
      })
      .catch((err) => {
        setCommentLoading(false);
        axiosErrorToast(err);
      });
  }

  if (isLoading) return <AnimationLoading animation={articleLoading} />;
  return (
    <div className="comment relative md:max-w-md mx-auto w-full min-h-[75vh] ">
      <span className="cursor-pointer" onClick={() => navigate(-1)}>
        {"< Back"}
      </span>
      <br />
      <br />
      <div className="h-[60vh] overflow-y-auto">
        {data?.comments.map((comment, index) => (
          <div
            className="comment my-2 h-auto min-h-[40px] bg-black w-full flex flex-col items-start p-2 justify-center"
            key={index}
          >
            <div
              className="text-[#c3073f] text-sm cursor-pointer"
              onClick={() => navigate(`/user-profile/${comment.username}`)}
            >
              {comment.username}
            </div>
            {comment.commentText}
          </div>
        ))}
      </div>
      <div className="absolute w-full h-[60px] bottom-0">
        <div className="w-full flex items-center justify-center gap-2">
          <div className="w-[80%]">
            <TextField
              onChange={handleChange}
              placeholder="Comment Something"
              value={commentData.commentText}
            />
          </div>
          <div
            className={`${
              commentLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handlePostComment}
          >
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
