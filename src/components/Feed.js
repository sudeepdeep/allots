import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { dateConverter } from "../utils/utils";
import Loading from "./Loading";

function Feed({ section, country }) {
  const [items, setItems] = useState([]);

  const { data, isLoading } = useQuery(
    ["feed-posts", section, country],
    () =>
      axios
        .get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            apiKey: "09504373a27942468430b566668ece2f",
            country: country,
            category: section,
            pageSize: 100,
          },
        })
        .then((res) => res.data)
        .catch((err) => toast.error(err)),
    {
      onSuccess(data) {
        if (data.articles.length > 0) {
          setItems(data.articles);
        }
      },
      onError(err) {
        toast.error("some thing went wrong");
      },
    }
  );

  return (
    <>
      {isLoading && <Loading />}
      {items?.map((post, feedIndex) => (
        <div>
          <div className="postCard bg-[#010409] w-full h-auto  p-6 mb-2  rounded-md">
            <div className="postTitle flex gap-1 items-center">
              <div className="displayPic w-[100px] h-[40px] cursor-pointer rounded-md border-[#0D1117] border-2 overflow-hidden">
                <img
                  src={post?.urlToImage}
                  alt="profilePic"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="userName font-semibold ml-2 text-white cursor-pointer">
                {post?.title}
                {" - "}
                <span className="font-light">
                  By - {post?.author ?? post?.source?.name}
                </span>
              </div>
            </div>
            <div className="postImages grid gap-4">
              <div className="postText mt-2 text-white">{post?.content}</div>

              <div className="postText mt-2 text-white">
                Full Article -{" "}
                <a
                  href={post.url}
                  className="text-[#c3073f]"
                  target="_blank"
                  rel="noreferrer"
                >
                  click here
                </a>
              </div>
              <>
                <div
                  className="coverImage py-2 md:h-[400px] h-[200px] overflow-hidden max-w-full rounded-lg cursor-pointer"
                  onClick={() => window.open(post?.urlToImage, "_blank")}
                >
                  <img
                    src={post?.urlToImage}
                    alt="coverImage"
                    className="h-full  w-full object-cover"
                  />
                </div>
              </>
            </div>
            <div className="postFooter flex gap-2 mt-7 items-center justify-between">
              <div className="postText mt-2 text-white">
                Published- {dateConverter(post?.publishedAt)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Feed;
