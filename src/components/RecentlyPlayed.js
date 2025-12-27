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
          ? "h-full overflow-auto rounded-tl-none border-t-0 bg-white/20 dark:bg-black/60 lg:dark:bg-transparent"
          : "h-auto overflow-auto px-2 lg:px-0"
      }`}
    >
      {!isFullTab && <div className={`flex justify-between items-center lg:px-3 py-2 lg:py-3`}>
        <h2
          className={`text-base font-semibold dark:text-white`}
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
      </div>}
      {recentSongs?.length > 0 ? (
        <div
          className={`flex flex-col overflow-auto hide-scrollbar relative ${isFullTab && "px-2 py-2 lg:px-0 lg:py-3"} animate-fade-in`}
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
