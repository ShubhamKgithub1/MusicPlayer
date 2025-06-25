import { useRef, useEffect, useState } from "react";
import {
  Play,
  Pause,
  Shuffle,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  ListXIcon,
  X,
  Repeat,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  playNext,
  playPause,
  playPrevious,
  resetPlayer,
  setVolume,
  toggleShuffle,
} from "../reduxStore/playerSlice";
import QueueCard from "./QueueCard";
import { addRecentlyPlayed } from "../services/userService";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

const Playbar = () => {
  const auth = getAuth();
  const user = auth.currentUser;
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
  const volume = useSelector((state) => state.player.volume);
  const [isExpand, setIsExpand] = useState(false);

  const audioRef = useRef(null);
  const seekBarRef = useRef();
  const lastAddedRef = useRef(null);

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

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      dispatch(playPause(false));
    } else {
      audio.play();
      dispatch(playPause(true));
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentSong && isPlaying) {
      audio
        .play()
        .then(() => {
          if (user && currentSong.id !== lastAddedRef.current?.id) {
            addRecentlyPlayed(user.uid, currentSong);
            lastAddedRef.current = currentSong;
          }
        })
        .catch((err) => {
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
  }, [currentSong, isPlaying, dispatch, currentSongIndex, queue, user]);

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
      className={`w-full relative z-50 flex flex-col items-center overflow-hidden animate-fade-in transition-all duration-300 ${
        isExpand
          ? "h-screen sm:h-auto sm:rounded-xl dark:shadow-custom bg-purple-100/80 dark:bg-black/40"
          : "rounded-none border-none dark:shadow-custom bg-black/40"
      } ${
        isPlaying ? "shadow-custom" : "shadow-none"
      }  backdrop-blur-3xl`}
    >
      {/*Clear Queue*/}
      <div className={` flex items-center w-full justify-between text-gray-600 dark:text-white overflow-hidden transition-all duration-300 ${
          isExpand ? "max-h-[40] p-4 pb-1.5 md:p-2 md:pb-2" : "max-h-0"
        }`}>
        <button
        className={`rounded-full shadow-shadowOuter dark:shadow-none dark:hover:shadow-custom hover:shadow-shadowInner active:scale-[0.80] p-2 md:p-1.5 cursor-pointer transition-all duration-300`}
        onClick={() => {
          dispatch(resetPlayer());
          toast.success("Playing Queue cleared...");
          setIsExpand(false);
        }}
      >
        <ListXIcon size={24} />
      </button>
      <h1 className="text-gray-700 font-semibold dark:text-white text-sm">PLAYING NOW</h1>
      <button
        className={`rounded-full shadow-shadowOuter hover:shadow-shadowInner active:scale-[0.80] dark:shadow-none dark:hover:shadow-custom p-2 md:p-1.5 cursor-pointer transition-all duration-300`}
        onClick={() => {
          setIsExpand(false);
        }}
      >
        <X size={24} />
      </button>
      </div>
      {/* Audio Element */}
      <audio ref={audioRef} src={currentSong.preview} />

      {/*Collapsed Playbar(Playbar Header)*/}
      <div
        className={`flex items-center ${
          isExpand ? "gap-0 min-h-64 md:min-h-20 text-center pb-4" : "gap-2 min-h-10 cursor-pointer py-3 md:py-1.5"
        }  transition-all duration-300 items-center w-full px-2 relative`}
        onClick={() => {
          setIsExpand(true);
        }}
      >
        <div
          className={`flex flex-1 ${
            isExpand ? "flex-col gap-6 pt-3 dark:pt-0" : "flex-row gap-2"
          } items-center md:gap-2 overflow-x-hidden`}
        >
          <img
            src={currentSong?.album?.cover}
            alt={currentSong?.title}
            className={`${
              isExpand ? "h-36 w-36 md:h-24 md:w-24 shadow-shadowOuterLarge dark:shadow-none" : "sm:h-14 sm:w-14 h-14 w-14"
            } transition-all duration-300 rounded-full`}
          />
          <div
            className={`${
              isExpand ? "text-center w-[95%]" : ""
            } flex flex-col flex-grow transition-all duration-300 truncate overflow-x-hidden`}
          >
            <p
              className={` ${
                isExpand ? "text-xl md:text-base text-gray-600" : "text-base text-white"
              } font-semibold truncate  dark:text-white`}
            >
              {currentSong?.title_short}
            </p>
            <p className={`text-xs dark:text-gray-400 text-black/60 truncate`}>
              {currentSong?.artist?.name}
            </p>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className={`rounded-full text-black shadow-shadowOuter dark:shadow-none hover:shadow-shadowInner dark:hover:shadow-shadowInner h-12 w-12 bg-white flex items-center justify-center active:scale-90 transition-all duration-300 ${
            isExpand ? "hidden" : "block"
          }`}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>
      {/*Seekbar*/}
       <div
          className={`${
            isExpand ? "min-h-2 opacity-100" : "h-0 opacity-0"
          } cursor-pointer shadow-shadowInner transition-all duration-300 w-full bg-white`}
          onClick={handleSeek}
          ref={seekBarRef}
        >
          <div
            className={`${
              isExpand ? "min-h-2 opacity-100" : "h-0 opacity-0"
            } transition-all duration-300 bg-gray-600 dark:bg-gradient-to-r from-cyan-300 to-purple-600 rounded-r-md`}
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>

      {/* Expanded Playbar */}
      <div
        className={`w-full transition-all duration-300 flex flex-col ${
          isExpand ? "flex-1 opacity-100 min-h-0 max-h-[90dvh]" : "max-h-0 opacity-0"
        }`}
      >
        {/* Controls */}
        <div
          className={`flex items-center py-3 shadow bg-white/30 bg-opacity-100 justify-center gap-3 md:gap-2 md:py-2 text-white transition-all duration-300 ${
            isExpand ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <button
            onClick={handleShuffleToggle}
            className={`flex justify-center dark:shadow-none items-center hover:scale-[1.13] md:hover:scale-[1.15] rounded-full transition-all duration-300 active:scale-[0.70] md:active:scale-[0.55] shadow-shadowOuter bg-gray-500 ${
              isExpand
                ? "h-10 w-10 md:h-8 md:w-8 opacity-100 p-[5px]"
                : "h-0 w-0 opacity-0 p-0"
            }`}
          >
            {isShuffle ? <Shuffle size={20} /> : <Repeat size={20} />}
          </button>
          <button
            onClick={() => dispatch(playPrevious())}
            className={`${
              isExpand ? "h-12 w-12 md:h-10 md:w-10 opacity-100  p-2" : "h-0 w-0 opacity-0 p-0"
            } flex justify-center items-center active:scale-[0.75] dark:active:scale-[0.75] dark:hover:scale-[1.10] text-gray-600 dark:bg-gray-800 shadow-shadowOuter dark:shadow-none dark:text-white hover:shadow-shadowInner rounded-full transition-all duration-300`}
          >
            <SkipBack size={28} />
          </button>
          <button
            onClick={togglePlay}
            className={`${
              isExpand ? "w-16 h-16 md:w-14 md:h-14 opacity-100" : "h-0 w-0 opacity-0"
            } rounded-full text-gray-600 dark:text-black bg-white shadow-shadowOuter hover:shadow-shadowInner dark:shadow-none dark:hover:scale-[1.05] active:scale-[0.80] flex items-center justify-center dark:active:scale-[0.85] transition-all duration-300`}
          >
            {isPlaying ? <Pause size={30} /> : <Play size={30} />}
          </button>
          <button
            onClick={() => dispatch(playNext())}
            className={` ${
              isExpand ? "h-12 w-12 md:h-10 md:w-10 opacity-100 p-2 " : "h-0 w-0 opacity-0 p-0"
            } flex justify-center items-center active:scale-[0.75] dark:active:scale-[0.75] dark:hover:scale-[1.10] text-gray-600 dark:bg-gray-800 shadow-shadowOuter dark:shadow-none dark:text-white hover:shadow-shadowInner rounded-full transition-all duration-300`}
          >
            <SkipForward size={28} />
          </button>
          <div
            className={` ${
              isExpand
                ? "h-10 w-10 md:h-8 md:w-8 opacity-100 p-[5px] "
                : "h-0 w-0 opacity-0 p-0"
            } bg-gray-500 active:scale-[0.70] md:active:scale-[0.55] hover:scale-[1.13] dark:shadow-none md:hover:scale-[1.15] flex justify-center items-center cursor-pointer rounded-full transition-all duration-300 shadow-shadowOuter`}
            onClick={() => {
              dispatch(setVolume());
            }}
          >
            {getVolumeIcon()}
          </div>
        </div>

        {/*Queue Container */}
        <div
          className={`w-full overflow-y-auto transition-all duration-300  hide-scrollbar ${
            isExpand ? "flex-1 opacity-100 min-h-0 max-h-[80dvh] sm:max-h-[35dvh]" : "max-h-0 opacity-0"
          } p-2 sm:p-0`}
        >
          {queue.map((track, index) => (
            <QueueCard track={track} key={track?.id} />
          ))}
        </div>
      </div>

      {/*Playbar Expand Icon*/}
      {/* <button
        className={`${
          isExpand ? "rotate-180" : "rotate-0"
        } h-4 bg-white w-full text-black hidden sm:block`}
        onClick={() => {
          setIsExpand(!isExpand);
        }}
      >
        ^
      </button> */}
    </div>
  );
};

export default Playbar;
