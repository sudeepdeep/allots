import React, { useEffect, useState } from "react";
import { UploadPhoto } from "../components/UploadPhoto";
import Lottie from "lottie-react";
import uploadLoad from "../assets/uploadLoading.json";
import { ComboButton } from "../components/ComboButton";
import Success from "../components/Success";

function UploadPost() {
  const [uploadUi, setUploadUi] = useState(true);
  useEffect(() => {
    const uploadLoading = setTimeout(() => {
      setUploadUi(false);
    }, 3020);

    return () => clearTimeout(uploadLoading);
  }, []);

  const [success, setSuccess] = useState(false);
  function handleUploadFunction() {
    setSuccess(true);
  }

  if (success) return <Success />;

  if (uploadUi)
    return (
      <div className="w-full h-[70vh] flex items-center">
        <Lottie
          animationData={uploadLoad}
          className=" w-[200px] mx-auto my-auto md:w-[630px]"
          loop={true}
          autoplay={true}
        ></Lottie>
      </div>
    );
  return (
    <div className="max-w-xl mx-auto font-bold text-2xl">
      <h3>Add Post</h3>
      <div className="my-2">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-white"
        >
          what's on your mind?
        </label>
        <div className="mt-2">
          <textarea
            id="about"
            name="about"
            rows={3}
            className="block font-normal w-full bg-transparent rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Share your thoughts and experiences with us.
        </p>
      </div>
      <UploadPhoto title={"Upload Photo"} />

      <ComboButton title={"Post"} onClick={handleUploadFunction} />
    </div>
  );
}

export default UploadPost;
