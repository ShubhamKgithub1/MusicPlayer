import BannerCard from "./BannerCard";
import { ArtistTitleCard } from "./ArtistTitleCard";
import SongTile from "./SongTile";
import { useSelector } from "react-redux";

const Home = () => {
  const favorites = useSelector((state) => state.user.favorites);
  const isLoaded = useSelector((state) => state.api.loaded);
  const popular = useSelector((state) => state.api.mostPopular);
  const hits = useSelector((state) => state.api.hits);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full text-white px-4 sm:px-0">
        <div className="flex items-end justify-center gap-[3px] h-16 sm:gap-2 sm:h-20">
          <div className="w-[3px] sm:w-1 h-4 sm:h-5 bg-white animate-[bounce_0.6s_infinite] origin-bottom" />
          <div className="w-[3px] sm:w-1 h-6 sm:h-7 bg-white animate-[bounce_0.6s_infinite_0.1s] origin-bottom" />
          <div className="w-[3px] sm:w-1 h-8 sm:h-9 bg-white animate-[bounce_0.6s_infinite_0.2s] origin-bottom" />
          <div className="w-[3px] sm:w-1 h-6 sm:h-7 bg-white animate-[bounce_0.6s_infinite_0.3s] origin-bottom" />
          <div className="w-[3px] sm:w-1 h-4 sm:h-5 bg-white animate-[bounce_0.6s_infinite_0.4s] origin-bottom" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:h-full sm:gap-4 sm:dark:gap-0 w-full text-white sm:dark:text-textPrimary overflow-y-auto sm:dark:bg-black/40 p-2 rounded-3xl transition-all duration-300">
      <div className="flex flex-col sm:w-[40%] gap-0 h-[80dvh] sm:h-full px-2 sm:p-4 sm:dark:p-2 dark:bg-transparent dark:border-none  sm:bg-white/30 backdrop-blur-lg sm:border sm:border-white/20 rounded-3xl animate-fade-in-delay">
        <BannerCard topTracks={hits} />
        <div className="flex-1 min-h-0 w-full flex flex-col">
          <h1 className="font-semibold sm:font-bold text-lg sm:text-2xl p-3 sm:py-4 sm:px-2">
            {hits[0]?.artist?.name} Songs
          </h1>
          <div className="flex flex-col gap-1 h-[80dvh] dark:bg-black/40 sm:dark:bg-transparent bg-white/10 border border-white/10 sm:border-none sm:backdrop-blur-none backdrop-blur-lg sm:bg-transparent rounded-xl sm:rounded-none overflow-auto hide-scrollbar w-full relative z-0 p-2 sm:p-0">
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
      <div className="sm:flex-1 sm:overflow-hidden sm:gap-4 h-full w-full flex flex-col px-2 sm:px-0 sm:dark:p-2 transition-all duration-200">
        <ArtistTitleCard prop={hits[0]} />
        <div className="sm:overflow-hidden flex flex-col sm:flex-row sm:gap-4 flex-1">
          <div className="sm:w-1/2 flex flex-col sm:dark:border-none sm:dark:bg-black/30 sm:bg-white/30 sm:backdrop-blur-lg sm:border sm:border-white/20 sm:rounded-3xl hide-scrollbar animate-fade-in sm:p-2">
            <h1 className="text-lg font-medium p-3">Most Popular</h1>
            <div className="flex flex-col bg-white/10 border border-white/10 dark:bg-black/40 sm:dark:bg-transparent sm:border-none sm:bg-transparent backdrop-blur-lg sm:backdrop-blur-none sm:h-auto w-full gap-1 overflow-auto hide-scrollbar relative z-0 rounded-xl p-2 sm:p-0">
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
          <div className="sm:flex-1 sm:min-w-0 flex flex-col sm:dark:border-none sm:dark:bg-black/40 sm:bg-white/30 sm:backdrop-blur-lg sm:border sm:border-white/20 sm:rounded-3xl animate-fade-in sm:p-2">
            <h1 className="text-lg font-medium p-3">Weekly Hits</h1>
            <div className="flex flex-col w-full gap-1 border border-white/10 dark:bg-black/30 sm:dark:bg-transparent sm:border-none bg-white/10 rounded-lg sm:rounded-none backdrop-blur-lg sm:bg-transparent sm:backdrop-blur-none sm:h-auto overflow-auto hide-scrollbar relative z-0 p-2 sm:p-0">
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
