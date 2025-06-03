import { useSelector } from "react-redux";
import SongTile from "./SongTile";

const Favorites = () => {
  const favorites = useSelector((state) => state.user.favorites);
  if (!favorites) return;
  return (
    <div className="flex flex-col h-full text-white animate-fade-in rounded-3xl overflow-auto">
      <h1 className="text-xl font-bold p-4">Your Favorites</h1>
      <div className="overflow-auto hide-scrollbar flex flex-col gap-1">
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
