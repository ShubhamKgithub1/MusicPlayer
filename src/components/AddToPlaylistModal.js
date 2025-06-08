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

  // useEffect(() => {
  //   if (isOpen && userId) {
  //     getPlaylists(userId, dispatch);
  //   } Backdrop color-#1c1b1926
      //  Button-bg-#efeff2
      //     box-shadow: 0 0 14px #efeff2;
  // }, [isOpen, userId, dispatch]);

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
      <div className="flex flex-col gap-4 bg-black/15 backdrop-blur-[10px] text-white p-6 rounded-2xl w-[90%] max-w-md relative">
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
                className="w-full text-left py-2 px-3 font-medium bg-white/20 rounded-3xl disabled:opacity-50 active:scale-x-[0.96] transition-all duration-200"
              >
                {pl.name}
              </button>
            ))
          ) : (
            <p className="text-gray-600">No playlists found.</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="w-full px-3 py-2 shadow-custom text-gray-500 backdrop-blur-lg rounded-3xl mb-2 font-semibold outline-none"
            disabled={loading}
          />
          <button
            onClick={handleCreateAndAdd}
            disabled={loading}
            className="w-full bg-emerald-500 font-medium py-2 rounded-3xl transition-all duration-200 disabled:opacity-50 active:scale-x-[0.96]"
          >
            {loading ? "Adding..." : "Create & Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
