import { useRef, useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { playPause } from "../reduxStore/playerSlice";
import { Volume1, Volume2, VolumeX } from "lucide-react";

const Playbar = () => {
  const dispatch = useDispatch();

  const currentSong = useSelector((state) => state.player.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

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

    const handleEnded = () => dispatch(playPause(false));

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
    if (volume === 0) {
      return <VolumeX size={20} />;
    }
    if (volume < 0.5) {
      return <Volume1 size={20} />;
    }
    return <Volume2 size={20} />;
  };

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio)
  //     return;

  //   // console.log("Song ended..");
  //   const handleEnded = () => {
  //     dispatch(playPause(false));
  //     // console.log("Song ended..");
  //   };
  //   audio.addEventListener("ended", handleEnded);

  //   return () => {
  //     audio.removeEventListener("ended", handleEnded);
  //   };
  // }, [dispatch]);

  if (!currentSong) {
    return null;
  }

  return (
    <div className="w-full relative p-4 rounded-3xl bg-white/30 backdrop-blur-lg border border-white/30 flex gap-6 flex-col items-center">
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

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-14 h-14 rounded-full text-black bg-white flex items-center justify-center shadow-md hover:scale-105 transition"
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
      </button>

      {/*Volume UI */}
      <div className="absolute right-6 top-6 group">
        {/* Volume Icon */}
        <div className="flex justify-center items-center cursor-pointer">
          {getVolumeIcon()}
        </div>

        {/* Slider with smooth transition */}
        <div
          className="h-24 w-8 mt-2 relative flex items-center justify-center 
                  opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 
                  transition-all duration-300 origin-top"
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="absolute w-24 transform -rotate-90 origin-center appearance-none bg-white/50 rounded-lg"
          />
        </div>
      </div>

      {/*Seekbar*/}
      <div
        className="w-full h-2 bg-white/50 rounded-full cursor-pointer"
        onClick={handleSeek}
        ref={seekBarRef}
      >
        <div
          className="h-2 bg-black w-[30%] rounded-full"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        />
      </div>
    </div>
  );
};

export default Playbar;
