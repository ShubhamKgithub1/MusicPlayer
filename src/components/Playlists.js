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
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(playlists[0].id);
  const selectedPlaylist = playlists.find(
    (item) => item.id === selectedPlaylistId
  );

  const handlePlayAll = () => {
    dispatch(setQueue(selectedPlaylist.songs));
    dispatch(playPause(true));
  };

  return (
    <div className="animate-fade-in flex flex-col w-full h-full overflow-hidden">
      <h1 className="text-lg sm:text-xl font-semibold sm:font-bold p-3 sm:p-4">
        Playlists
      </h1>
      <div className="flex flex-col flex-1 gap-2 md:gap-3 overflow-hidden">
        <div className="w-[100%] flex gap-2 overflow-x-scroll hide-scrollbar ">
          {/* <div className="grid grid-cols-2 gap-2"> */}
          {/* <div className="grid grid-rows-none grid-cols-7 gap-2 border"> */}
          {/* <div className=" w-full flex flex-col gap-2 items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/20 border border-white/30 rounded-lg bg-white/20 text-white"
            onClick={()=>dispatch(openCreatePlaylistModal())}>
              <PlusIcon size={40}></PlusIcon>
              <h1 className="font-semibold">Create Playlist</h1>
            </div> */}
          <div
            className="snap-start aspect-square flex flex-col gap-1 items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/20 hover:scale-[0.96] active:scale-[0.92] dark:hover:bg-white/5 border-2 border-white/30 dark:border-white/10 dark:bg-black/40 rounded-lg md:rounded-lg bg-white/20 text-white"
            onClick={() => dispatch(openCreatePlaylistModal())}
          >
            <PlusIcon size={32} />
            <h1 className="text-sm md:text-sm font-semibold">
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

          {/* </div> */}
        </div>

        <div className="flex-1 overflow-hidden animate-fade-in">
          {selectedPlaylistId && (
            <div className="flex flex-col max-h-full md:w-2/3 border border-white/10 rounded-xl overflow-hidden animate-fade-in dark:bg-black/40 bg-white/10">
              <div className="flex h-max gap-4 items-center p-2 md:p-3 bg-white/5">
                <img
                  src={selectedPlaylist?.songs[0]?.album?.cover}
                  alt={selectedPlaylist?.name}
                  className="w-20 h-20 rounded-lg aspect-square"
                />
                <div className="flex flex-col flex-1 items-start justify-between">
                  <h1 className="font-semibold md:text-lg">
                    {selectedPlaylist?.name}
                  </h1>
                  <h1 className="text-sm font-medium md:font-semibold">
                    {selectedPlaylist.songs.length} Songs
                  </h1>
                  <h1 className="text-xs md:text-sm text-gray-300 dark:text-gray-400">
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
                  {/* {selectedPlaylist.songs.map((track)=> <PlaylistSongs key={track?.id} song={track}/>)} */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
