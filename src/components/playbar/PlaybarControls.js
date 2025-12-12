import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
} from "lucide-react";
import React from "react";

function PlaybarControls({
  isPlaying,
  togglePlay,
  playNext,
  playPrev,
  isShuffle,
  toggleShuffle,
  toggleVolume,
  volumeIcon,
}) {
  return (
    <div className={`flex items-center justify-center gap-4 md:gap-2 py-6`}>
      <button
        onClick={toggleShuffle}
        className={`flex justify-center items-center hover:bg-white/15 h-10 w-10 md:h-8 md:w-8 transition-all duration-300 active:scale-[0.85]`}
      >
        {isShuffle ? <Shuffle size={20} /> : <Repeat size={20} />}
      </button>
      <button
        onClick={playPrev}
        className={`flex justify-center items-center bg-white/15 active:scale-[0.75] p-2 rounded-full transition-all duration-300`}
      >
        <SkipBack size={28} />
      </button>
      <button
        onClick={togglePlay}
        className={`flex items-center justify-center rounded-full p-4 md:p-3 bg-white text-black/80 active:scale-[0.80] transition-transform duration-300`}
      >
        {isPlaying ? <Pause size={30} /> : <Play size={30} />}
      </button>
      <button
        onClick={playNext}
        className={`flex justify-center items-center bg-white/15 active:scale-[0.75] p-2 rounded-full transition-all duration-300`}
      >
        <SkipForward size={28} />
      </button>
      <button
        className={`flex justify-center items-center hover:bg-white/15 h-10 w-10 md:h-8 md:w-8 active:scale-[0.85] cursor-pointer transition-all duration-300`}
        onClick={toggleVolume}
      >
        {volumeIcon}
      </button>
    </div>
  );
};

export default React.memo(PlaybarControls);

