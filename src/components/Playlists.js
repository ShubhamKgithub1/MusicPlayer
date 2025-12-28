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

  const handlePlayAll = () => {
    dispatch(setQueue(selectedPlaylist.songs));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-white/20 dark:bg-black/60 lg:bg-transparent lg:dark:bg-transparent backdrop-blur-lg lg:backdrop-blur-none p-3 rounded-lg">
      {playlists.length > 0 ? (
        <div className="flex flex-col flex-1 gap-2 lg:gap-3 overflow-hidden animate-fade-in">
          <div className="w-[100%] flex gap-2 overflow-x-scroll hide-scrollbar">
            {playlists.map((item) => (
              <PlaylistsCard
                key={item?.id}
                playlist={item}
                setSelectedPlaylistId={setSelectedPlaylistId}
              />
            ))}
          </div>
            {selectedPlaylistId && (
              <div className="flex flex-col max-h-full xl:w-2/3 bg-slate-500 dark:bg-slate-800 rounded-lg lg:rounded-xl overflow-hidden animate-fade-in">
                <div className="flex h-max gap-4 items-center p-2 lg:p-3 shadow">
                  <img
                    src={selectedPlaylist?.songs[0]?.album?.cover}
                    alt={selectedPlaylist?.name}
                    className="w-20 h-20 rounded-lg aspect-square"
                  />
                  <div className="flex flex-col flex-1 items-start justify-between">
                    <h1 className="font-semibold md:text-lg">
                      {selectedPlaylist?.name}
                    </h1>
                    <h1 className="text-sm font-medium md:font-semibold text-gray-300">
                      {selectedPlaylist.songs.length} Songs found
                    </h1>
                    <h1 className="text-xs md:text-sm text-gray-300">
                      Date Created : {selectedPlaylist.createdAt}
                    </h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      className="flex bg-teal-500 hover:bg-teal-600 items-center justify-center p-1.5 md:p-2 rounded-full transition-all duration-200 active:scale-[0.86]"
                      onClick={() => handlePlayAll()}
                    >
                      <Play size={20} />
                    </button>
                    <button
                      className="flex items-center justify-center bg-red-500 hover:bg-red-600 p-1.5 md:p-2 rounded-lg transition-all duration-200 active:scale-[0.86]"
                      onClick={() => {
                        deletePlaylist(userId, selectedPlaylistId, dispatch);
                        setSelectedPlaylistId(null);
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                {selectedPlaylist.songs.length > -1 && (
                  <div className="flex-1 flex flex-col h-max overflow-auto hide-scrollbar">
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
        <div className="flex flex-col gap-4 bg-violet-500 rounded-md lg:rounded-xl max-w-md p-3 lg:p-4 animate-fade-in shadow-md">
          <p className="text-white font-medium lg:font-semibold">
            Create your ultimate playlist with your top tracks!
          </p>
          <button className="text-violet-500 bg-white py-1 px-1.5 rounded-md ml-auto font-semibold shadow active:scale-95 transition-all duration-200" onClick={() => dispatch(openCreatePlaylistModal())}>Create Now</button>
        </div>
      )}
    </div>
  );
};

export default Playlists;
