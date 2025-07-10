import { useDispatch } from "react-redux";
import { playPause, setQueue } from "../reduxStore/playerSlice";
import { Play } from "lucide-react";
import { NavLink } from "react-router-dom";
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
      <div className="flex flex-col justify-end items-start absolute z-10 bottom-0 text-white bg-gradient-to-tr from-black to-transparent inset-0">
        <div className="p-2 xl:p-4 flex flex-col justify-end truncate w-full gap-0 lg:gap-1">
          <h1 className="text-lg xl:text-2xl font-semibold lg:font-bold truncate">{track?.album?.title}</h1>
          <h3 className="text-sm xl:text-lg">{track?.artist?.name}</h3>
          <div className="flex gap-1.5">
            <button
              className="flex justify-center items-center border border-white/20 p-1.5 lg:p-3 bg-white rounded-full hover:shadow-[inset_0_4px_6px_black] text-black transition-all duration-200 active:scale-90"
              onClick={() => handlePlay()}
            >
              <Play size={20}/>
            </button>
            <NavLink
            to="/explore"
            className="flex items-center justify-center font-medium bg-white text-black border border-white/20 px-3 lg:px-4 py-1 lg:py-2 rounded-full hover:shadow-[inset_0_4px_6px_black] transition-all duration-200">
              More
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
