import { useDispatch, useSelector } from "react-redux";
import PlaylistsCard from "./PlaylistsCard";
import { Play, PlusIcon, Trash2 } from "lucide-react";
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
    <div className="flex flex-col w-full h-full overflow-hidden bg-white/20 border border-white/10 border-t-0 md:border-0 dark:bg-black/60 lg:bg-transparent lg:dark:bg-transparent backdrop-blur-lg lg:backdrop-blur-none p-3 rounded-lg">
      <h1 className="text-lg 2xl:text-xl font-semibold 2xl:font-bold pb-3 text-glow animate-fade-in">
        Playlists
      </h1>
      {playlists.length > 0 ? (
        <div className="flex flex-col flex-1 gap-2 lg:gap-3 overflow-hidden">
          <div className="w-[100%] flex gap-2 overflow-x-scroll hide-scrollbar animate-fade-in">
            <div
              className="snap-start aspect-square flex flex-col gap-1 items-center justify-center cursor-pointer transition-all duration-300 dark:text-white active:scale-[0.92] rounded-lg bg-white/30 shadow-[inset_0_2px_4px_gray] dark:shadow-black/60 hover:shadow-[inset_0_2px_6px_black] dark:hover:shadow-[inset_0_2px_6px_black] text-black"
              onClick={() => dispatch(openCreatePlaylistModal())}
            >
              <PlusIcon size={32} />
              <h1 className="text-sm  font-semibold">
                Create Playlist
              </h1>
            </div>
            {playlists.map((item) => (
              <PlaylistsCard
                key={item?.id}
                playlist={item}
                setSelectedPlaylistId={setSelectedPlaylistId}
              />
            ))}
          </div>
          <div className="flex-1 animate-fade-in overflow-hidden lg:p-2">
            {selectedPlaylistId && (
              <div className="flex flex-col max-h-full xl:w-2/3 border border-white/10 rounded-xl overflow-hidden animate-fade-in dark:bg-black/10 backdrop-blur-lg bg-white/10 lg:shadow-[2px_2px_7px_gray]">
                <div className="flex h-max gap-4 items-center p-2 lg:p-3 bg-white/5 shadow">
                  <img
                    src={selectedPlaylist?.songs[0]?.album?.cover}
                    alt={selectedPlaylist?.name}
                    className="w-20 h-20 rounded-lg aspect-square"
                  />
                  <div className="flex flex-col flex-1 items-start justify-between">
                    <h1 className="font-semibold md:text-lg text-glow">
                      {selectedPlaylist?.name}
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500 dark:text-gray-300 md:font-semibold">
                      {selectedPlaylist.songs.length} Songs
                    </h1>
                    <h1 className="text-xs md:text-sm text-gray-400 dark:text-gray-400">
                      Date Created : {selectedPlaylist.createdAt}
                    </h1>
                  </div>
                  <div className="flex gap-2 pt-1 items-center">
                    <button
                      className="flex hover:bg-white bg-teal-500 hover:text-teal-500 items-center hover:bg-transparent justify-center p-1.5 md:p-2 rounded-full transition-all duration-300 active:scale-[0.86]"
                      onClick={() => handlePlayAll()}
                    >
                      <Play size={20} />
                    </button>
                    <button
                      className="flex items-center justify-center bg-white hover:bg-red-600 hover:text-white text-red-600 p-1.5 md:p-2 rounded-lg transition-all duration-300 active:scale-[0.86]"
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
                  <div className="flex-1 flex flex-col h-max gap-1 p-2 overflow-auto hide-scrollbar animate-fade-in">
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
        </div>
      ) : (
       <div>
         <p className="text-gray-600 dark:text-white text-sm p-2 lg:p-4 font-medium lg:font-semibold animate-fade-in">
          No playlist found.
        </p>
                    <div
              className="aspect-square w-32 lg:w-40 flex flex-col gap-1 items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:text-black active:scale-[0.92] rounded-lg bg-black/60 hover:shadow-[inset_0_2px_8px_black] text-white"
              onClick={() => dispatch(openCreatePlaylistModal())}
            >
              <PlusIcon size={32} />
              <h1 className="text-sm lg:text-sm font-semibold">
                Create Playlist
              </h1>
            </div>
       </div>
      )}
    </div>
  );
};

export default Playlists;
