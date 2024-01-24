import React from "react";

function LabelComponent({ children, label = false }) {
  return (
    <div className="my-2">
      <label
        htmlFor="about"
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default LabelComponent;
