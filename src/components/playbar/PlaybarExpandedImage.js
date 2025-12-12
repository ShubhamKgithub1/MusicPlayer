import React from "react";

function PlaybarExpandedImage({ src, alt, isExpand }) {
  return (
    <div className="absolute inset-0 overflow-hidden md:rounded-lg">
      <img
        src={src}
        alt={alt}
        className={`w-full h-full blur-md object-cover transition-opacity duration-300 ${
          isExpand ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default React.memo(PlaybarExpandedImage);
