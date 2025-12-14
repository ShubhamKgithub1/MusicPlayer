import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  playNext,
  playPause,
  playPrevious,
  resetPlayer,
  toggleShuffle,
  toggleVolume,
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
  const currentSong = useMemo(() => {
    return queue[currentSongIndex];
  }, [queue, currentSongIndex]);

  const isPlaying = useSelector((state) => state.player.isPlaying);
  const isShuffle = useSelector((state) => state.player.isShuffle);
  const recentSongs = useSelector((state) => state.user.recentlyPlayed);
  const volume = useSelector((state) => state.player.volume);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpand, setIsExpand] = useState(false);

  const audioRef = useRef(null);
  const seekBarRef = useRef();
  const lastAddedRef = useRef(null);
  const playbarRef = useRef(null);

  const togglePlay = useCallback(
    (e) => {
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
    },
    [isPlaying, dispatch]
  );

  const handleSeek = useCallback(
    (e) => {
      const seekBar = seekBarRef.current;
      if (!seekBar || !audioRef.current || !duration) return;

      const rect = seekBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;

      const newTime = (clickX / width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [duration]
  );

  const handleClearQueue = useCallback(() => {
    dispatch(resetPlayer());
    toast.success("Playing Queue cleared...");
    setIsExpand(false);
  }, [dispatch]);

  const handleShuffleToggle = useCallback(() => {
    dispatch(toggleShuffle());
  }, [dispatch]);

  const handleVolumeToggle = useCallback(() => {
    dispatch(toggleVolume());
  }, [dispatch]);

  const handleCollapse = useCallback(() => {
    setIsExpand(false);
  }, []);

  const handleExpand = useCallback(() => {
    setIsExpand(true);
  }, []);

  const handleNext = useCallback(() => {
    dispatch(playNext());
  }, [dispatch]);

  const handlePrev = useCallback(() => {
    dispatch(playPrevious());
  }, [dispatch]);

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

  const volumeIcon = useMemo(() => {
    if (volume === false) return <VolumeX size={20} />;
    return <Volume2 size={20} />;
  }, [volume]);

  if (queue.length === 0) {
    return null;
  }

  return (
    <div
      ref={playbarRef}
      className={`absolute bottom-0 md:bottom-2 lg:bottom-4 text-gray-600 overflow-hidden`}
    >
      <audio ref={audioRef} preload="auto" />
      <div
        className={`fixed bottom-0 md:bottom-2 lg:bottom-4 w-full md:w-[40dvw] lg:w-[30dvw] xl:w-[18dvw] md:left-2 lg:left-4 z-50 bg-slate-400 dark:bg-slate-600 text-white md:rounded-lg overflow-hidden transition-[transform,opacity] duration-200 h-[100dvh] md:h-[60dvh] ${
          isExpand ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        } flex flex-col`}
      >
        <PlaybarExpandedImage
          src={currentSong?.album?.cover_big}
          alt={""}
          isExpand={isExpand}
        />
        <div
          className={`relative z-50 flex flex-col h-full transition-opacity duration-200 ${
            isExpand ? "opacity-100" : "opacity-0"
          }`}
        >
          <PlaybarHeader
            onClose={handleCollapse}
            onClearQueue={handleClearQueue}
          />
          <div className="flex flex-col h-full  bg-gradient-to-t from-black via-black/80 to-black/20">
            <div className=" h-[70%] flex flex-col justify-end items-center gap-6">
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
                    className={`absolute top-1/2 -translate-y-1/2 h-3 w-3 transition-all duration-200 bg-white rounded-full`}
                    style={{
                      left: `${(currentTime / duration) * 100}%`,
                    }}
                  />
                </div>
                <PlaybarControls
                  isPlaying={isPlaying}
                  togglePlay={togglePlay}
                  playNext={handleNext}
                  playPrev={handlePrev}
                  isShuffle={isShuffle}
                  toggleShuffle={handleShuffleToggle}
                  toggleVolume={handleVolumeToggle}
                  volumeIcon={volumeIcon}
                />
              </div>
            </div>
            <PlaybarQueue queue={queue} />
          </div>
        </div>
      </div>
      <CollapsedPlaybar
        isExpand={isExpand}
        src={currentSong?.album?.cover_small}
        title={currentSong?.title_short}
        artist={currentSong?.artist?.name}
        onExpand={handleExpand}
        currentSong={currentSong}
        togglePlay={togglePlay}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default React.memo(Playbar);
