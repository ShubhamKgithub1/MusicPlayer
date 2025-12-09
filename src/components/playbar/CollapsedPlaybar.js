import { Pause, Play } from "lucide-react";

const CollapsedPlaybar = ({
  src,
  title,
  artist,
  isExpand,
  onExpand,
  togglePlay,
  isPlaying,
}) => {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 h-[65px] flex items-center gap-1.5 cursor-pointer p-2 bg-purple-100 dark:bg-slate-950 transition-[opacity] duration-300 
   ${
     isExpand
       ? "opacity-0 pointer-events-none"
       : "opacity-100 pointer-events-auto"
   }
    `}
      onClick={onExpand}
    >
      <div className={`flex gap-1.5 items-center flex-1 overflow-hidden`}>
        <img
          src={src}
          alt=""
          className={`w-12 h-12 rounded-full`}
        />
        <div className={`flex flex-col truncate`}>
          <p className={`text-base font-bold truncate dark:text-white`}>
            {title}
          </p>
          <p
            className={`text-xs font-semibold dark:text-gray-400 text-black/60 truncate`}
          >
            {artist}
          </p>
        </div>
      </div>
      <button
        onClick={togglePlay}
        className={`rounded-full shadow-md ml-auto w-12 h-12 bg-white flex items-center justify-center active:scale-90 transition-transform duration-300`}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  );
};

export default CollapsedPlaybar;
