import { Play } from "lucide-react";
import { useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  setCurrentSongIndex,
  playPause,
  setQueue,
} from "../reduxStore/playerSlice";
import { useRef } from "react";

const HorizontalScroller = ({data}) => {
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();

  const handlePlay = (track) => {
    if (!data) return;
    dispatch(setQueue(data));
    const index = data.findIndex((t) => t.id === track.id);
    if (index !== -1) {
      dispatch(setCurrentSongIndex(index));
      dispatch(playPause(true));
    }
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };


  if (!data) return null;

  return (
    <div className="relative overflow-hidden p-2 lg:px-4 lg:py-0 bg-white/30 shadow-inner shadow-black/40 dark:bg-black/10 lg:dark:bg-transparent backdrop-blur-lg border border-white/10 lg:border-none lg:shadow-none lg:backdrop-blur-none lg:bg-transparent rounded-md lg:rounded-none">
      <div
        onClick={scrollLeft}
        className="absolute bg-white left-0 flex justify-center items-center z-40 top-1/2 -translate-y-1/2 overflow-hidden p-1.5 xl:p-2 cursor-pointer rounded-full hover:scale-[1.04] active:scale-[0.82] transition-all duration-200"
      >
        <ChevronLeft className="text-black" size={22} />
      </div>
      <div
        onClick={scrollRight}
        className="absolute right-0 flex justify-center items-center top-1/2 -translate-y-1/2 z-40 p-1.5 xl:p-2 overflow-hidden cursor-pointer rounded-full bg-white hover:scale-[1.04] active:scale-[0.82] transition-all duration-200"
      >
        <ChevronRight className="text-black" size={22} />
      </div>
      <div
        ref={scrollContainerRef}
        className="w-full lg:py-1.5 flex overflow-x-scroll flex-shrink-0 gap-3 lg:gap-4 hide-scrollbar snap-x snap-mandatory scroll-smooth lg:px-4"
      >
        {data.map((res) => (
          <div
            key={res?.id}
            className="flex-[0_0_35%] sm:flex-[0_0_25%] md:flex-[0_0_20%] xl:flex-[0_0_13%] flex snap-start rounded-lg lg:rounded-xl lg:dark:rounded-none shadow-md relative overflow-hidden cursor-pointer transition-all duration-200"
            onClick={() => handlePlay(res)}
          >
            <img
              src={res?.album?.cover_medium}
              alt="cover"
              className="object-center relative z-10"
            />
            <div className="absolute bottom-0 right-0 z-20 inset-0 flex items-end text-white w-full">
              <div className="max-h-[30%] flex justify-between items-center p-1 lg:p-2 bg-gradient-to-t from-black to-transparent lg:backdrop-blur-md w-full">
                <h2 className="font-medium lg:font-semibold truncate text-sm">
                {res?.title_short}
              </h2>
              <button
                className="bg-white hover:bg-white/80 text-black rounded-full p-1.5 active:scale-75 transition-all duration-200"
                onClick={() => handlePlay(res)}
              >
                <Play size={16} />
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroller;
