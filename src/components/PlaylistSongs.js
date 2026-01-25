import { Trash2 } from "lucide-react";
import { removeSongFromPlaylist } from "../services/userService";

const PlaylistSongs = ({song, playlistId, songId, userId, dispatch})=>{


    if(!song) return;
    return (
        <div className="flex gap-2 items-center w-full p-2 md:py-2 md:px-4 snap-start relative">
            <img src={song.album.cover_small} alt="not found" className="w-12 h-12 lg:h-10 lg:w-10 2xl:h-12 2xl:w-12 object-cover rounded-full"/>
            <div className="truncate">
                <h1 className="text-sm font-medium truncate text-gray-600 dark:text-white">{song.title_short}</h1>
                <h1 className="text-xs text-gray-400 text-black/60">{song.artist.name}</h1>
            </div>
                <button className={`flex items-center ml-auto text-red-500 p-2 rounded-full active:scale-[0.90] hover:bg-gray-200 transition-all duration-200`}
                onClick={()=>removeSongFromPlaylist(userId, playlistId, songId, dispatch)}>
                    <Trash2 size={20}/>
                </button>
        </div>
    );
};

export default PlaylistSongs;