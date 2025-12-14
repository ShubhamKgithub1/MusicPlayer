import BannerCard from "./BannerCard";
import SongTile from "./SongTile";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setQueue } from "../reduxStore/playerSlice";
import FallbackLoader from "./FallbackLoader";
import HorizontalScroller from "./HorizontalScroller";
import { useCallback } from "react";

const Home = () => {
  const favorites = useSelector((state) => state.user.favorites);
  const isLoaded = useSelector((state) => state.api.loaded);
  const popular = useSelector((state) => state.api.mostPopular);
   const hits = useSelector((state) => state.api.hits);
  const trendingTracks = useSelector((state) => state.api.trendingTracks);
  const topTracks = useSelector((state) => state.api.topTracks);

  const dispatch = useDispatch();
  const handlePlay = useCallback(() => {
    dispatch(setQueue(trendingTracks));
    dispatch(playPause(true));
  }, [dispatch, trendingTracks]);

  if (!isLoaded) {
    return <FallbackLoader />;
  }

  return (
    <div className="flex flex-col md:flex-row md:h-full md:gap-3 xl:gap-4 w-full overflow-y-auto backdrop-blur-xl md:backdrop-blur-none md:p-1 lg:p-0 transition-all duration-200 text-white">
      <div className="flex flex-col md:w-[40%] p-2 md:p-3 xl:p-4 md:border md:border-white/10 md:bg-white/20 md:dark:bg-black/30 backdrop-blur-xl rounded-md md:rounded-xl animate-fade-in">
        <BannerCard track={trendingTracks[0]} handleClick={handlePlay} />
        <div className="flex-1 min-h-0 w-full flex flex-col">
          <h1 className="font-bold text-lg md:text-xl 2xl:text-2xl py-4 p-2 text-glow">
            Trending Now
          </h1>
          <div className="flex flex-col gap-1 overflow-auto hide-scrollbar w-full relative z-0">
            {trendingTracks.map((track) => (
              <SongTile
                key={track?.id}
                track={track}
                trackList={trendingTracks}
                isFavorite={favorites?.some((fav) => fav.id === track.id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="md:flex-1 md:overflow-hidden backdrop-blur-xl md:dark:bg-black/30 md:border md:border-white/10 p-2 md:bg-white/20 md:rounded-xl h-full w-full flex flex-col transition-all duration-200">
        <div className="">
          <HorizontalScroller
            data={topTracks}
            favorites={favorites}
            cardSize={"flex-[0_0_35%] md:flex-[0_0_20%]"}
          />
        </div>
        <div className="md:overflow-hidden flex flex-col md:flex-row gap-2 flex-1">
          <div className="md:w-1/2 flex flex-col overflow-scroll hide-scrollbar animate-fade-in">
            <h1 className="text-lg font-bold p-[0_0_8px_8px] lg:p-2 text-glow">
              Most Popular
            </h1>
            <div className="flex flex-col md:h-auto w-full gap-1 overflow-auto hide-scrollbar relative z-0">
              {popular.map((track) => (
                <SongTile
                  key={track?.id}
                  trackList={popular}
                  track={track}
                  isFavorite={favorites?.some((fav) => fav.id === track.id)}
                />
              ))}
            </div>
          </div>
          <div className="md:flex-1 md:min-w-0 flex flex-col animate-fade-in overflow-hidden">
            <h1 className="text-lg font-bold p-[0_0_8px_8px] lg:p-2 text-glow">
              Weekly Hits
            </h1>
            <div className="flex flex-col w-full gap-1 md:h-auto overflow-auto hide-scrollbar relative z-0">
              {hits.map((track) => (
                <SongTile
                  key={track?.id}
                  track={track}
                  trackList={hits}
                  isFavorite={favorites?.some((fav) => fav.id === track.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
