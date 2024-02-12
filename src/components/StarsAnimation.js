import React from "react";
import "./Styles.css";
const StarAnimation = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      {[...Array(50)].map((_, index) => (
        <div
          key={index}
          className="absolute z-42 w-1 h-1 bg-white rounded-full animate-star"
          style={{
            left: `${Math.random() * 100}%`, // Random horizontal position
            top: `${Math.random() * 100}%`, // Random vertical position
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default StarAnimation;
