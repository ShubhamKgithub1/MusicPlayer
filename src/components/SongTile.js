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
      className="relative z-0 snap-start max-w-[inherit] lg:hover:bg-transparent dark:hover:shadow-black hover:bg-white/10 hover:shadow-[inset_0_0_8px_gray] dark:bg-white/5 dark:hover:bg-white/10 lg:hover:shadow-none flex gap-2 bg-white/5 lg:bg-transparent lg:dark:bg-white/5 items-center justify-between rounded-lg px-4 py-2 lg:shadow-sm transition-all duration-300 cursor-pointer group dark:text-textPrimary text-white animate-fade-in"
      onClick={() => handlePlay(track)}
    >
      <div className="hidden lg:block absolute z-0 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      <div className="flex justify-start overflow-hidden gap-3 items-center flex-1">
        <img
          src={track.album.cover_small}
          alt={track.title}
          className="w-12 h-12 lg:h-10 lg:w-10 xl:h-12 xl:w-12 object-cover rounded-full"
        />
        <div className="truncate">
          <h2 className="text-sm font-medium truncate text-glow">{track.title_short}</h2>
          <p className="text-xs dark:text-gray-400 text-black/60 text-glow">{track.artist.name}</p>
        </div>
      </div>

      {/* Kebab Menu Button */}
      {user ? (
        <div className="relative z-50" ref={menuRef}>
          <div className="flex flex-row-reverse items-center gap-1 xl:gap-2">
            <button
              className={`flex justify-center hover:shadow-[inset_0_2px_4px_gray] dark:hover:shadow-[inset_0_2px_2px_black] focus:shadow-[inset_0_2px_4px_black] dark:focus:shadow-[inset_0_2px_4px_black] hover:bg-white/5 dark:hover:bg-transparent items-center transition-all duration-300 rounded-full p-2 z-10`}
              onClick={toggleMenu}
            >
              <MoreVertical size={20} />
            </button>
            <button
              className={`flex items-center p-2 rounded-full hover:shadow-[inset_0_2px_4px_black] active:scale-[0.90] hover:bg-white/10 bg-transparent transition-all duration-300 dark:hover:bg-transparent ${
                isFavorite
                  ? "text-red-500"
                  : ""
              } `}
              onClick={(e) => handleAddToFavorites(e, track)}
            >
              {isFavorite ? (
                <Trash2 size={18} />
              ) : (
                <Heart className="" size={20} />
              )}
            </button>
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <div
              className="absolute flex items-center right-0 gap-1.5 top-[80%] text-black rounded-md z-[99] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="flex items-center p-2 bg-white hover:shadow-[inset_0_2px_4px_black] rounded-full transition-all duration-300"
                onClick={(e) => handleAddToQueue(e, track)}
              >
                <ListPlus size={18} />
              </button>
              <button
                className="flex items-center p-2 hover:shadow-[inset_0_2px_4px_black] rounded-full transition-all duration-300 bg-white"
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
          className="flex items-center p-2 text-white shadow-md hover:bg-gray-500 rounded-full transition-all duration-300 active:scale-75"
          onClick={(e) => handleAddToQueue(e, track)}
        >
          <ListPlus size={18} />
        </button>
      )}
    </div>
  );
};

export default SongTile;
