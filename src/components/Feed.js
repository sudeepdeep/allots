import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { MoveTop } from "./MoveTop";
import Section from "./Section";

function Feed() {
  const [section, setSection] = useState("home");
  const [items, setItems] = useState([]);

  const { data, isLoading } = useQuery(
    ["feed-posts", section],
    () =>
      axios
        .get(`https://api.nytimes.com/svc/topstories/v2/${section}.json`, {
          params: {
            " api-key": "4m5dIKdKligJC4f83BagjYxYshyp5Aob",
          },
        })
        .then((res) => res.data)
        .catch((err) => toast.error(err)),
    {
      onSuccess(data) {
        if (data.results.length > 0) {
          setItems(data.results);
        }
      },
      onError(err) {
        toast.error("some thing went wrong");
      },
    }
  );

  function handleSectionChange(e) {
    setSection(e);
  }
  return (
    <>
      <div className="timeline max-w-xl">
        <>
          <h2 className="text-center font-bold my-5">Latest News</h2>
          <Section onChange={handleSectionChange} />
          {isLoading && <Loading />}
          {items?.map((post, feedIndex) => (
            <div>
              <div className="postCard bg-[#010409] w-full h-auto  p-6 mb-2  rounded-md">
                <div className="postTitle flex gap-1 items-center">
                  <div className="displayPic w-[100px] h-[40px] cursor-pointer rounded-md border-[#0D1117] border-2 overflow-hidden">
                    <img
                      src={post?.multimedia?.[0]?.url}
                      alt="profilePic"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="userName font-semibold ml-2 text-white cursor-pointer">
                    {post?.title}
                    {" - "}
                    <span className="font-light">{post?.byline}</span>
                  </div>
                </div>
                <div className="postImages grid gap-4">
                  <div className="postText mt-2 text-white">
                    {post.abstract}
                  </div>

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
                      onClick={() =>
                        window.open(post?.multimedia?.[0]?.url, "_blank")
                      }
                    >
                      <img
                        src={post?.multimedia?.[0]?.url}
                        alt="coverImage"
                        className="h-full  w-full object-cover"
                      />
                    </div>
                  </>
                </div>
                <div className="postFooter flex gap-2 mt-7 items-center justify-between">
                  <div className="postText mt-2 text-white">
                    Published- {post["published_date"]}
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

export default Feed;
