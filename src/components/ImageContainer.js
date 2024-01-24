import React from "react";
import LabelComponent from "./LabelComponent";

function ImageContainer({ url = false, handleDelete = false, title = false }) {
  return (
    <>
      <LabelComponent label={title}>
        <div className="relative">
          <img src={url} alt="uploadedimage" />
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
            className="absolute h-[20px] top-1 right-1 hover:cursor-pointer"
            alt="delete"
            onClick={handleDelete}
          />
        </div>
      </LabelComponent>
    </>
  );
}

export default ImageContainer;
