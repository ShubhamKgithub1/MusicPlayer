import { Trash2 } from "lucide-react";
import { removeSongFromPlaylist } from "../services/userService";

const PlaylistSongs = ({song, playlistId, songId, userId, dispatch})=>{


    if(!song) return;
    return (
        <div className="flex gap-2 rounded-md items-center w-full bg-white/5 hover:shadow-[inset_0_0_8px_gray] dark:hover:shadow-black md:hover:shadow-none dark:hover:bg-white/10 p-2 md:py-2 md:px-4 snap-start relative group cursor-pointer animate-fade-in transition-all duration-300">
            <img src={song.album.cover_small} alt="not found" className="w-12 h-12 lg:h-10 lg:w-10 2xl:h-12 2xl:w-12 object-cover rounded-full"/>
            <div className="truncate">
                <h1 className="text-sm font-medium truncate text-glow">{song.title_short}</h1>
                <h1 className="text-xs dark:text-gray-400 text-black/60 text-glow">{song.artist.name}</h1>
            </div>
                <button className={`flex items-center ml-auto text-red-500 p-2 rounded-full hover:shadow-[inset_0_2px_4px_black] active:scale-[0.90] hover:bg-white/10 bg-transparent transition-all duration-300 dark:hover:bg-transparent`}
                onClick={()=>removeSongFromPlaylist(userId, playlistId, songId, dispatch)}>
                    <Trash2 size={20}/>
                </button>
            <div className="hidden sm:block bg-gradient-to-r from-transparent via-white/30 absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"/>
        </div>
    );
};

export default PlaylistSongs;