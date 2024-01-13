import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActivateLikeIcon,
  CommentIcon,
  LikeIcon,
  ShareIcon,
} from "../assets/Icons";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "./Loading";
import axios from "axios";

function Feed({ isPublic = false, myPosts = false }) {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const { data, isLoading, refetch } = useQuery(
    ["feed-posts"],
    () =>
      axios
        .get(`https://api.nytimes.com/svc/mostpopular/v2/shared/30.json`, {
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
          setPage((prevPage) => prevPage + 1);
        } else {
          handleGetSuggestions();
        }
      },
      onError(err) {
        toast.error("some thing went wrong");
      },
    }
  );

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    refetch();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  function handleProfileClick(id) {}

  function handleCommentClick(id) {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      navigate("comments");
    } else {
    }
  }

  async function handleLike(postId) {
    // await axios
    //   .post(`post/${postId}/like-post`, { id: Cookies.get("userId") })
    //   .then((res) => {
    //     queryClient.invalidateQueries("feed-posts");
    //   })
    //   .catch((err) => toast.error(err));
  }

  async function handleDisLike(postId) {
    // await axios
    //   .post(`post/${postId}/delete-like`, { id: Cookies.get("userId") })
    //   .then((res) => {
    //     queryClient.invalidateQueries("feed-posts");
    //   })
    //   .catch((err) => toast.error(err));
  }

  function handlePostDelete(postId) {
    // axios
    //   .post(`post/${postId}/delete-post`)
    //   .then((res) => {
    //     toast.success("post deleted successfully");
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
  }

  if (isLoading) return <Loading />;

  function handleFollow(userId, friendId) {
    // axios
    //   .put(`user/${userId}`, { following: [friendId] })
    //   .then((res) => {
    //     queryClient.invalidateQueries("feed-posts");
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
  }

  function handleUnfollow(userId, friendId) {
    // axios
    //   .put(`user/${userId}/${friendId}/un-follow`)
    //   .then((res) => {
    //     queryClient.invalidateQueries("feed-posts");
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
  }

  function handleGetSuggestions() {
    // axios
    //   .get(`/user/${Cookies.get("userId")}`)
    //   .then((res) => setSuggestions(res.data))
    //   .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="timeline  max-w-xl mx-auto my-10">
        <>
          {items?.map((post, feedIndex) => (
            <>
              <div className="postCard bg-[#010409] w-full  h-auto  p-6 mb-2  rounded-md">
                <div className="postTitle flex gap-1 items-center">
                  <div className="displayPic w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img
                      src={
                        post?.media.length > 0 &&
                        post?.media[0]["media-metadata"][0].url
                      }
                      alt="profilePic"
                      className="h-full  w-full object-cover  rounded-full"
                      // onClick={() => handleProfileClick(post?.user?._id)}
                    />
                  </div>
                  <div
                    className="userName font-semibold ml-2 text-white cursor-pointer"
                    // onClick={() => handleProfileClick(post?.user?._id)}
                  >
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
                  {post?.media.length > 0 && (
                    <>
                      <div
                        className="coverImage py-2 md:h-[400px] h-[200px] overflow-hidden max-w-full rounded-lg cursor-pointer"
                        onClick={() =>
                          window.open(
                            post?.media[0]["media-metadata"][2].url,
                            "_blank"
                          )
                        }
                      >
                        <img
                          src={post?.media[0]["media-metadata"][2].url}
                          alt="coverImage"
                          className="h-full  w-full object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="postFooter flex gap-2 mt-7 items-center justify-between">
                  <div className="postText mt-2 text-white">
                    Published- {post["published_date"]}
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      </div>
    </>
  );
}

export default Feed;
