import { useSelector } from "react-redux";
import SongTile from "./SongTile";

const Favorites = () => {
  const favorites = useSelector((state) => state.user.favorites);
  if (!favorites) return;
  return (
    <div className="flex flex-col h-full text-white overflow-auto border-t-0 bg-white/20 dark:bg-black/60 lg:dark:bg-transparent p-3 pt-0 lg:border-none rounded-lg border border-white/10 backdrop-blur-lg lg:backdrop-blur-none lg:bg-transparent">
      <h1 className="text-lg lg:text-xl font-semibold lg:font-bold py-3 lg:py-4 text-glow animate-fade-in">
        Your Favorites
      </h1>
      {favorites.length > 0 ? (
        <div className="overflow-auto hide-scrollbar flex flex-col gap-1 lg:bg-transparent dark:bg-transparent lg:dark:p-3 lg:dark:bg-black/40 rounded-md animate-fade-in">
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
        <p className="text-gray-600 text-sm lg:text-base dark:text-white p-2 lg:p-4 font-medium lg:font-semibold animate-fade-in">
          No favorites songs yet.
        </p>
      )}
    </div>
  );
};

export default Favorites;
