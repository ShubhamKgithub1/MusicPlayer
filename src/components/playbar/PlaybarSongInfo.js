import React from "react";

function PlaybarSongInfo({ title, artist }) {
  return (
    <div className="w-[80%] flex flex-col text-center gap-1 md:gap-2">
      <p className="text-3xl md:text-2xl font-bold truncate text-white drop-shadow">
        {title}
      </p>
      <p className="text-xs font-semibold text-gray-300 tracking-wide truncate">
        {artist?.toUpperCase()}
      </p>
    </div>
  );
};

export default React.memo(PlaybarSongInfo);
