import { useDispatch } from "react-redux";
import { playPause, setQueue } from "../reduxStore/playerSlice";
import { Play } from "lucide-react";
const BannerCard = ({ topTracks }) => {
  const dispatch = useDispatch();
  const handlePlay = () => {
    dispatch(setQueue(topTracks));
    dispatch(playPause(true));
  };

  const track = topTracks[0];
  if (!track) return null;
  return (
    <div className="w-full h-[40%] flex relative rounded-lg lg:rounded-xl overflow-hidden ">
      <img
        src={track?.album?.cover_big}
        alt="not found"
        className="w-full h-full relative object-fill"
      />
      <div className="flex flex-row justify-start items-end absolute z-10 bottom-0 text-white bg-gradient-to-t from-black to-transparent inset-0 p-2 xl:p-4">
        <div className="flex flex-col truncate w-full">
          <h3 className="text-sm xl:text-base">{track?.artist?.name}</h3>
          <h1 className="text-lg 2xl:text-2xl font-semibold lg:font-bold truncate">
            {track?.album?.title}
          </h1>
        </div>
        <button
          className="p-3 lg:p-4 bg-white rounded-full hover:bg-white/80 text-black transition-all duration-200 active:scale-90"
          onClick={() => handlePlay()}
        >
          <Play size={20} />
        </button>
      </div>
    </div>
  );
};

export default BannerCard;
