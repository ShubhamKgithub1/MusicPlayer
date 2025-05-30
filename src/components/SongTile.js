import { useDispatch } from "react-redux";
import {
  playPause,
  setQueue,
  setCurrentSongIndex,
  addToQueue,
} from "../reduxStore/playerSlice";
import { ListPlus, MoreVertical, Heart, FolderPlus } from "lucide-react";
import { addRecentlyPlayed, addToFavorites } from "../services/userService"; // Assumed imported
import { getAuth } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const SongTile = ({ trackList, track }) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

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
    await addToFavorites(user.uid, track);
    setShowMenu(false);
     toast.success("Song added to favorite..");
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
      className="relative z-0 snap-start max-w-[inherit] flex gap-2 items-center justify-between rounded-lg px-4 py-2 shadow-sm transition-all duration-300 cursor-pointer group active:bg-gray-400 text-white"
      onClick={() => handlePlay(track)}
    >
      <div className="absolute z-0 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

      <div className="flex justify-start overflow-hidden gap-3 items-center flex-1">
        <img
          src={track.album.cover_small}
          alt={track.title}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="truncate">
          <h2 className="text-sm font-medium truncate">{track.title_short}</h2>
          <p className="text-xs text-gray-500">{track.artist.name}</p>
        </div>
      </div>

      {/* Kebab Menu Button */}
      <div className="relative z-50" ref={menuRef}>
        <button
          className={`flex justify-center items-center active:bg-gray-500 shadow-xl transition-all duration-300 rounded-full p-2 z-10 ${showMenu ?"bg-gray-400":"bg-transparent"}`}
          onClick={toggleMenu}
        >
          <MoreVertical size={20} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div
              className="absolute flex items-center right-0 gap-2 top-[80%] text-black rounded-md z-[99] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="flex items-center p-2 bg-white rounded-full hover:bg-transparent border border-white/20 w-full transition-all duration-300 hover:text-white"
                onClick={(e) => handleAddToFavorites(e, track)}
              >
                <Heart size={18} />
                {/* <span>Add to Favorites</span> */}
              </button>
              <button
                className="flex items-center p-2 bg-white hover:bg-transparent w-full border border-white/20 rounded-full transition-all duration-300 hover:text-white"
                onClick={(e) => handleAddToQueue(e, track)}
              >
                <ListPlus size={18} />
                {/* <span>Add to Queue</span> */}
              </button>
              <button
                className="flex items-center p-2 bg-white hover:bg-transparent w-full border border-white/20 rounded-full transition-all duration-300 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  // handleAddToPlaylist(track);
                }}
              >
                <FolderPlus size={18} />
                {/* <span>Add to Playlist</span> */}
              </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default SongTile;
