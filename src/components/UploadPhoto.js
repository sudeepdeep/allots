import { PhotoIcon } from "@heroicons/react/24/solid";

export const UploadPhoto = ({ title = false }) => {
  return (
    <>
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-white"
      >
        {title ? title : "Cover photo"}
      </label>
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
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </>
  );
};
