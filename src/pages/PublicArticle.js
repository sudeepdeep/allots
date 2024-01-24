import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import Lottie from "lottie-react";
import articleLoading from "../assets/articles.json";
import { dateConverter } from "../utils/utils";

function PublicArticle() {
  const { id } = useParams();

  const { data: post, isLoading } = useQuery(["article", id], () =>
    axios.get(`/article/${id}`).then((res) => res.data)
  );

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

  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="min-h-[100vh] h-auto w-full  p-2 bg-[#0D1117] flex flex-col justify-center">
      <div className="postCard bg-[#010409] w-full max-w-xl mx-auto h-auto  p-6 mb-2  rounded-md">
        <div className="postTitle flex gap-1 items-center">
          <div className="userName font-semibold text-white cursor-pointer">
            {post?.title}
            <span className="font-light flex items-center gap-2">
              by {post?.username}
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
          <div className="postText mt-2 text-white">{post.description}</div>

          <>
            <div
              className="coverImage py-2  overflow-hidden max-w-full rounded-lg cursor-pointer"
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
        <div className="postFooter flex gap-2 mt-7 items-center justify-between">
          <div className="postText mt-2 text-white">
            Published- {dateConverter(post?.createdAt)}
          </div>
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="max-w-xl mx-auto text-white bg-[#c3073f] p-2 rounded-md mt-2"
      >
        Print Page
      </button>
    </div>
  );
}

export default PublicArticle;
