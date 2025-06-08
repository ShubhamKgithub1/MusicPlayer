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
} from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  playNext,
  playPause,
  playPrevious,
  resetPlayer,
  toggleShuffle,
} from "../reduxStore/playerSlice";
import QueueCard from "./QueueCard";
import { addRecentlyPlayed } from "../services/userService";
import { getAuth } from "firebase/auth";

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
  const [volume, setVolume] = useState(true);
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

  const togglePlay = () => {
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
      className={`w-full relative z-50 ${
        isExpand
          ? "rounded-3xl border border-white/20 shadow-none"
          : "rounded-none border-none shadow-custom"
      } ${
        isPlaying ? "shadow-custom" : "shadow-none"
      } transition-all duration-300 bg-white/30 backdrop-blur-lg flex flex-col items-center animate-fade-in overflow-hidden`}
    >
      {/*Clear Queue*/}
      <div
        className={`${
          isExpand ? "block" : "hidden"
        } absolute top-2 right-3 cursor-pointer z-[99]`}
        onClick={() => {
          dispatch(resetPlayer());
        }}
      >
        <ListXIcon size={24} />
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={currentSong.preview} />

      {/*Collapsed Playbar(Playbar Header)*/}
      <div
        className={`flex items-center overflow-hidden ${
          isExpand ? "gap-0 min-h-20 text-center pb-4" : "gap-2 min-h-10"
        } py-2 bg-black transition-all duration-300 items-center w-full px-2 relative`}
      >
        <div
          className={`flex flex-1 ${
            isExpand ? "flex-col" : "flex-row"
          } items-center gap-2 overflow-hidden`}
        >
          <img
            src={currentSong?.album?.cover}
            alt={currentSong?.title}
            className={`${
              isExpand ? "h-24 w-24" : "h-16 w-16"
            } transition-all duration-300 rounded-full`}
          />
          <div
            className={`${
              isExpand ? "text-center w-[95%]" : ""
            } flex flex-col flex-grow transition-all duration-300 truncate overflow-hidden`}
          >
            <p
              className={` ${
                isExpand ? "text-lg" : "text-base"
              } font-semibold truncate`}
            >
              {currentSong?.title_short}
            </p>
            <p className={`text-xs text-white truncate`}>
              {currentSong?.artist?.name}
            </p>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className={`rounded-full text-black h-12 w-12 bg-white flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-300 ${
            isExpand ? "hidden" : "block"
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/*Seekbar*/}
        <div
          className={`${
            isExpand ? "max-h-2 opacity-100" : "max-h-0 opacity-0"
          } absolute bottom-0 left-0 cursor-pointer transition-all duration-300 w-full `}
          onClick={handleSeek}
          ref={seekBarRef}
        >
          <div
            className={`${
              isExpand ? "max-h-2 opacity-100" : "max-h-0 opacity-0"
            } transition-all duration-300 bg-white`}
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
      </div>

      {/* Expanded Playbar */}
      <div
        className={`${
          isExpand ? "max-h-[500px]" : "max-h-0"
        } overflow-hidden transition-all duration-300 w-full`}
      >
        {/* Controls */}
        <div
          className={`flex items-center bg-white/30 justify-center gap-2 py-2 transition-all duration-300 ${
            isExpand ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <button
            onClick={handleShuffleToggle}
            className={`flex justify-center items-center hover:scale-125 rounded-full transition-all duration-300 active:scale-50 shadow-md p-[5px] ${
              isShuffle ? "bg-gray-500" : "bg-transparent"
            } ${
              isExpand
                ? "max-h-8 max-w-8"
                : "max-h-0 max-w-0"
            }`}
          >
            <Shuffle size={20} />
          </button>
          <button
            onClick={() => dispatch(playPrevious())}
            className={`${
              isExpand ? "max-h-10 max-w-10" : "max-h-0 max-w-0"
            } flex justify-center items-center active:scale-[0.75] bg-gray-700 rounded-full hover:scale-110 transition-all duration-300 p-2`}
          >
            <SkipBack size={28} />
          </button>
          <button
            onClick={togglePlay}
            className={`${
              isExpand ? "max-w-14 max-h-14" : "max-h-0 max-w-0"
            } rounded-full text-black bg-white flex items-center justify-center shadow-md hover:scale-105 active:scale-[0.85] transition-all duration-300 w-14 h-14`}
          >
            {isPlaying ? <Pause size={30} /> : <Play size={30} />}
          </button>
          <button
            onClick={() => dispatch(playNext())}
            className={` ${
              isExpand ? " max-h-10 max-w-10" : "max-h-0 max-w-0"
            } flex justify-center items-center active:scale-[0.75] bg-gray-700 rounded-full hover:scale-110 transition-all duration-300 p-2`}
          >
            <SkipForward size={28} />
          </button>
          <div
            className={`${volume ? "" : "bg-gray-500"} ${
              isExpand
                ? "max-h-8 max-w-8"
                : "max-h-0 max-w-0"
            } active:scale-50 hover:scale-125 flex justify-center items-center cursor-pointer rounded-full transition-all duration-300 shadow-md p-[5px]`}
            onClick={() => {
              setVolume(!volume);
            }}
          >
            {getVolumeIcon()}
          </div>
        </div>

        {/*Queue Container */}
        <div
          className={`${
            isExpand ? "opacity-100 max-h-[35dvh]" : "max-h-0 opacity-0"
          } w-full transition-all duration-300 overflow-auto hide-scrollbar max-h-[35dvh]`}
        >
          {queue.map((track, index) => (
            <QueueCard track={track} key={track?.id} />
          ))}
        </div>
      </div>

      {/*Playbar Expand Icon*/}
      <button
        className={`${
          isExpand ? "rotate-0" : "rotate-180"
        } h-4 bg-white w-full text-black`}
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
