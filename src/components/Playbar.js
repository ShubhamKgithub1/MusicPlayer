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
import { fetchFreshPreviewUrl } from "../services/deezerAPI";

const Playbar = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const queue = useSelector((state) => state.player.queue);
  const currentSongIndex = useSelector(
    (state) => state.player.currentSongIndex
  );
  const currentSong = queue[currentSongIndex];
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const isShuffle = useSelector((state) => state.player.isShuffle);
  const recentSongs = useSelector((state) => state.user.recentlyPlayed);

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
    if (!audio || !currentSong) return;

    const fetchAndSetSrc = async () => {
      try {
        const freshData = await fetchFreshPreviewUrl(
          currentSong?.id,
          currentSong?.title_short,
          currentSong?.artist?.name
        );

        if (!freshData?.preview) {
          console.error("No valid preview URL available.");
          return;
        }

        audio.src = freshData.preview;
        if (isPlaying) {
          await audio.play();

          if (user && currentSong.id !== lastAddedRef.current?.id) {
            addRecentlyPlayed(user.uid, freshData, dispatch, recentSongs);
            lastAddedRef.current = freshData;
          }
        }
      } catch (err) {
        console.error("Error loading or playing track:", err);
      }
    };

    fetchAndSetSrc();
  }, [currentSong, dispatch, user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error("Play error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      const nextIndex = currentSongIndex + 1;
      const queueLength = queue.length;
      if (nextIndex < queueLength) {
        dispatch(playNext(currentSongIndex));
      } else {
        dispatch(playPause(false));
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSongIndex, queue, dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const getVolumeIcon = () => {
    if (volume === false) {
      return <VolumeX size={18} />;
    }
    return <Volume2 size={18} />;
  };

  const handleShuffleToggle = () => {
    dispatch(toggleShuffle());
  };

  if (!currentSong) {
    return null;
  }

  return (
    <div
      className={`w-full relative h-[100dvh] md:h-auto z-50 flex flex-col items-center overflow-hidden animate-fade-in transition-[max-height] duration-300 text-gray-600 ${
        isExpand ? "max-h-[100dvh] md:rounded-lg" : "rounded-none max-h-[68px]"
      }  bg-purple-100 dark:bg-slate-900`}
    >
      {/*Header options*/}
      <div
        className={`w-full
    overflow-hidden 
    transition-[max-height,opacity,transform] duration-300
    ${
      isExpand
        ? "max-h-20 opacity-100 translate-y-0"
        : "max-h-0 opacity-0 translate-y-4"
    }
  `}
      >
        <div className="flex items-center w-full justify-between p-3 pb-0">
          <button
            className="rounded-full shadow-shadowInner dark:bg-white active:scale-[0.80] p-1.5 transition-all duration-300"
            onClick={() => {
              dispatch(resetPlayer());
              toast.success("Playing Queue cleared...");
              setIsExpand(false);
            }}
          >
            <ListXIcon size={22} />
          </button>

          <h1 className="font-bold dark:text-white text-sm">PLAYING NOW</h1>

          <button
            className="rounded-full shadow-shadowInner active:scale-[0.80] dark:bg-white p-1.5 transition-all duration-300"
            onClick={() => setIsExpand(false)}
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} preload="auto" />

      {/*Collapsed Playbar(Playbar Header)*/}
      <div
        className={`flex items-center w-full relative gap-2 transition-[opacity,transform] duration-300 
    ${
      isExpand
        ? "opacity-100 translate-y-0"
        : "opacity-100 translate-y-0 cursor-pointer"
    }
    `}
        onClick={() => {
          setIsExpand(true);
        }}
      >
        <div
          className={`flex flex-1 p-2 ${
            isExpand ? "flex-col gap-6" : "flex-row gap-2"
          } items-center overflow-x-hidden transition-all duration-300`}
        >
          <img
            src={currentSong?.album?.cover_big}
            alt={currentSong?.title}
            className={`${
              isExpand
                ? "h-40 w-40 md:h-28 md:w-28 shadow-shadowOuterLarge dark:shadow-none border-4"
                : "w-12 h-12"
            } transition-all duration-300 rounded-full aspect-square`}
          />
          <div
            className={`${
              isExpand ? "text-center w-[95%]" : ""
            } flex flex-col transition-all duration-300 overflow-hidden`}
          >
            <p className={`text-base font-bold truncate dark:text-white`}>
              {currentSong?.title_short}
            </p>
            <p
              className={`text-xs font-semibold dark:text-gray-400 text-black/60 truncate`}
            >
              {currentSong?.artist?.name}
            </p>
          </div>
        </div>

        <button
          onClick={togglePlay}
          className={`rounded-full shadow-md mr-2 w-12 h-12 bg-white flex items-center justify-center active:scale-90 transition-all duration-300 ${
            isExpand ? "hidden" : "block"
          }`}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>
      {/*Seekbar*/}
      <div
        className={`${
          isExpand ? "h-2 opacity-100" : "h-0 opacity-0"
        } cursor-pointer will-change-[height] shadow-shadowInner transition-[height,opacity] duration-300 w-full bg-white`}
        onClick={handleSeek}
        ref={seekBarRef}
      >
        <div
          className={`h-2 transition-[width] duration-300 bg-gray-600 rounded-r-md`}
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        />
      </div>

      {/* Expanded Playbar */}
      <div
        className={`w-full max-h-[90dvh] transition-[opacity] duration-300 flex flex-col flex-1 min-h-0 ${
          isExpand ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Controls */}
        <div
          className={`flex items-center shadow bg-white/30 dark:bg-slate-800 justify-center gap-3 md:gap-2 py-3 transition-[opacity] duration-300 overflow-hidden ${
            isExpand
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={handleShuffleToggle}
            className={`flex justify-center items-center h-10 w-10 md:h-8 md:w-8 text-white bg-gray-600 rounded-full transition-[shadow,transform] duration-300 active:scale-[0.85] shadow-shadowOuter dark:shadow-none`}
          >
            {isShuffle ? <Shuffle size={18} /> : <Repeat size={18} />}
          </button>
          <button
            onClick={() => dispatch(playPrevious())}
            className={`flex justify-center items-center p-3 lg:p-2 active:scale-[0.75] bg-white shadow-shadowInner rounded-full transition-[transform] duration-300`}
          >
            <SkipBack size={26} />
          </button>
          <button
            onClick={togglePlay}
            className={`flex items-center justify-center rounded-full w-16 h-16 md:w-14 md:h-14 bg-white shadow-shadowOuter dark:shadow-none active:scale-[0.80] transition-[shadow,transform] duration-300`}
          >
            {isPlaying ? <Pause size={30} /> : <Play size={30} />}
          </button>
          <button
            onClick={() => dispatch(playNext())}
            className={`flex justify-center items-center active:scale-[0.75] p-3 lg:p-2 bg-white shadow-shadowInner rounded-full transition-[transform] duration-300`}
          >
            <SkipForward size={26} />
          </button>
          <button
            className={`flex justify-center items-center h-10 w-10 md:h-8 md:w-8 text-white bg-gray-600 active:scale-[0.85] dark:shadow-none cursor-pointer rounded-full transition-[shadow,transform] duration-300 shadow-shadowOuter`}
            onClick={() => {
              dispatch(setVolume());
            }}
          >
            {getVolumeIcon()}
          </button>
        </div>

        {/*Queue Container */}
        <div
          className={`overflow-y-auto transition-[max-height] duration-300 hide-scrollbar flex-1 min-h-0 ${
            isExpand ? "max-h-[60dvh] md:max-h-[35dvh]" : "max-h-0"
          } p-1`}
        >
          {queue.map((track) => (
            <QueueCard track={track} key={track?.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playbar;
