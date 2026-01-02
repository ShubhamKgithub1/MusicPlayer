import { useEffect, useRef, useState } from "react";
import { createPlaylist, addSongToPlaylist } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const AddToPlaylistModal = ({ isOpen, onClose, track, userId }) => {
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const playlists = useSelector((state) => state.user.playlists);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddToPlaylist = async (playlistId) => {
    if (loading) return;
    setLoading(true);
    await addSongToPlaylist(userId, playlistId, track, dispatch);
    setLoading(false);
    onClose();
  };

  const handleCreateAndAdd = async () => {
    if (loading) return;
    if (!newPlaylistName.trim()) return toast.error("Enter a playlist name.");

    setLoading(true);
    const newPlaylist = await createPlaylist(userId, newPlaylistName, dispatch);
    if (newPlaylist) {
      await addSongToPlaylist(userId, newPlaylist.id, track, dispatch);
      setNewPlaylistName("");
      onClose();
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      };
    };


    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-[99] animate-opacity">
      <div className="flex flex-col gap-4 bg-white/30 dark:bg-black/40 dark:border dark:border-white/10 shadow-2xl text-white p-6 rounded-2xl w-[90%] max-w-md animate-fade-in" ref={menuRef}>
        <h2 className="text-lg font-semibold text-center">Add to Playlist</h2>
        <div className="flex gap-2 lg:gap-4 max-h-60 overflow-y-scroll hide-scrollbar pt-0 p-3">
          {playlists.length > 0 ? (
            playlists.map((pl) => (
              <div
                key={pl.id}
                onClick={() => handleAddToPlaylist(pl.id)}
                disabled={loading}
                className="flex-[0_0_30%] relative shadow-md group rounded-md overflow-hidden cursor-pointer disabled:opacity-50 active:scale-[0.92] transition-all duration-300"
              >
                <img src={pl?.songs[0]?.album?.cover} alt="Empty.." className="w-full group-hover:scale-[1.08] transition-transform duration-300"/>
                <span className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/80 via-black/20 z-10 truncate text-sm font-medium">{pl?.name}</span>
              </div>
            ))
          ) : (
            <p className="dark:text-gray-300">No playlists found.</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateAndAdd();
            }}
            className="w-full px-3 py-2 rounded-full text-black/70 placeholder-gray-600 bg-white focus:bg-white/90 hover:shadow-inner hover:shadow-black/20 focus:shadow-inner focus:shadow-black font-medium outline-none transition-all duration-200"
            disabled={loading}
          />
          <button
            onClick={handleCreateAndAdd}
            disabled={loading}
            className="w-full bg-violet-500 hover:bg-violet-600 shadow-md font-medium py-1.5 rounded-full transition-all duration-300 disabled:opacity-50 active:scale-[0.96]"
          >
            {loading ? "Adding..." : "Create & Add"}
          </button>
          <button className="font-medium" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
