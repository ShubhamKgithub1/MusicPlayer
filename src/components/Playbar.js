import { useRef, useEffect, useState } from "react";
import {
  Play,
  Pause,
  Shuffle,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  playNext,
  playPause,
  playPrevious,
  toggleShuffle,
} from "../reduxStore/playerSlice";

const Playbar = () => {
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.player.queue);
  const currentSongIndex = useSelector(
    (state) => state.player.currentSongIndex
  );
  const currentSong = queue[currentSongIndex];
  // const currentSong = useSelector((state) => state.player.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const isShuffle = useSelector((state) => state.player.isShuffle);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(true);
  const [isExpand, setIsExpand] = useState(false);

  const audioRef = useRef(null);
  const seekBarRef = useRef();

  const handleSeek = (e) => {
    const seekBar = seekBarRef.current;
    if (!seekBar || !audioRef.current || !duration) return;

    const rect = seekBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      dispatch(playPause(false));
    } else {
      audio.play();
      dispatch(playPause(true));
      console.log("Paused");
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Logic for play/pause
    if (currentSong && isPlaying) {
      audio.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    } else {
      audio.pause();
    }

    // Logic for seekbar
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    const handleEnded = () => {
      // dispatch(playPause(false))
      const nextIndex = currentSongIndex + 1;
      const queueLength = queue.length;
      if (nextIndex < queueLength) {
        // Play next song if available
        dispatch(playNext(currentSongIndex));
      } else {
        // No more songs to play — stop playback
        dispatch(playPause(false));
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isPlaying, dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const getVolumeIcon = () => {
    if (volume === false) {
      return <VolumeX size={20} />;
    }
    return <Volume2 size={20} />;
  };

  const handleShuffleToggle = () => {
    dispatch(toggleShuffle());
  };

  if (!currentSong) {
    return null;
  }

  return (
    <div
      className={`w-full relative ${
        isExpand ? "rounded-t-3xl overflow-hidden border border-white/30 " : "rounded-none"
      } transition-all duration-300 bg-white/30 backdrop-blur-lg flex flex-col items-center`}
    >
      
      {/* Audio Element */}
      <audio ref={audioRef} src={currentSong.preview} />
      <div
        className={`flex ${
          isExpand
            ? "flex-col items-center text-center"
            : "flex-row gap-2 justify-between"
        } py-2 bg-black transition-all duration-700 items-center w-full px-2`}
      >
        <div
          className={`flex ${
            isExpand ? "flex-col" : "flex-row"
          } items-center gap-2`}
        >
          <img
            src={currentSong?.album?.cover}
            alt={currentSong?.title}
            className={`${
              isExpand ? "h-32 w-32" : "h-16 w-16"
            } transition-all duration-300 rounded-full border border-white/30`}
          />
          <div>
            <p className="text-md font-semibold">{currentSong?.title}</p>
            <p className={`text-sm text-white`}>{currentSong?.artist?.name}</p>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className={`rounded-full text-black bg-white flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all duration-300 ${
            isExpand ? "h-0 w-0 opacity-0" : "w-12 h-12 opacity-100"
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
      <div
        className={`${
          isExpand
            ? "min-h-20 opacity-100 bg-white/30 bg-opacity-100 py-2"
            : "h-0 opacity-0"
        } transition-all duration-300 w-full relative`}
      >
        {/* Controls */}
        <div
          className={`flex items-center justify-center gap-2 ${
            isExpand ? "min-h-20 opacity-100" : "h-0 opacity-0"
          }`}
        >
          <button
            onClick={handleShuffleToggle}
            className={`p-[5px] hover:scale-125 rounded-full transition-all duration-300 active:scale-50 ${
              isShuffle ? "bg-gray-500" : "bg-transparent"
            }`}
          >
            <Shuffle size={20} />
          </button>
          <button
            onClick={() => dispatch(playPrevious())}
            className="active:scale-50 bg-gray-700 rounded-full hover:scale-110 active:bg-slate-700 active:rounded-full p-2 transition-all duration-300"
          >
            <SkipBack size={28} />
          </button>
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full text-black bg-white flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all duration-300"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button
            onClick={() => dispatch(playNext())}
            className="active:scale-50 bg-gray-700 rounded-full hover:scale-110 active:bg-slate-700  p-2 transition-all duration-300"
          >
            <SkipForward size={28} />
          </button>
          <div
            className={`${
              volume ? "" : "bg-gray-500"
            } cursor-pointer p-[5px] rounded-full transition-all duration-300 active:scale-50 hover:scale-125`}
            onClick={() => {
              setVolume(!volume);
            }}
          >
            {getVolumeIcon()}
          </div>
        </div>

        {/*Seekbar*/}
        <div
          className="absolute top-0 w-full h-2 bg-black cursor-pointer"
          onClick={handleSeek}
          ref={seekBarRef}
        >
          <div
            className="h-2 bg-white w-[30%]"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
      </div>
      <button
        className={`${
          isExpand ? "rotate-180" : "rotate-0"
        } h-4 px-2 bg-white w-full text-black`}
        onClick={() => {
          setIsExpand(!isExpand);
        }}
      >
        ^
      </button>
    </div>
  );
};

export default Playbar;
