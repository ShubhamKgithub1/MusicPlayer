import { useSelector } from "react-redux";
import SongTile from "./SongTile";

const Favorites = () => {
  const favorites = useSelector((state) => state.user.favorites);
  if (!favorites) return;
  return (
    <div className="flex flex-col h-full text-white animate-fade-in overflow-auto border-t-0 bg-white/20 dark:bg-black/60 sm:dark:bg-transparent p-3 pt-0 sm:border-none rounded-lg border border-white/10 backdrop-blur-lg sm:backdrop-blur-none sm:bg-transparent">
      <h1 className="text-lg sm:text-xl font-semibold sm:font-bold py-3 sm:py-4 text-glow">
        Your Favorites
      </h1>
      {favorites.length > 0 ? (
        <div className="overflow-auto hide-scrollbar flex flex-col gap-1 sm:bg-transparent dark:bg-transparent sm:dark:p-3 sm:dark:bg-black/40 rounded-md">
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
        <p className="text-gray-600 text-sm md:text-base dark:text-white p-2 md:p-4 font-medium md:font-semibold animate-fade-in">
          No favorites songs yet.
        </p>
      )}
    </div>
  );
};

export default Favorites;
