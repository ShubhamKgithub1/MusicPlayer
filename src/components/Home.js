import BannerCard from "./BannerCard";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setQueue } from "../reduxStore/playerSlice";
import FallbackLoader from "./FallbackLoader";
import HorizontalScroller from "./HorizontalScroller";
import { useCallback } from "react";
import VirtualSongList from "./VirtualSongList";

const Home = () => {
  const favorites = useSelector((state) => state.user.favorites);
  const isLoaded = useSelector((state) => state.api.loaded);
  const popular = useSelector((state) => state.api.mostPopular);
  const hits = useSelector((state) => state.api.hits);
  const trendingTracks = useSelector((state) => state.api.trendingTracks);
  const topTracks = useSelector((state) => state.api.topTracks);
  const bannerData = trendingTracks[0] ?? null;

  const dispatch = useDispatch();
  const handlePlay = useCallback(() => {
    dispatch(setQueue(trendingTracks));
    dispatch(playPause(true));
  }, [dispatch, trendingTracks]);

  if (!isLoaded) {
    return <FallbackLoader />;
  }

  return (
    <div className="flex flex-col  md:flex-row md:h-full w-full overflow-y-auto backdrop-blur-lg bg-white/20 dark:bg-black/5 lg:dark:bg-black/35 gap-3 xl:gap-4 p-2 md:p-3 xl:p-4 lg:rounded-xl 2xl:rounded-2xl lg:border lg:border-white/5 transition-all duration-200 text-white">
      <div className="flex flex-col md:w-[40%] animate-fade-in">
        {bannerData && <BannerCard track={bannerData} handleClick={handlePlay} />}
        <div className="flex-1 min-h-0 w-full flex flex-col">
          <h1 className="font-bold text-lg md:text-xl lg:py-4 p-2 text-glow">
            Trending Now
          </h1>
          <div className="flex flex-col overflow-auto hide-scrollbar w-full h-[70dvh] md:h-auto">
            <VirtualSongList
              data={trendingTracks}
              favorites={favorites}
            />
          </div>
        </div>
      </div>
      <div className="md:flex-1 md:overflow-hidden h-full w-full flex flex-col gap-3 transition-all duration-200">
        {topTracks && <div className="px-2"><HorizontalScroller
          data={topTracks}
          favorites={favorites}
          cardSize={"flex-[0_0_35%] md:flex-[0_0_20%]"}
        /></div>}
        <div className="md:overflow-hidden flex flex-col md:flex-row gap-2 flex-1">
          <div className="md:w-1/2 flex flex-col animate-fade-in">
            <h1 className="text-lg font-bold p-[0_0_8px_8px] lg:p-2 text-glow">
              Most Popular
            </h1>
            <div className="flex flex-col h-[80dvh] md:h-auto w-full gap-1 overflow-auto hide-scrollbar">
              <VirtualSongList
              data={popular}
              favorites={favorites}
            />
            </div>
          </div>
          <div className="md:flex-1 flex flex-col animate-fade-in">
            <h1 className="text-lg font-bold p-[0_0_8px_8px] lg:p-2 text-glow">
              Weekly Hits
            </h1>
            <div className="flex flex-col w-full h-[80dvh] md:h-auto overflow-auto hide-scrollbar">
              <VirtualSongList
              data={hits}
              favorites={favorites}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
