import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreatePlaylistModal } from "../reduxStore/modalSlice";
import { createPlaylist } from "../services/userService";

const CreatePlaylistModal = ({ userId }) => {
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const [playlistName, setPlaylistName] = useState("");
  const isOpen = useSelector((state) => state.modal.isCreatePlaylistOpen);

  const handleSubmit = async () => {
    if (!userId || !playlistName) return;
    createPlaylist(userId, playlistName, dispatch);
    setPlaylistName("");
    dispatch(closeCreatePlaylistModal());
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        dispatch(closeCreatePlaylistModal());
      }
    };
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        dispatch(closeCreatePlaylistModal());
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  if (!isOpen) return;
  return (
    <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-[99] animate-opacity">
      <div className="flex flex-col gap-4 bg-white/30 dark:bg-black/40 shadow-2xl text-white rounded-lg p-6 w-[90%] max-w-md animate-fade-in" ref={menuRef}>
        <h2 className="text-lg font-semibold mb-2 text-center">
          Create New Playlist
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            className="w-full px-3 py-2 hover:bg-white/10 rounded-full bg-white text-black/70 dark:text-white dark:placeholder-white dark:bg-white/25 dark:focus:bg-white/20 placeholder-gray-600 hover:shadow-black/20 hover:shadow-inner focus:bg-white/20 focus:shadow-inner focus:shadow-black font-medium backdrop-blur-md outline-none transition-all duration-200"
            placeholder="Enter playlist name"
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                dispatch(closeCreatePlaylistModal());
                setPlaylistName("");
              }}
              className="font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-violet-500 hover:bg-violet-600 shadow-md font-medium active:scale-x-[0.96] px-4 py-1.5 rounded active:scale-[0.96] transition-all duration-200"
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
