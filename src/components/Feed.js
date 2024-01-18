import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { MoveTop } from "./MoveTop";

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

  function handleSectionChange(val) {
    setSection(val);
  }

  return (
    <>
      <div className="timeline max-w-xl">
        <>
          <h2 className="text-center font-bold my-5">Latest News</h2>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-white"
            >
              Section
            </label>
            <div className="my-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block rounded-md w-full border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                onChange={(e) => handleSectionChange(e.target.value)}
              >
                <option _ngcontent-qii-c267="" value=""></option>
                <option
                  _ngcontent-qii-c267=""
                  value="arts"
                  class="ng-star-inserted"
                >
                  {" "}
                  arts{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="automobiles"
                  class="ng-star-inserted"
                >
                  {" "}
                  automobiles{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="books/review"
                  class="ng-star-inserted"
                >
                  {" "}
                  books/review{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="business"
                  class="ng-star-inserted"
                >
                  {" "}
                  business{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="fashion"
                  class="ng-star-inserted"
                >
                  {" "}
                  fashion{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="food"
                  class="ng-star-inserted"
                >
                  {" "}
                  food{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="health"
                  class="ng-star-inserted"
                >
                  {" "}
                  health{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="home"
                  class="ng-star-inserted"
                >
                  {" "}
                  home{" "}
                  <span _ngcontent-qii-c267="" class="ng-star-inserted">
                    {" "}
                    (default){" "}
                  </span>
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="insider"
                  class="ng-star-inserted"
                >
                  {" "}
                  insider{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="magazine"
                  class="ng-star-inserted"
                >
                  {" "}
                  magazine{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="movies"
                  class="ng-star-inserted"
                >
                  {" "}
                  movies{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="nyregion"
                  class="ng-star-inserted"
                >
                  {" "}
                  nyregion{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="obituaries"
                  class="ng-star-inserted"
                >
                  {" "}
                  obituaries{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="opinion"
                  class="ng-star-inserted"
                >
                  {" "}
                  opinion{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="politics"
                  class="ng-star-inserted"
                >
                  {" "}
                  politics{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="realestate"
                  class="ng-star-inserted"
                >
                  {" "}
                  realestate{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="science"
                  class="ng-star-inserted"
                >
                  {" "}
                  science{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="sports"
                  class="ng-star-inserted"
                >
                  {" "}
                  sports{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="sundayreview"
                  class="ng-star-inserted"
                >
                  {" "}
                  sundayreview{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="technology"
                  class="ng-star-inserted"
                >
                  {" "}
                  technology{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="theater"
                  class="ng-star-inserted"
                >
                  {" "}
                  theater{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="t-magazine"
                  class="ng-star-inserted"
                >
                  {" "}
                  t-magazine{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="travel"
                  class="ng-star-inserted"
                >
                  {" "}
                  travel{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="upshot"
                  class="ng-star-inserted"
                >
                  {" "}
                  upshot{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="us"
                  class="ng-star-inserted"
                >
                  {" "}
                  us{" "}
                </option>
                <option
                  _ngcontent-qii-c267=""
                  value="world"
                  class="ng-star-inserted"
                >
                  {" "}
                  world{" "}
                </option>
              </select>
            </div>
          </div>
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
