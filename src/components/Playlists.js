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

  const handlePlayAll=()=>{
    dispatch(setQueue(selectedPlaylist.songs));
    dispatch(playPause(true));
  };

  return (
    <div className="animate-fade-in flex flex-col w-full h-full overflow-hidden">
      <h1 className="text-xl font-bold p-4">Playlists</h1>
      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="w-1/4 overflow-auto hide-scrollbar snap-both snap-mandatory">
          <div className="grid grid-cols-2 gap-2">
            {playlists.map((item) => (
              <PlaylistsCard
                key={item?.id}
                playlist={item}
                setSelectedPlaylistId={setSelectedPlaylistId}
              />
            ))}
            <div className="h-full w-full flex flex-col gap-2 items-center justify-center cursor-pointer transition-all duration-300 hover:bg-black/20 border border-white/30 rounded-lg bg-white/20 text-white"
            onClick={()=>dispatch(openCreatePlaylistModal())}>
              <PlusIcon size={40}></PlusIcon>
              <h1 className="font-semibold">Create Playlist</h1>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden animate-fade-in">
          {selectedPlaylistId && (
            <div className="flex flex-col h-full w-2/3 border border-white/20 rounded-3xl overflow-hidden animate-fade-in">
              <div className="flex flex-row h-max gap-4 items-start backdrop-blur-lg p-4 rounded-t-3xl bg-gradient-to-b from-black/50">
                <img
                  src={selectedPlaylist?.songs[0]?.album?.cover}
                  alt={selectedPlaylist?.name}
                  className="rounded-lg aspect-square"
                />
                <div className="flex flex-col flex-1 items-start justify-between">
                  <h1 className="font-semibold text-lg">
                    {selectedPlaylist?.name}
                  </h1>
                  <h1 className="text-sm font-semibold">
                    {selectedPlaylist.songs.length} Songs
                  </h1>
                  <h1 className="text-gray-500">
                    Date Created : {selectedPlaylist.createdAt}
                  </h1>
                  <div className="flex gap-2 items-center">
                    <button className="flex bg-green-700 items-center justify-center p-2 rounded-full"
                    onClick={()=>handlePlayAll()}>
                      <Play size={20} />
                    </button>
                    <button className="flex items-center justify-center text-red-600 p-2 border border-red-500 rounded-lg"
                    onClick={()=>{deletePlaylist(userId, selectedPlaylistId, dispatch);
                      setSelectedPlaylistId( null)
                    }}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
              {selectedPlaylist.songs.length > -1 && (
                <div className="flex-1 flex flex-col h-max gap-1 bg-white/20 overflow-auto hide-scrollbar snap-y snap-mandatory animate-fade-in">
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
