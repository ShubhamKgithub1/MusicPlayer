import { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  playNext,
  playPause,
  playPrevious,
  resetPlayer,
  setVolume,
  toggleShuffle,
} from "../../reduxStore/playerSlice";
import { addRecentlyPlayed } from "../../services/userService";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { fetchFreshPreviewUrl } from "../../services/deezerAPI";
import CollapsedPlaybar from "./CollapsedPlaybar";
import PlaybarQueue from "./PlaybarQueue";
import PlaybarControls from "./PlaybarControls";
import PlaybarSongInfo from "./PlaybarSongInfo";
import PlaybarHeader from "./PlaybarHeader";
import PlaybarExpandedImage from "./PlaybarExpandedImage";

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

  const handleClearQueue = () => {
    dispatch(resetPlayer());
    toast.success("Playing Queue cleared...");
    setIsExpand(false);
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
      className={`relative w-full z-50 min-h-[65px] animate-fade-in text-gray-600`}
    >
      <audio ref={audioRef} preload="auto" />
      <div
        className={`text-white md:rounded-lg overflow-hidden will-change-[height] transition-[height] duration-300 ${
          isExpand ? "h-[100dvh] md:h-[60dvh]" : "h-0"
        } flex flex-col`}
      >
        <PlaybarExpandedImage
          src={currentSong?.album?.cover_big}
          alt={""}
          isExpand={isExpand}
        />
        <div
          className={`relative z-50 flex flex-col h-full bg-gradient-to-br from-black/60 via-black/40 to-black/10 transition-opacity duration-300 ${
            isExpand ? "opacity-100" : "opacity-0"
          }`}
        >
          <PlaybarHeader
            onClose={() => setIsExpand(false)}
            onClearQueue={handleClearQueue}
          />
          <div className=" h-[65%] w-[80%] mx-auto flex flex-col justify-end items-center gap-8">
            {/*Current Song info*/}
            <PlaybarSongInfo
              title={currentSong?.title_short}
              artist={currentSong?.artist?.name}
            />
            <div className="flex flex-col items-center">
              {/*Seekbar*/}
              <div
                className={`relative w-full cursor-pointer h-[2.5px] bg-white`}
                onClick={handleSeek}
                ref={seekBarRef}
              >
                <div
                  className={`absolute top-1/2 -translate-y-1/2 h-3 w-3 transition-all duration-300 bg-white rounded-full`}
                  style={{
                    left: `${(currentTime / duration) * 100}%`,
                  }}
                />
              </div>
              <PlaybarControls
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                playNext={() => dispatch(playNext())}
                playPrev={() => dispatch(playPrevious())}
                isShuffle={isShuffle}
                toggleShuffle={handleShuffleToggle}
                toggleVolume={() => {
                  dispatch(setVolume());
                }}
                volumeIcon={getVolumeIcon()}
              />
            </div>
          </div>
          <PlaybarQueue queue={queue} />
        </div>
      </div>
      <CollapsedPlaybar
        isExpand={isExpand}
        src={currentSong?.album?.cover_small}
        title={currentSong?.title_short}
        artist={currentSong?.artist?.name}
        onExpand={() => setIsExpand(true)}
        currentSong={currentSong}
        togglePlay={togglePlay}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default Playbar;
