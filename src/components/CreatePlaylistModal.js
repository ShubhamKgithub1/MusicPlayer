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
      <div className="bg-black/20 rounded-lg p-6 w-96 flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2 text-center">Create New Playlist</h2>
        <div>
          <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="w-full border p-2 rounded shadow-custom mb-4 outline-none backdrop-blur-lg text-gray-500 font-semibold"
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
            className="bg-emerald-500 text-white px-4 py-2 rounded"
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
