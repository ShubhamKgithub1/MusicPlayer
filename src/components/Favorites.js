import { useSelector } from "react-redux";
import SongTile from "./SongTile";

const Favorites = () => {
  const favorites = useSelector((state) => state.user.favorites);
  if (!favorites) return;
  return (
    <div className="flex flex-col h-full text-white animate-fade-in overflow-auto border-t-0 bg-white/20 dark:bg-black/80 sm:dark:bg-transparent sm:border-none rounded-lg border border-white/10 backdrop-blur-lg sm:backdrop-blur-none sm:bg-transparent">
      <h1 className="text-lg sm:text-xl font-semibold sm:font-bold p-3 sm:p-4 text-glow">Your Favorites</h1>
      <div className="overflow-auto hide-scrollbar flex flex-col gap-1 sm:bg-transparent dark:bg-transparent sm:dark:bg-black/40 p-2 sm:p-0 sm:dark:p-3 rounded-md">
        {favorites.map((song) => (
          <SongTile
            key={song?.id}
            track={song}
            trackList={favorites}
            isFavorite={favorites?.some((fav) => fav.id === song.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
