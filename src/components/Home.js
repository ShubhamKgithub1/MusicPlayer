import BannerCard from "./BannerCard";
import SongTile from "./SongTile";
import { useSelector } from "react-redux";
import FallbackLoader from "./FallbackLoader";
import HorizontalScroller from "./HorizontalScroller";

const Home = () => {
  const favorites = useSelector((state) => state.user.favorites);
  const isLoaded = useSelector((state) => state.api.loaded);
  const popular = useSelector((state) => state.api.mostPopular);
  const hits = useSelector((state) => state.api.hits);

  if (!isLoaded) {
    return (
      <FallbackLoader/>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:h-full md:gap-3 xl:gap-4 w-full overflow-y-auto backdrop-blur-lg md:backdrop-blur-none p-1 lg:p-0 transition-all duration-200 text-white">
      <div className="flex flex-col md:w-[40%] gap-0 p-2 md:p-3 xl:p-4 md:border md:border-white/10 md:bg-white/20 md:dark:bg-black/30 backdrop-blur-lg rounded-md md:rounded-xl animate-fade-in">
        <BannerCard topTracks={hits}/>
        <div className="flex-1 min-h-0 w-full flex flex-col">
          <h1 className="font-bold text-lg md:text-xl 2xl:text-2xl p-3 sm:py-4 sm:px-2 text-glow">
            {hits[0]?.artist?.name} Songs
          </h1>
          <div className="flex flex-col gap-1 rounded-lg overflow-auto hide-scrollbar w-full relative z-0">
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
      <div className="md:flex-1 md:overflow-hidden gap-2 md:gap-4 h-full w-full flex flex-col px-0 transition-all duration-200">
        <HorizontalScroller data={popular} favorites={favorites}/>
        <div className="md:overflow-hidden flex flex-col gap-2 md:flex-row md:gap-3 xl:gap-4 flex-1">
          <div className="md:w-1/2 flex flex-col backdrop-blur-lg shadow-black/40 shadow-inner dark:bg-black/30 p-2 rounded-lg border border-white/10 md:shadow-none md:bg-white/20 md:rounded-xl hide-scrollbar animate-fade-in">
            <h1 className="text-lg font-bold p-3 pt-1 text-glow">Most Popular</h1>
            <div className="flex flex-col md:h-auto w-full gap-1 overflow-auto hide-scrollbar relative z-0 rounded-lg md:rounded-none">
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
          <div className="md:flex-1 md:min-w-0 flex flex-col shadow-black/40 shadow-inner md:shadow-none p-2 dark:bg-black/30 backdrop-blur-lg md:bg-white/20 md:rounded-xl animate-fade-in rounded-lg overflow-hidden border border-white/10">
            <h1 className="text-lg font-bold p-3 pt-1 text-glow">Weekly Hits</h1>
            <div className="flex flex-col w-full gap-1 rounded-lg md:rounded-none md:h-auto overflow-auto hide-scrollbar relative z-0 p-2 md:p-0">
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
