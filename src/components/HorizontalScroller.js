import { useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  setCurrentSongIndex,
  playPause,
  setQueue,
} from "../reduxStore/playerSlice";
import { useEffect, useRef, useState } from "react";
import SongCard from "./SongCard";

const HorizontalScroller = ({ data, favorites, cardSize }) => {
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();
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
    scrollContainerRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 400, behavior: "smooth" });
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

    return () => {
      container.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!data) return null;

  return (
    <div className={`relative p-2 lg:px-4 lg:py-0 rounded-lg`}>
      {canScrollLeft && (
        <div
          onClick={scrollLeft}
          className="absolute z-[99] bg-white left-0 flex justify-center items-center top-1/2 -translate-y-1/2 overflow-hidden p-1.5 xl:p-2 cursor-pointer rounded-full hover:scale-[1.04] active:scale-[0.82] transition-transform duration-300"
        >
          <ChevronLeft className="text-black" size={22} />
        </div>
      )}
      {canScrollRight && (
        <div
          onClick={scrollRight}
          className="absolute right-0 flex justify-center items-center top-1/2 -translate-y-1/2 z-[99] p-1.5 xl:p-2 overflow-hidden cursor-pointer rounded-full bg-white hover:scale-[1.04] active:scale-[0.82] transition-transform duration-300"
        >
          <ChevronRight className="text-black" size={22} />
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className="w-full py-2 lg:py-4 flex overflow-x-scroll flex-shrink-0 gap-3 lg:gap-4 hide-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {data.map((track) => (
          <SongCard key={track?.id} track={track} onPlay={handlePlay} isFavorite={favorites?.some((fav)=> fav.id === track.id)} flex={cardSize}/>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroller;
