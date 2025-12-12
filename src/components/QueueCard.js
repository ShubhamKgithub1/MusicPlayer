import { useSelector } from "react-redux";
import React from "react";

const QueueCard = ({ track, onSelect }) => {
  const queue = useSelector((state) => state.player.queue);


  if (!queue) return null;
  return (
    <div
      className="relative group flex items-center rounded-lg gap-3 p-2 cursor-pointer"
      onClick={() => onSelect(track?.id)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
      <img
        src={track?.album?.cover_small}
        alt={track?.title}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex flex-col truncate relative z-20">
        <span className="text-sm font-bold dark:text-white truncate">
          {track?.title_short}
        </span>
        <span className="text-xs font-semibold dark:text-gray-300 truncate">
          {track?.artist?.name}
        </span>
      </div>
    </div>
  );
};

export default React.memo(QueueCard);
