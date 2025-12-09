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
  const playbarRef = useRef(null);

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

  useEffect((e) => {
    const handleClickOutside = (e) => {
      if (playbarRef.current && !playbarRef.current.contains(e.target)) {
        setIsExpand(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
      ref={playbarRef}
      className={`relative w-full z-50 min-h-[68px] animate-fade-in text-gray-600`}
    >
            {/*Old queueCard--
        
                <div className="relative group flex items-center rounded-lg gap-3 p-2 hover:bg-purple-200 dark:bg-transparent hover:shadow-shadowInner dark:hover:shadow-none transition-all duration-200 cursor-pointer active:scale-95" onClick={()=>handleTrackClick(track?.id)}>
            <div className="hidden dark:block md:block z-0 absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            <img src={track?.album?.cover_small} alt={track?.title} className="w-12 h-12 rounded-full"/>
            <div className="flex flex-col truncate relative z-20">
                <span className="text-sm font-bold dark:text-white truncate">{track?.title_short}</span>
                <span className="text-xs font-semibold dark:text-gray-300 truncate">{track?.artist?.name}</span>
            </div>
        </div>*/}
      <audio ref={audioRef} preload="auto"/>
        <div
          className={`bg-purple-100 dark:bg-slate-900 md:rounded-lg will-change-[height] transition-[height,opacity] duration-300 ${isExpand ? "h-[100dvh] md:h-[60dvh] opacity-100" : "h-0 opacity-0"} flex flex-col`}
        >
          <div className="flex flex-col">
            {/*Header options*/}
            <div
              className={`flex items-center justify-between p-3 pb-0 overflow-hidden`}
            >
              <button
                className="rounded-full hover:shadow-shadowInner dark:bg-white active:scale-[0.80] p-1.5 transition-all duration-300"
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
                className="rounded-full hover:shadow-shadowInner dark:bg-white active:scale-[0.80] p-1.5 transition-all duration-300"
                onClick={() => setIsExpand(false)}
              >
                <X size={22} />
              </button>
            </div>
            {/*Song metadata*/}
            <div
              className={`flex flex-col items-center gap-6 py-3`}
            >
              <img
                src={currentSong?.album?.cover_big}
                alt={currentSong?.title}
                className={`h-48 w-48 md:h-28 md:w-28 shadow-shadowOuterLarge dark:shadow-none border-4 transition-[width,shadow] duration-300 rounded-full`}
              />
              <div className={` text-center w-[95%]`}>
                <p className={`text-base font-bold truncate dark:text-white`}>
                  {currentSong?.title_short}
                </p>
                <p
                  className={`text-xs font-bold dark:text-gray-400 text-black/60 truncate`}
                >
                  {currentSong?.artist?.name}
                </p>
              </div>
            </div>
            {/*Seekbar*/}
            <div
              className={`h-2 cursor-pointer shadow-shadowInner w-full bg-white`}
              onClick={handleSeek}
              ref={seekBarRef}
            >
              <div
                className={`h-2 transition-[width] duration-300 bg-gray-600 rounded-r-md`}
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
            </div>
            {/* Controls */}
            <div
              className={`flex items-center shadow bg-white/30 dark:bg-slate-800 justify-center gap-3 md:gap-2 py-3`}
            >
              <button
                onClick={handleShuffleToggle}
                className={`flex justify-center items-center h-10 w-10 md:h-8 md:w-8 text-white bg-gray-600 rounded-full transition-[transform] duration-300 active:scale-[0.85] shadow-shadowOuter dark:shadow-none`}
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
                className={`flex items-center justify-center rounded-full w-16 h-16 md:w-14 md:h-14 bg-white shadow-shadowOuter dark:shadow-none active:scale-[0.80] transition-[transform] duration-300`}
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
                className={`flex justify-center items-center h-10 w-10 md:h-8 md:w-8 text-white bg-gray-600 active:scale-[0.85] dark:shadow-none cursor-pointer rounded-full transition-[transform] duration-300 shadow-shadowOuter`}
                onClick={() => {
                  dispatch(setVolume());
                }}
              >
                {getVolumeIcon()}
              </button>
            </div>
          </div>
          {/*Queue Container*/}
          {isExpand && <div
            className={`flex-1 overflow-y-auto hide-scrollbar p-1`}
          >
            {queue.map((track) => (
              <QueueCard track={track} key={track?.id}/>
            ))}
          </div>}
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 flex items-center gap-1.5 cursor-pointer p-2 bg-purple-100 dark:bg-slate-900 transition-[opacity] duration-300 
   ${isExpand ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
    `}
          onClick={() => {
            setIsExpand(true);
          }}
        >
          <div className={`flex gap-1.5 items-center flex-1 overflow-hidden`}>
            <img
              src={currentSong?.album?.cover_big}
              alt={currentSong?.title}
              className={`w-12 h-12 rounded-full`}
            />
            <div className={`flex flex-col truncate`}>
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
            className={`rounded-full shadow-md ml-auto w-12 h-12 bg-white flex items-center justify-center active:scale-90 transition-transform duration-300`}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
    </div>
  );
};

export default Playbar;
