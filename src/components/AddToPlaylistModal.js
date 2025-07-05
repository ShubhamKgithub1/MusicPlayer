import { useState } from "react";
import {
  createPlaylist,
  addSongToPlaylist,
} from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const AddToPlaylistModal = ({ isOpen, onClose, track, userId}) => {
  const dispatch = useDispatch();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-[99] animate-fade-in">
      <div className="flex flex-col gap-4 bg-black/20 dark:bg-black/40 backdrop-blur-lg text-white p-6 rounded-2xl w-[90%] max-w-md relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-lg font-semibold text-center">Add to Playlist</h2>

        <div className="space-y-2 max-h-60 overflow-auto hide-scrollbar">
          {playlists.length > 0 ? (
            playlists.map((pl) => (
              <button
                key={pl.id}
                onClick={() => handleAddToPlaylist(pl.id)}
                disabled={loading}
                className="w-full text-left py-1.5 px-3 font-bold bg-white/40 dark:bg-black/40 dark:hover:bg-white/20 text-gray-600 hover:text-white  dark:text-gray-300 hover:bg-transparent hover:shadow-[inset_0_2px_6px_black] rounded-3xl disabled:opacity-50 active:scale-x-[0.96] transition-all duration-200"
              >
                {pl.name}
              </button>
            ))
          ) : (
            <p className="dark:text-gray-300">No playlists found.</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="w-full px-3 hover:text-white hover:placeholder-white focus:placeholder-white py-2 rounded-full bg-white text-black/70 dark:bg-black/40 dark:focus:bg-white/20 dark:focus:shadow-black dark:hover:bg-white/10 dark:hover:shadow-black/20 dark:text-white dark:placeholder-white/70 placeholder-gray-600 hover:bg-white/10 hover:shadow-black/10 hover:shadow-inner focus:bg-white/20 focus:shadow-inner focus:shadow-black font-medium backdrop-blur-md outline-none transition-all duration-300"

            disabled={loading}
          />
          <button
            onClick={handleCreateAndAdd}
            disabled={loading}
            className="w-full bg-violet-400 font-medium py-1.5 rounded-3xl transition-all duration-300 disabled:opacity-50 active:scale-x-[0.96]"
          >
            {loading ? "Adding..." : "Create & Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
