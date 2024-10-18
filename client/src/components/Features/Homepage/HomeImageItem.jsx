import React from "react";

export default function HomeImageItem({
  imageClassName,
  image,
  text,
  textClassName,
  className,
}) {
  return (
    <div className={`w-full home-image-item relative ${className}`}>
      <img
        src={image}
        className={`object-center w-full object-cover ${imageClassName}`}
        alt=""
      />
      <p
        className={`font-extrabold text-white absolute bottom-3 left-3 ${textClassName}`}
      >
        {text}
      </p>
      <div className="overlay"></div>
    </div>
  );
}
