import { useDispatch, useSelector } from "react-redux";
import PlaylistsCard from "./PlaylistsCard";
import { Play, Trash2 } from "lucide-react";
import { useState } from "react";
import PlaylistSongs from "./PlaylistSongs";
import { deletePlaylist } from "../services/userService";
import { playPause, setQueue } from "../reduxStore/playerSlice";
import { openCreatePlaylistModal } from "../reduxStore/modalSlice";
const Playlists = () => {
  const playlists = useSelector((state) => state.user.playlists);
  const userId = useSelector((state) => state.user.userInfo.uid);
  const dispatch = useDispatch();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState();
  const selectedPlaylist = playlists.find(
    (item) => item.id === selectedPlaylistId
  );
  const isEmpty = selectedPlaylistId && selectedPlaylist.songs.length < 1;

  const handlePlayAll = () => {
    dispatch(setQueue(selectedPlaylist.songs));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {playlists.length > 0 ? (
        <div className="flex flex-col flex-1 gap-2 lg:gap-3 overflow-hidden animate-fade-in p-1">
          <div className="w-[100%] flex gap-2 overflow-x-scroll hide-scrollbar p-2">
            {playlists.map((item) => (
              <PlaylistsCard
                key={item?.id}
                playlist={item}
                isActive={selectedPlaylistId === item?.id}
                setSelectedPlaylistId={setSelectedPlaylistId}
              />
            ))}
          </div>
          {selectedPlaylistId && (
            <div className="flex flex-col flex-1 max-h-full xl:w-2/3 bg-white dark:bg-[#0f172a]/90 backdrop-blur-none shadow-lg border border-white/10 rounded-lg lg:rounded-xl overflow-hidden animate-fade-in">
              <div className="flex h-max gap-4 items-center p-3.5 border-b border-black/10 dark:border-white/10">
                <img
                  src={selectedPlaylist?.songs[0]?.album?.cover}
                  alt={selectedPlaylist?.name}
                  className="w-24 h-24 rounded-lg aspect-square"
                />
                <div className="flex flex-col flex-1 gap-1">
                  <h1 className="font-bold text-lg md:text-xl text-gray-600 dark:text-white">
                    {selectedPlaylist?.name}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedPlaylist.songs.length} songs • Created {selectedPlaylist.createdAt}
                  </p>
                </div>
                {isEmpty ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-300">
                    <p className="text-sm">This playlist is empty</p>
                    <p className="text-xs mt-1">Add songs to get started</p>
                  </div>
                ) : <div className="flex gap-2">
                  <button
                    className="bg-teal-500 hover:bg-teal-600 rounded-full p-2 shadow active:scale-95 transition-all duration-200"
                    onClick={() => handlePlayAll()}
                  >
                    <Play size={20} />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 rounded-lg p-2 shadow active:scale-95 transition-all duration-200"
                    onClick={() => {
                      deletePlaylist(userId, selectedPlaylistId, dispatch);
                      setSelectedPlaylistId(null);
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>}
              </div>
              {!isEmpty && (
                <div className="flex-1 divide-y divide-black/5 dark:divide-white/5 overflow-auto hide-scrollbar">
                  {selectedPlaylist.songs.map((track) => (
                    <PlaylistSongs
                      key={track?.id}
                      song={track}
                      playlistId={selectedPlaylistId}
                      songId={track.id}
                      userId={userId}
                      dispatch={dispatch}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 dark:text-white text-gray-600 rounded-md lg:rounded-lg max-w-md px-3 py-4 lg:px-3 animate-fade-in shadow-md">
          <p className="font-medium lg:font-semibold">
            Create your ultimate playlist with your top tracks!
          </p>
          <button className="bg-gray-600 dark:bg-white dark:text-gray-700 text-white py-1 px-1.5 rounded-md ml-auto font-medium shadow active:scale-95 transition-all duration-200" onClick={() => dispatch(openCreatePlaylistModal())}>Create Now</button>
        </div>
      )}
    </div>
  );
};

export default Playlists;
