const PlaylistsCard = ({playlist, setSelectedPlaylistId})=>{
    // const songs = playlist?.songs;
    const length = playlist?.songs.length;
    if(!playlist) return;
    return (
        <div className="snap-start w-full flex flex-col bg-white/20 overflow-hidden p-2 rounded-lg group hover:bg-black/20 cursor-pointer transition-all duration-300 animate-fade-in"
        onClick={() => setSelectedPlaylistId(playlist.id)}>
            <div className="w-full flex items-center justify-center rounded-lg overflow-hidden"><img src={playlist?.songs[0]?.album?.cover_medium} alt="Cover" className="aspect-square "/></div>
            <div className="py-1 flex flex-col items-start justify-center">
                <h1 className="font-semibold">{playlist?.name}</h1>
                <p className="group-hover:text-gray-300 text-sm text-gray-200">{length} Songs found</p>
            </div>
        </div>
    );
};

export default PlaylistsCard;