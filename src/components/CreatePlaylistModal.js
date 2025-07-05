import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreatePlaylistModal } from "../reduxStore/modalSlice";
import { createPlaylist } from "../services/userService";

const CreatePlaylistModal = ({ userId }) => {
  const dispatch = useDispatch();
  const [playlistName, setPlaylistName] = useState("");
  const isOpen = useSelector((state) => state.modal.isCreatePlaylistOpen);

  const handleSubmit = async () => {
    if (!userId || !playlistName) return;
    createPlaylist(userId, playlistName, dispatch);
    setPlaylistName("");
    dispatch(closeCreatePlaylistModal());
  };

  if (!isOpen) return;
  return (
    <div className="fixed text-white inset-0 backdrop-blur-lg flex items-center justify-center z-[99] animate-fade-in">
      <div className="bg-black/20 backdrop-blur-lg rounded-lg p-6 w-96 flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2 text-center">Create New Playlist</h2>
        <div className="flex flex-col gap-4">
          <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full px-3 hover:text-white hover:placeholder-white focus:placeholder-white py-2 rounded-full bg-white text-black/70 dark:bg-black/40 dark:hover:bg-white/10 dark:focus:bg-white/20 dark:focus:shadow-black hover:bg-white/10 dark:hover:shadow-black/20 dark:text-white dark:placeholder-white/70 placeholder-gray-600 hover:shadow-black/10 hover:shadow-inner focus:bg-white/20 focus:shadow-inner focus:shadow-black font-medium backdrop-blur-md outline-none transition-all duration-300"
          placeholder="Enter playlist name"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              dispatch(closeCreatePlaylistModal());
              setPlaylistName("");
            }}
            className="text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-violet-500 active:scale-x-[0.96] text-white px-4 py-2 rounded transition-all duration-300"
          >
            Create
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
