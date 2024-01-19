import React from "react";
import { dateConverter } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function ArticleFeed({ items }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="timeline max-w-xl">
        <>
          {items?.map((post, feedIndex) => (
            <div>
              <div className="postCard bg-[#010409] w-full h-auto  p-6 mb-2  rounded-md">
                <div className="postTitle flex gap-1 items-center">
                  <div className="displayPic w-[100px] h-[40px] cursor-pointer rounded-md border-[#0D1117] border-2 overflow-hidden">
                    <img
                      src={post?.coverUrl}
                      alt="profilePic"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="userName font-semibold ml-2 text-white cursor-pointer">
                    {post?.title}
                    {" - "}
                    <span className="font-light">by {post?.username}</span>
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
                <div className="postFooter flex gap-2 mt-7 items-center justify-between">
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
