import {
  playPause,
  setQueue,
  setCurrentSongIndex,
  addToQueue,
} from "../reduxStore/playerSlice";
import { FolderPlus, Heart, ListPlus, Trash2 } from "lucide-react";
import {
  addRecentlyPlayed,
  addToFavorites,
  removeFromFavorites,
} from "../services/userService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { openAddToPlaylistModal } from "../reduxStore/modalSlice";
import KebabMenu from "./KebabMenu";

const SongTile = ({ trackList, track, isFavorite }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const handlePlay = (track) => {
    dispatch(setQueue(trackList));
    const index = trackList.findIndex((t) => t.id === track.id);

    if (index !== -1) {
      dispatch(setCurrentSongIndex(index));
      dispatch(playPause(true));
      if (!user) return;
      addRecentlyPlayed(user.uid, track);
    }
  };

  const handleAddToQueue = (track) => {
    dispatch(addToQueue(track));
    dispatch(playPause(true));
    toast.success("Song added to queue..");
  };

  const handleAddToFavorites = async (track) => {
    if (!user) return;

    if (isFavorite) {
      await removeFromFavorites(user.uid, track.id, dispatch);
    } else {
      await addToFavorites(user.uid, track, dispatch);
    }
  };

  if (!track) return null;

  return (
    <div
      key={track?.id}
      className="relative z-10 group flex gap-2 items-center justify-between rounded-lg px-2 py-1.5 lg:px-4 lg:py-2 cursor-pointer text-white"
      onClick={() => handlePlay(track)}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none transition-opacity duration-300"></div>
      <div className="flex justify-start overflow-hidden gap-3 items-center flex-1">
        <img
          src={track?.album?.cover_small}
          alt={track?.title}
          className="w-12 h-12 md:h-10 md:w-10 xl:h-12 xl:w-12 object-cover rounded-full"
        />
        <div className="truncate">
          <h2 className="text-sm font-medium truncate text-glow">
            {track?.title_short}
          </h2>
          <p className="text-xs dark:text-gray-400 text-gray-600">
            {track?.artist?.name}
          </p>
        </div>
      </div>
        <div>
          <KebabMenu
            actions={[
              {
                label: "Add to queue",
                icon: ListPlus,
                onClick: () => handleAddToQueue(track),
              },
              {
                label: "Add to playlist",
                icon: FolderPlus,
                onClick: () => dispatch(openAddToPlaylistModal(track)),
              },
              {
                label: isFavorite
                  ? "Remove from Favorites"
                  : "Add to Favorites",
                icon: isFavorite ? Trash2 : Heart,
                className: isFavorite ? "text-red-600" : "",
                onClick: () => handleAddToFavorites(track),
              },
            ]}
            user={user}
          />
        </div>
    </div>
  );
};

export default SongTile;
