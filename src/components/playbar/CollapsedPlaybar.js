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
      className={`fixed bottom-0 md:bottom-2 lg:bottom-4 md:left-2 lg:left-4 z-50 w-full md:w-[40dvw] lg:w-[30dvw] xl:w-[18dvw] h-[60px] flex items-center gap-1.5 cursor-pointer p-2 bg-slate-300 dark:bg-slate-950 transition-[transform,opacity] duration-300 
   ${
     isExpand
       ? "opacity-0 translate-y-full pointer-events-none"
       : "opacity-100 translate-y-0 pointer-events-auto"
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
