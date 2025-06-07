import { getSearch } from "../services/deezerAPI";
import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  setCurrentSongIndex,
  playPause,
  setQueue,
} from "../reduxStore/playerSlice";
import { useRef } from "react";

const HorizontalScroller = ({ tag }) => {
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [result, setResult] = useState();

  const handlePlay = (track) => {
    if (!result) return;
    dispatch(setQueue(result));
    const index = result.findIndex((t) => t.id === track.id);
    if (index !== -1) {
      dispatch(setCurrentSongIndex(index));
      dispatch(playPause(true));
      // console.log("clicked",queue);
    }
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    const Search = async () => {
      const data = await getSearch(tag);
      setResult(data);
      // console.log("Result for", tag, data);
    };
    Search();
    // console.log("Result for", tag, result);
  }, [tag]);

  if (!result) return null;

  return (
    <div className="relative overflow-hidden animate-fade-in px-4">
      <div
        onClick={scrollLeft}
        className="absolute bg-white left-0 flex justify-center items-center z-20 top-1/2 -translate-y-1/2 overflow-hidden p-2 cursor-pointer rounded-full"
      >
        <ChevronLeft className="text-black" size={26} />
      </div>
      <div
        onClick={scrollRight}
        className="absolute right-0 flex justify-center items-center top-1/2 -translate-y-1/2 z-20 p-2 overflow-hidden cursor-pointer rounded-full bg-white"
      >
        <ChevronRight className="text-black" size={26} />
      </div>
      <div
        ref={scrollContainerRef}
        className="w-full flex overflow-x-scroll flex-shrink-0 gap-4 hide-scrollbar snap-x snap-mandatory scroll-smooth px-4"
      >
        {result.map((res) => (
          <div
            key={res?.id}
            className="flex-[0_0_13%] flex snap-start rounded-3xl shadow-md relative overflow-hidden"
          >
            <img
              src={res?.album?.cover_medium}
              alt="cover"
              className="object-cover relative"
            />
            <div className="max-h-[25%] flex justify-between items-center px-2 py-1 text-white bg-white/20 w-full backdrop-blur-md absolute bottom-0 left-0 z-10">
              <h2 className="font-semibold truncate text-sm">
                {res?.title_short}
              </h2>
              <button
                className="border border-white/20 bg-white text-black flex justify-center items-center rounded-full p-2 hover:bg-transparent hover:text-white active:scale-75 hover:scale-[1.04] transition-all duration-300"
                onClick={() => handlePlay(res)}
              >
                <Play size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroller;
