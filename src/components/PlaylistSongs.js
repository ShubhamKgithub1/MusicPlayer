import { Trash2 } from "lucide-react";
import { removeSongFromPlaylist } from "../services/userService";

const PlaylistSongs = ({song, playlistId, songId, userId, dispatch})=>{


    if(!song) return;
    return (
        <div className="flex gap-2 items-center w-full shadow-sm py-2 px-4 snap-start relative group cursor-pointer animate-fade-in">
            <img src={song.album.cover_small} alt="not found" className="rounded-full"/>
            <div className="">
                <h1 className="font-semibold">{song.title_short}</h1>
                <h1 className="text-sm text-gray-500">{song.artist.name}</h1>
            </div>
                <button className="hover:bg-gray-200 rounded-full p-2 ml-auto transition-all duration-200 hover:text-red-500 text-white"
                onClick={()=>removeSongFromPlaylist(userId, playlistId, songId, dispatch)}>
                    <Trash2 size={20}/>
                </button>
            <div className="bg-gradient-to-r from-transparent via-white/30 absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"/>
        </div>
    );
};

export default PlaylistSongs;