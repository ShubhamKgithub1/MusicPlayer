import React from "react";

function PlaybarExpandedImage({ src, alt, isExpand }) {
  return (
    <div className={`absolute inset-0 overflow-hidden md:rounded-lg transition-opacity duration-200 ${
          isExpand ? "opacity-100" : "opacity-0"
        }`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover`}
      />
    </div>
  );
};

export default React.memo(PlaybarExpandedImage);
