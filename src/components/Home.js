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
        <div className="flex items-end justify-center gap-[3px] sm:gap-3">
          <div className="w-[3px] sm:w-1.5 h-4 sm:h-7 bg-white dark:bg-cyan-300 dark:shadow-md dark:shadow-cyan-400 bggradient-to-b from-purple-500 to-orange-400 animate-[bounce_0.6s_infinite] origin-bottom" />
          <div className="w-[3px] sm:w-1.5 h-6 sm:h-10 bg-white dark:bg-purple-500 dark:shadow-md dark:shadow-purple-500 bggradient-to-b from-cyan-400 via-purple-500 to-orange-400 animate-[bounce_0.6s_infinite_0.1s] origin-bottom" />
          <div className="w-[3px] sm:w-1.5 h-8 sm:h-14 bg-white dark:bg-yellow-400 dark:shadow-md dark:shadow-orange-600 bggradient-to-b from-cyan-400 via-purple-500 to-orange-400 animate-[bounce_0.6s_infinite_0.2s] origin-bottom" />
          <div className="w-[3px] sm:w-1.5 h-6 sm:h-10 bg-white dark:bg-purple-500 dark:shadow-md dark:shadow-purple-500 bggradient-to-b from-cyan-400 via-purple-500 to-orange-400 animate-[bounce_0.6s_infinite_0.3s] origin-bottom" />
          <div className="w-[3px] sm:w-1.5 h-4 sm:h-7 bg-white dark:bg-cyan-300 dark:shadow-md dark:shadow-cyan-400 bggradient-to-b from-purple-500 to-orange-400 animate-[bounce_0.6s_infinite_0.4s] origin-bottom" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:h-full sm:gap-4 md:dark:gap-0 w-full md:dark:text-textPrimary overflow-y-auto md:dark:bg-black/40 md:dark:backdrop-blur-lg p-2 rounded-3xl transition-all duration-300 text-white">
      <div className="flex flex-col md:w-[40%] gap-0 h-[80dvh] md:h-full shadow-black/40 shadow-inner md:shadow-xl p-2 sm:p-4 md:dark:p-2 md:dark:backdrop-blur-none border border-white/10 md:border-none md:dark:bg-transparent md:bg-white/20 dark:bg-black/20 backdrop-blur-lg md:border md:border-white/20 rounded-md md:rounded-3xl animate-fade-in-delay">
        <BannerCard topTracks={hits} />
        <div className="flex-1 min-h-0 w-full flex flex-col">
          <h1 className="font-semibold sm:font-bold text-lg sm:text-2xl p-3 sm:py-4 sm:px-2 text-glow">
            {hits[0]?.artist?.name} Songs
          </h1>
          <div className="flex flex-col gap-1 h-[80dvh] dark:bg-black/40 md:dark:bg-transparent bg-black/20 shadow-inner md:shadow-none border border-white/10 md:border-none md:backdrop-blur-none backdrop-blur-lg md:bg-transparent rounded-xl md:rounded-none overflow-auto hide-scrollbar w-full relative z-0 p-2 md:p-0">
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
      <div className="md:flex-1 md:overflow-hidden gap-2 md:gap-4 h-full w-full flex flex-col px-0 md:dark:p-2 transition-all duration-300">
        <ArtistTitleCard prop={hits[0]}/>
        <div className="md:overflow-hidden flex flex-col gap-2 md:flex-row md:gap-4 flex-1">
          <div className="md:w-1/2 flex flex-col backdrop-blur-lg shadow-black/40 shadow-inner dark:bg-black/20 p-2 rounded-lg border border-white/10 md:dark:border-none md:shadow-lg md:bg-white/20 md:backdrop-blur-lg md:border md:border-white/20 md:rounded-xl hide-scrollbar animate-fade-in md:p-2">
            <h1 className="text-lg font-bold p-3 pt-1 text-glow">Most Popular</h1>
            <div className="flex flex-col bg-black/10 border border-white/10 dark:bg-black/40 md:dark:bg-transparent md:border-none md:bg-transparent backdrop-blur-lg md:backdrop-blur-none md:h-auto w-full gap-1 overflow-auto hide-scrollbar relative z-0 rounded-xl md:rounded-none p-2 md:p-0">
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
          <div className="md:flex-1 md:min-w-0 flex flex-col shadow-black/40 shadow-inner md:dark:border-none md:shadow-lg p-2 dark:bg-black/20 backdrop-blur-lg md:bg-white/20 md:backdrop-blur-lg md:border md:border-white/20 md:rounded-xl animate-fade-in md:p-2 rounded-lg overflow-hidden border border-white/10">
            <h1 className="text-lg font-bold p-3 text-glow">Weekly Hits</h1>
            <div className="flex flex-col w-full bg-black/20 gap-1 border border-white/10 dark:bg-black/30 md:dark:bg-transparent md:border-none rounded-lg md:rounded-none backdrop-blur-lg md:bg-transparent md:backdrop-blur-none md:h-auto overflow-auto hide-scrollbar relative z-0 p-2 md:p-0">
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
