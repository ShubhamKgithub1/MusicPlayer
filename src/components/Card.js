import { useState } from "react";
import FallbackLoader from "./FallbackLoader";
import { Play } from "lucide-react";

const Card = ({ onPlay, track }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div
      key={track?.id}
      className="flex-[0_0_35%] sm:flex-[0_0_25%] md:flex-[0_0_20%] xl:flex-[0_0_13%] relative group hover:z-50 snap-start rounded-lg shadow-md cursor-pointer transition-all duration-200 animate-fade-in aspect-square"
      onClick={() => onPlay(track)}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-[1.04]">
        {!imageLoaded && (
          <div className="absolute inset-0 z-30">
            <FallbackLoader />
          </div>
        )}
        <img
          src={track?.album?.cover_medium}
          alt="cover"
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover relative z-10"
        />
        <div className="absolute inset-0 z-20 flex items-end text-white bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="w-full flex justify-between items-center p-1 lg:p-2">
            <h2 className="font-semibold truncate text-sm md:text-base">
              {track?.title_short}
            </h2>

            <button
              className="bg-white opacity-0 group-hover:opacity-100 hover:bg-white/90 text-black rounded-full p-1.5 active:scale-90 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onPlay(track);
              }}
            >
              <Play size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
