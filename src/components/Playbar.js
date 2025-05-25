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
import QueueCard from "./QueueCard";

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
        isExpand
          ? "rounded-3xl overflow-hidden border border-white/30 shadow-2xl"
          : "rounded-none border-none shadow-xl"
      } transition-all duration-500 bg-white/30 backdrop-blur-lg flex flex-col items-center`}
    >
      {/* Audio Element */}
      <audio ref={audioRef} src={currentSong.preview} />
      <div
        className={`flex items-center  ${
          isExpand
            ? "flex-col text-center min-h-20"
            : "flex-row gap-2 justify-between min-h-10"
        } py-2 bg-black transition-all duration-500 items-center w-full px-2`}
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
              isExpand
                ? "h-32 w-32 border border-white/30"
                : "h-16 w-16 border-none"
            } transition-all duration-500 rounded-full`}
          />
          <div className={`${isExpand?"items-center":"items-start"} flex flex-col justify-center `}>
            <p
              className={` ${
                isExpand ? "text-lg" : "text-base "
              } font-semibold`}
            >
              {currentSong?.title}
            </p>
            <p className={`text-xs text-white`}>{currentSong?.artist?.name}</p>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className={`rounded-full text-black bg-white flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all duration-500 ${
            isExpand ? "h-0 w-0 opacity-0" : "w-12 min-h-12 opacity-100"
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
      <div
        className={`${
          isExpand
            ? "min-h-20 opacity-100 bg-white/30 bg-opacity-100 py-2"
            : "h-0 opacity-0 py-0 bg-transparent bg-opacity-0"
        } transition-all duration-500 w-full relative`}
      >
        {/* Controls */}
        <div
          className={`flex items-center justify-center gap-2 ${
            isExpand ? "min-h-20 w-full opacity-100" : "w-0 h-0 opacity-0"
          }`}
        >
          <button
            onClick={handleShuffleToggle}
            className={`hover:scale-125 rounded-full transition-all duration-300 active:scale-50 ${
              isShuffle ? "bg-gray-500" : "bg-transparent"
            } ${
              isExpand ? "h-8 w-8 opacity-100 p-[5px]" : "h-0 w-0 opacity-0 p-0"
            }`}
          >
            <Shuffle size={20} />
          </button>
          <button
            onClick={() => dispatch(playPrevious())}
            className={`${
              isExpand
                ? "min-h-12 min-w-12 opacity-100 active:scale-50 bg-gray-700 rounded-full hover:scale-110 active:bg-slate-700 active:rounded-full p-2"
                : "h-0 w-0 opacity-0 p-0"
            } transition-all duration-300`}
          >
            <SkipBack size={28} />
          </button>
          <button
            onClick={togglePlay}
            className={`${
              isExpand ? "w-16 h-16 opacity-100" : "h-0 w-0 opacity-0"
            } rounded-full text-black bg-white flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all duration-300`}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button
            onClick={() => dispatch(playNext())}
            className={` ${
              isExpand
                ? "min-h-12 min-w-12 opacity-100 p-2 active:scale-50 bg-gray-700 rounded-full hover:scale-110 active:bg-slate-700"
                : "h-0 w-0 opacity-0 p-0"
            } transition-all duration-300`}
          >
            <SkipForward size={28} />
          </button>
          <div
            className={`${volume ? "" : "bg-gray-500"} ${
              isExpand
                ? "h-8 w-8 opacity-100 p-[5px] active:scale-50 hover:scale-125"
                : "h-0 w-0 opacity-0 p-0"
            } cursor-pointer rounded-full transition-all duration-300`}
            onClick={() => {
              setVolume(!volume);
            }}
          >
            {getVolumeIcon()}
          </div>
        </div>

        {/*Seekbar*/}
        <div
          className={`${isExpand?"w-full h-2 opacity-100 bg-black":"h-0 opacity-0 bg-transparent"} absolute top-0 cursor-pointer transition-all duration-300`}
          onClick={handleSeek}
          ref={seekBarRef}
        >
          <div
            className={`${isExpand?"h-2 bg-white opacity-100":"h-0 bg-transparent opacity-0"} transition-all duration-300`}
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
      </div>
      <div
        className={`${
          isExpand ? "min-h-[10dvh] opacity-100" : "h-0 opacity-0"
        } max-h-[50dvh] w-full transition-all duration-700 overflow-auto hide-scrollbar`}
      >
        {queue.map((track, index) => (
          <QueueCard track={track} key={track?.id} />
        ))}
      </div>
      <button
        className={`${
          isExpand ? "rotate-0" : "rotate-180"
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
