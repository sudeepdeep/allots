import React from "react";

function ImageContainer({ url = false, handleDelete = false }) {
  return (
    <>
      <div className="relative">
        <img src={url} alt="uploadedimage" />
        <img
          src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
          className="absolute h-[20px] top-1 right-1 hover:cursor-pointer"
          alt="delete"
          onClick={handleDelete}
        />
      </div>
    </>
  );
}

export default ImageContainer;
