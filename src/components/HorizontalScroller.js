import { Play } from "lucide-react";
import { useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  setCurrentSongIndex,
  playPause,
  setQueue,
} from "../reduxStore/playerSlice";
import { useEffect, useRef, useState } from "react";
import FallbackLoader from "./FallbackLoader";

const HorizontalScroller = ({data}) => {
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(false);


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
    scrollContainerRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  useEffect(() => {
  const container = scrollContainerRef.current;

  const update = () => {
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  update();
  container.addEventListener("scroll", update);
  window.addEventListener("resize", update);

  return () => {container.removeEventListener("scroll", update);
   window.removeEventListener("resize", update);}
}, []);




  if (!data) return null;

  return (
    <div className="relative p-2 lg:px-4 lg:py-0 rounded-lg">
     {canScrollLeft && <div
        onClick={scrollLeft}
        className="absolute z-[99] bg-white left-0 flex justify-center items-center top-1/2 -translate-y-1/2 overflow-hidden p-1.5 xl:p-2 cursor-pointer rounded-full hover:scale-[1.04] active:scale-[0.82] transition-all duration-200"
      >
        <ChevronLeft className="text-black" size={22} />
      </div>}
      {canScrollRight && <div
        onClick={scrollRight}
        className="absolute right-0 flex justify-center items-center top-1/2 -translate-y-1/2 z-[99] p-1.5 xl:p-2 overflow-hidden cursor-pointer rounded-full bg-white hover:scale-[1.04] active:scale-[0.82] transition-all duration-200"
      >
        <ChevronRight className="text-black" size={22} />
      </div>}
      <div
        ref={scrollContainerRef}
        className="w-full py-2 lg:py-4 flex overflow-x-scroll flex-shrink-0 gap-3 lg:gap-4 hide-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {data.map((res) => (
          <div
            key={res?.id}
            className="flex-[0_0_35%] sm:flex-[0_0_25%] md:flex-[0_0_20%] xl:flex-[0_0_13%] relative group hover:z-50 snap-start rounded-lg shadow-md cursor-pointer transition-all duration-200 animate-fade-in aspect-square"
            onClick={() => handlePlay(res)}
          >
          <div className="relative w-full h-full rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-[1.04]">
      
      {/* LOADER */}
      {!imageLoaded && (
        <div className="absolute inset-0 z-30">
          <FallbackLoader />
        </div>
      )}

      {/* IMAGE */}
      <img
        src={res?.album?.cover_medium}
        alt="cover"
        onLoad={() => setImageLoaded(true)}
        className="w-full h-full object-cover relative z-10"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 z-20 flex items-end text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        <div className="w-full flex justify-between items-center p-1 lg:p-2">
          <h2 className="font-semibold truncate text-sm md:text-base">{res?.title_short}</h2>

          <button
            className="bg-white opacity-0 group-hover:opacity-100 hover:bg-white/90 text-black rounded-full p-1.5 active:scale-90 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handlePlay(res);
            }}
          >
            <Play size={16} />
          </button>
        </div>
      </div>

    </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroller;
