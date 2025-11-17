import {
  playPause,
  setQueue,
  setCurrentSongIndex,
  addToQueue,
} from "../reduxStore/playerSlice";
import {
  ListPlus,
  MoreVertical,
  Heart,
  FolderPlus,
  Trash2,
} from "lucide-react";
import {
  addRecentlyPlayed,
  addToFavorites,
  removeFromFavorites,
} from "../services/userService"; // Assumed imported
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { openAddToPlaylistModal } from "../reduxStore/modalSlice";

const SongTile = ({ trackList, track, isFavorite }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
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

  const handleAddToQueue = (e, track) => {
    e.stopPropagation();
    dispatch(addToQueue(track));
    dispatch(playPause(true));
    setShowMenu(false);
    toast.success("Song added to queue..");
  };

  const handleAddToFavorites = async (e, track) => {
    e.stopPropagation();
    if (!user) return;

    if (isFavorite) {
      await removeFromFavorites(user.uid, track.id, dispatch);
    } else {
      await addToFavorites(user.uid, track, dispatch);
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!track) return null;

  return (
    <div
      key={track.id}
      className="relative z-0 hover:shadow-[inset_2px_3px_6px_gray] dark:hover:shadow-[inset_-2px_-3px_6px_black,inset_2px_3px_6px_black] dark:bg-white/5 dark:hover:bg-white/10 hover:bg-white/15 flex gap-2 items-center justify-between rounded-lg px-4 py-2  transition-all duration-200 cursor-pointer text-white animate-fade-in"
      onClick={() => handlePlay(track)}
    >
      <div className="flex justify-start overflow-hidden gap-3 items-center flex-1">
        <img
          src={track.album.cover_small}
          alt={track.title}
          className="w-12 h-12 md:h-10 md:w-10 xl:h-12 xl:w-12 object-cover rounded-full"
        />
        <div className="truncate">
          <h2 className="text-sm font-medium truncate text-glow">
            {track.title_short}
          </h2>
          <p className="text-xs dark:text-gray-400 text-gray-600">
            {track.artist.name}
          </p>
        </div>
      </div>

      {/* Kebab Menu Button */}
      {user ? (
        <div className="relative z-50" ref={menuRef}>
          <div className="flex items-center gap-1">
            <button
              className={`p-2 rounded-full hover:shadow-[inset_0_2px_4px_black] active:scale-[0.90] hover:bg-white/10 transition-all duration-200 ${
                isFavorite ? "text-red-500" : ""
              } `}
              onClick={(e) => handleAddToFavorites(e, track)}
            >
              {isFavorite ? (
                <Trash2 size={18} />
              ) : (
                <Heart className="" size={20} />
              )}
            </button>
            <button
              className={`p-2 rounded-full hover:shadow-[inset_0_2px_3px_black] focus:shadow-[inset_0_3px_4px_black] hover:bg-white/5 transition-all duration-200`}
              onClick={toggleMenu}
            >
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <div
              className="absolute flex items-center right-0 gap-1.5 top-[80%] text-black z-[99]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="p-2 bg-white hover:shadow-[inset_0_2px_4px_black] rounded-full transition-all duration-200"
                onClick={(e) => handleAddToQueue(e, track)}
              >
                <ListPlus size={18} />
              </button>
              <button
                className="p-2 bg-white hover:shadow-[inset_0_2px_4px_black] rounded-full transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(openAddToPlaylistModal(track));
                  setShowMenu(false);
                }}
              >
                <FolderPlus size={18} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          className="p-2 text-white hover:shadow-[inset_0_2px_4px_black] hover:bg-white/5 rounded-full transition-all duration-200 active:scale-90"
          onClick={(e) => handleAddToQueue(e, track)}
        >
          <ListPlus size={18} />
        </button>
      )}
    </div>
  );
};

export default SongTile;
