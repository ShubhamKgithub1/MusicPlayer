import { useSelector } from "react-redux";
import SongTile from "./SongTile";

const Favorites = () => {
  const favorites = useSelector((state) => state.user.favorites);
  if (!favorites) return;
  return (
    <div className="flex flex-col h-full text-white overflow-auto bg-white/20 dark:bg-black/60 lg:dark:bg-transparent rounded-lg lg:bg-transparent">
      {favorites.length > 0 ? (
        <div className="overflow-auto hide-scrollbar flex flex-col gap-1 px-2 py-2 lg:px-0 lg:py-3 lg:bg-transparent rounded-md animate-fade-in snap-mandatory snap-y scroll-smooth">
          {favorites.map((song) => (
            <SongTile
              key={song?.id}
              track={song}
              trackList={favorites}
              isFavorite={favorites?.some((fav) => fav.id === song.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-sm xl:text-base dark:text-white p-2 xl:p-4 font-medium xl:font-semibold">
          No favorites songs yet.
        </p>
      )}
    </div>
  );
};

export default Favorites;
