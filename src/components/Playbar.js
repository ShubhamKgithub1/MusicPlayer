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
    <div className="w-full relative p-4 pb-0 rounded-3xl bg-white/30 backdrop-blur-lg border border-white/30 flex gap-6 flex-col items-center">
      {/* Audio Element */}
      <audio ref={audioRef} src={currentSong.preview} />
      <div className="flex flex-col items-center text-center space-y-1">
        <img
          src={currentSong?.album?.cover}
          alt={currentSong?.title}
          className="h-40 w-40 rounded-full border border-white/30"
        />
        <p className="text-lg font-semibold">{currentSong?.title}</p>
        <p className="text-sm text-gray-600">{currentSong?.artist?.name}</p>
      </div>
      <div className="bg-white/30 rounded-t-3xl py-2 w-full relative">
      {/* Controls */}
      <div className={`flex items-center gap-2 relative w-full justify-center `}>
        <button onClick={handleShuffleToggle} className={`p-[5px] rounded-full transition-all duration-300 active:scale-50 ${isShuffle ? "bg-gray-700":"bg-transparent"}`}>
          <Shuffle size={20}/>
        </button>
        <button onClick={() => dispatch(playPrevious())}
           className="active:scale-50 active:bg-slate-700 active:rounded-full p-2 transition-all duration-300">
          <SkipBack size={28}/>
        </button>
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full text-black bg-white flex items-center justify-center shadow-md  active:scale-90 transition"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button onClick={() => dispatch(playNext())}
          className="active:scale-50 active:bg-slate-700 active:rounded-full p-2 transition-all duration-300">
          <SkipForward size={28}/>
        </button>
        <div className={`${volume ?"":"bg-gray-700"} cursor-pointer p-[5px] rounded-full transition-all duration-300 active:scale-50`} onClick={()=>{setVolume(!volume)}}>
          {getVolumeIcon()}
        </div>
      </div>


      {/*Seekbar*/}
      <div
        className="absolute bottom-0 w-full h-2 bg-white/50 rounded-full cursor-pointer"
        onClick={handleSeek}
        ref={seekBarRef}
      >
        <div
          className="h-2 bg-black w-[30%] rounded-full"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        />
      </div>
      </div>
    </div>
  );
};

export default Playbar;
