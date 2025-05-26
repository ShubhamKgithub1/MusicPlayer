import { useDispatch } from "react-redux";
import {
  playPause,
  setQueue,
  setCurrentSongIndex,
  addToQueue,
} from "../reduxStore/playerSlice";
import { Play } from "lucide-react";

const SongTile = ({ trackList }) => {
  const dispatch = useDispatch();

  const handlePlay = (track) => {
    // dispatch(setCurrentSong({ ...track }));
    dispatch(setQueue(trackList));
    const index = trackList.findIndex((t) => t.id === track.id);

    if (index !== -1) {
      dispatch(setCurrentSongIndex(index));
      dispatch(playPause(true));
    }
    // dispatch(playPause(true));
  };

  if (!trackList) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-full text-white">
      {trackList.map((track) => (
        <div
          key={track.id}
          className="relative z-10 snap-start flex items-center justify-center gap-4 rounded-lg p-1 shadow-sm transition-all duration-200 cursor-pointer group"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

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
          <div className="flex gap-2 justify-center items-center ml-auto">
            <button
              onClick={() => handlePlay(track)}
              className="flex justify-center items-center size-10 transition-all duration-300 rounded-full p-2 active:bg-gray-500 active:scale-75 shadow-lg "
            >
              <Play size={16} />
            </button>
            <button
              onClick={() => {dispatch(addToQueue(track))
                dispatch(playPause(true))
              }}
              className="transition-all duration-300 size-10 rounded-full p-2 shadow-xl active:bg-gray-500 hover:shadow-md active:scale-75"
            >
              Q
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongTile;
