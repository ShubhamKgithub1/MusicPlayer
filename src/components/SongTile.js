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
import Portal from "./Portal";

const SongTile = ({ trackList, track, isFavorite }) => {
  const dispatch = useDispatch();
  const menuButtonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
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
    setShowMenu(false);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    const rect = menuButtonRef.current.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.right + window.scrollX,
    });
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  if (!track) return null;

  return (
    <div
      key={track.id}
      className="relative z-10 hover:shadow-[inset_2px_3px_6px_gray] dark:hover:shadow-[inset_-2px_-3px_6px_black,inset_2px_3px_6px_black] dark:bg-white/5 dark:hover:bg-white/10 hover:bg-white/15 flex gap-2 items-center justify-between rounded-lg px-4 py-2  transition-all duration-200 cursor-pointer text-white"
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
        <div>
          <div className="flex items-center gap-1">

            <button
              className={`p-2 rounded-full hover:shadow-[inset_0_2px_3px_black] focus:shadow-[inset_0_3px_4px_black] hover:bg-white/5 transition-all duration-200`}
              onClick={toggleMenu}
              ref={menuButtonRef}
            >
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Dropdown Menu */}
          {showMenu && (
            <Portal>
              <div
                ref={dropdownRef}
                className={`fixed flex flex-col p-1 bg-white dark:bg-black dark:text-white text-black rounded-md overflow-hidden shadow-lg transition-all duration-300 animate-qick-fade-in`}
                style={{
                  top: menuPosition.top,
                  left: menuPosition.left,
                  zIndex: 9999,
                }}
              >
                  <button
                    className="flex items-center p-1.5 gap-1 transition-all duration-200 hover:bg-white/80"
                    onClick={(e) => handleAddToQueue(e, track)}
                  >
                    <ListPlus size={18} />
                    <span className="text-sm">Add to queue</span>
                  </button>
                  <button
                    className="flex items-center gap-1 p-1.5 transition-all duration-200 hover:bg-white/80"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(openAddToPlaylistModal(track));
                      setShowMenu(false);
                    }}
                  >
                    <FolderPlus size={18} />
                    <span className="text-sm">Add to playlist</span>
                  </button>
                              <button
              className={`${
                isFavorite ? "text-red-600" : ""
              } `}
              onClick={(e) => handleAddToFavorites(e, track)}
            >
              {isFavorite ? (
                 <span className="flex items-center gap-1 p-1.5 text-sm"> <Trash2 size={18} />Remove from favorites</span>
              ) : (
                
                <span className="flex items-center gap-1 p-1.5 text-sm"> <Heart size={18} />Add to favorites</span>
              )}
            </button>
              </div>
            </Portal>
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
