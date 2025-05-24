import { useDispatch } from "react-redux";
import { setCurrentSong, playPause, setQueue, setCurrentSongIndex } from "../reduxStore/playerSlice";
export const SongTile = ({ trackList }) => {
  const dispatch = useDispatch();

  const handlePlay = (track) => {
    // dispatch(setCurrentSong({ ...track }));
    dispatch(setQueue(trackList));
    const index = trackList.findIndex((t) => t.id === track.id);

    // Update current song index and play
    if (index !== -1) {
      dispatch(setCurrentSongIndex(index));
      dispatch(playPause(true));
    }
    // dispatch(playPause(true));
  };
  if (!trackList) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 w-full text-white">
      {trackList.map((track) => (
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
