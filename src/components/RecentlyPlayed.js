import SongTile from "./SongTile";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const RecentlyPlayed = ({ isFullTab }) => {
  const favorites = useSelector((state) => state.user.favorites);
  const recentSongs = useSelector((state) => state.user.recentlyPlayed);
  const viewAll=(!isFullTab && favorites.length >0);


  return (
    <div
      className={`flex flex-col relative animate-fade-in sm:border-none p-3 pt-0 rounded-lg border border-white/10 backdrop-blur-lg sm:backdrop-blur-none sm:bg-transparent ${
        isFullTab
          ? "h-full overflow-auto rounded-tl-none border-t-0 bg-white/30 dark:bg-black/60 sm:dark:bg-transparent"
          : "h-auto overflow-auto px-2 md:px-0"
      }`}
    >
      <div className={`flex justify-between items-center ${isFullTab?"":"md:px-3 "} py-4`}>
        <h2
          className={`${
            isFullTab ? "text-lg sm:text-xl font-semibold sm:font-bold" : " text-base font-semibold"
          } dark:text-white text-glow`}
        >
          Recently Played
        </h2>
        {viewAll && (
          <NavLink
            to="library"
            className={({ isActive }) =>
              `${isActive ? "dark:text-white " : "dark:text-gray-300 text-gray-500"} hidden md:block`
            }
          >
            <button className="cursor-pointer transition-all duration-300 dark:hover:text-white">
              View all
            </button>
          </NavLink>
        )}
      </div>
      {recentSongs.length > 0 ? (
        <div
          className={`flex flex-col ${
            isFullTab ? "overflow-auto hide-scrollbar gap-1 sm:bg-transparent dark:bg-transparent sm:dark:bg-black/40 rounded-lg md:dark:p-3" : "overflow-hidden gap-1 md:dark:px-3"
          }  relative animate-fade-in`}
        >
          {(isFullTab ? recentSongs : recentSongs.slice(0, 5)).map((song) => (
            <SongTile
              key={song?.id}
              track={song}
              trackList={recentSongs}
              isFavorite={favorites?.some((fav) => fav.id === song.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-white text-sm md:text-base p-2 md:p-4 font-medium md:font-semibold animate-fade-in">No recent activity found.</p>
      )}
      {/* {isFullTab && (
        <div className="absolute bottom-0 z-20 bg-gradient-to-t from-white/50 h-2 w-full" />
      )} */}
    </div>
  );
};

export default RecentlyPlayed;
