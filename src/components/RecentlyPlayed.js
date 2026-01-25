import SongTile from "./SongTile";
import { useSelector } from "react-redux";

const RecentlyPlayed = ({ isFullTab, recentSongs }) => {
  const favorites = useSelector((state) => state.user.favorites);

  return (
    <div
      className={`flex flex-col relative overflow-auto rounded-lg lg:bg-transparent ${
        isFullTab
          ? "h-full"
          : "h-auto px-2 lg:px-0"
      }`}
    >
      {recentSongs?.length > 0 ? (
        <div
          className={`flex flex-col overflow-auto hide-scrollbar relative animate-fade-in snap-mandatory snap-y scroll-smooth`}
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
