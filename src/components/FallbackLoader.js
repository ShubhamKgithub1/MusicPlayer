import React from "react";

const FallbackLoader = () => {
  return (
   <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-[3px] border-white/20"></div>
        <div className="absolute inset-0 rounded-full border-t-[3px] border-white/80 animate-spin"></div>
      </div>
    </div>
  );
};

export default FallbackLoader;
