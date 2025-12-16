import SongTile from "./SongTile";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const RecentlyPlayed = ({ isFullTab, recentSongs }) => {
  const favorites = useSelector((state) => state.user.favorites);
  const viewAll=(!isFullTab && recentSongs?.length > 0);

  return (
    <div
      className={`flex flex-col relative lg:border-none rounded-lg border border-white/10 lg:bg-transparent ${
        isFullTab
          ? "h-full overflow-auto rounded-tl-none border-t-0 bg-white/20 dark:bg-black/60 lg:dark:bg-transparent p-3 pt-0"
          : "h-auto overflow-auto px-2 lg:px-0"
      }`}
    >
      <div className={`flex justify-between items-center ${isFullTab?"py-4 pt-3 lg:pt-4":"lg:px-3 py-2 lg:py-3"} `}>
        <h2
          className={`${
            isFullTab ? "text-lg 2xl:text-xl font-semibold 2xl:font-bold text-glow" : "text-base font-semibold"
          } dark:text-white`}
        >
          Recently Played
        </h2>
        {viewAll && (
          <NavLink
            to="library"
            className={({ isActive }) =>
              `${isActive ? "dark:text-white text-gray-600" : "dark:text-gray-300 text-gray-500"} hidden lg:block`
            }
          >
            <button className="text-sm cursor-pointer transition-colors duration-200">
              View all
            </button>
          </NavLink>
        )}
      </div>
      {recentSongs?.length > 0 ? (
        <div
          className={`flex flex-col ${
            isFullTab ? "overflow-auto hide-scrollbar gap-1 lg:dark:bg-black/40 rounded-lg lg:dark:p-3" : "overflow-auto hide-scrollbar gap-1"
          }  relative animate-fade-in`}
        >
          {(isFullTab ? recentSongs : recentSongs?.slice(0, 5))?.map((song) => (
            <SongTile
              key={song?.id}
              track={song}
              trackList={recentSongs}
              isFavorite={favorites?.some((fav) => fav.id === song.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-white text-sm xl:text-base p-2 xl:p-4 font-medium xl:font-semibold animate-fade-in">No recent activity found.</p>
      )}
    </div>
  );
};

export default RecentlyPlayed;
