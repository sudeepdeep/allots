import { PhotoIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import { useState } from "react";
import articleLoading from "../assets/loading.json";
import axios, { axiosErrorToast } from "../utils/axios";
import { AnimationLoading } from "./Loading";

export const UploadPhoto = ({ title = false, handleChange = false }) => {
  const [cover, setCover] = useState([]);
  const [loading, setLoading] = useState(false);
  async function handleFileUpload(e) {
    setLoading(true);
    const selectedFiles = e.target.files;
    const formData = new FormData();
    formData.append("file", selectedFiles[0]);
    await axios
      .post(`/user/${Cookies.get("userId")}/upload-profile`, formData)
      .then((res) => {
        setLoading(false);
        handleChange(res.data.fileUrl);
        setCover((prevArray) => [...prevArray, res.data.fileUrl]);
      })
      .catch((err) => {
        setLoading(false);
        axiosErrorToast(err);
      });
  }
  if (loading) return <AnimationLoading animation={articleLoading} />;

  return (
    <div>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-white"
      >
        {title ? title : "Cover photo"}
      </label>
      {cover.length > 0 ? (
        <div className="relative">
          <img src={cover[0]} alt="uploadedimage" />
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
            className="absolute h-[20px] top-1 right-1 hover:cursor-pointer"
            alt="delete"
            onClick={() => setCover([])}
          />
        </div>
      ) : (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md  font-semibold text-[#c3073f] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#c3073f] focus-within:ring-offset-2 hover:text-[#c3073f]/70"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFileUpload(e)}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
