import SongTile from "./SongTile";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const RecentlyPlayed = ({ isFullTab }) => {
  const favorites = useSelector((state) => state.user.favorites);
  const recentSongs = useSelector((state) => state.user.recentlyPlayed);


  return (
    <div
      className={`flex flex-col relative animate-fade-in ${
        isFullTab
          ? "h-full overflow-auto "
          : "h-auto overflow-auto "
      }`}
    >
      <div className="flex justify-between items-center p-3 sm:p-4">
        <h2
          className={`${
            isFullTab ? "text-lg sm:text-xl font-semibold sm:font-bold" : "text-base font-semibold"
          } text-white dark:text-textPrimary`}
        >
          Recently Played
        </h2>
        {!isFullTab && (
          <NavLink
            to="library"
            className={({ isActive }) =>
              `${isActive ? "text-white " : "text-gray-300 dark:text-textMuted"}`
            }
          >
            <button className="cursor-pointer transition-all duration-300 hover:text-white">
              View all
            </button>
          </NavLink>
        )}
      </div>
      {recentSongs.length > 0 ? (
        <div
          className={`flex flex-col ${
            isFullTab ? "overflow-auto hide-scrollbar gap-1 bg-white/10 sm:bg-transparent dark:bg-black/40 rounded-lg sm:p-0 sm:dark:p-3" : "overflow-hidden gap-1 dark:px-3"
          }  relative animate-fade-in p-2`}
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
        <p className="text-white text-sm px-6 animate-fade-in">No recently played songs yet.</p>
      )}
      {/* {isFullTab && (
        <div className="absolute bottom-0 z-20 bg-gradient-to-t from-white/50 h-2 w-full" />
      )} */}
    </div>
  );
};

export default RecentlyPlayed;
