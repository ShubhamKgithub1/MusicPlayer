import { useDispatch } from "react-redux";
import { playPause, setQueue } from "../reduxStore/playerSlice";
const BannerCard = ({ topTracks }) => {
  const dispatch = useDispatch();
  const handlePlay = () => {
    dispatch(setQueue(topTracks));
    dispatch(playPause(true));
  };

  const track = topTracks[0];
  if (!track) return null;
  return (
    <div className="w-full h-[40%] flex relative rounded-3xl overflow-hidden ">
      <img
        src={track?.album?.cover_big}
        alt="not found"
        className="w-full h-full relative object-fill"
      />
      <div className="flex flex-col justify-end items-start absolute z-10 bottom-0 text-white bg-gradient-to-tr from-black to-transparent inset-0">
        <div className="p-4 flex flex-col justify-end truncate w-full">
          <h1 className="text-3xl font-bold truncate">{track?.album?.title.trim(10)}</h1>
          <h3 className="text-lg font-medium">{track?.artist?.name}</h3>
          <div className="flex gap-2">
            <button
              className="border px-6 py-2 rounded-full hover:bg-gray-200 hover:text-black transition-all duration-300 active:scale-90"
              onClick={() => handlePlay()}
            >
              Play
            </button>
            <button className="border px-6 py-2 rounded-full hover:bg-gray-200 hover:text-black transition-all duration-300">
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
