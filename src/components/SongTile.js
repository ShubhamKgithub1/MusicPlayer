import { useDispatch } from "react-redux";
import { setCurrentSong, playPause } from "../reduxStore/playerSlice";
export const SongTile = ({ song }) => {
  const dispatch = useDispatch();

  const handlePlay = (song) => {
    dispatch(setCurrentSong({ ...song }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col gap-2 w-full text-white">
      {song.map((track) => (
        <div
          key={track.id}
          onClick={() => handlePlay(track)}
          className="flex items-center gap-4 rounded-lg py-2 shadow-sm hover:bg-white/40 transition-all duration-200 cursor-pointer"
        >
          <img
            src={track.album.cover_small}
            alt={track.title}
            className="w-12 h-12 object-cover rounded-full"
          />
          <div>
            <h2 className="text-sm font-medium truncate">
              {track.title_short}
            </h2>
            <p className="text-xs text-gray-500">{track.artist.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
