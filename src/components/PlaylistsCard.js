const PlaylistsCard = ({playlist, setSelectedPlaylistId})=>{
    // const songs = playlist?.songs;
    const length = playlist?.songs.length;
    if(!playlist) return;
    return (
        <div className="relative snap-start w-full flex flex-col bg-white/20 overflow-hidden rounded-lg group hover:bg-black/20 cursor-pointer transition-all duration-300 animate-fade-in"
        onClick={() => setSelectedPlaylistId(playlist.id)}>
            <div className="w-full flex items-center justify-center rounded-lg overflow-hidden"><img src={playlist?.songs[0]?.album?.cover_medium} alt="Empty.." className="aspect-square object-center"/></div>
            <div className="absolute bottom-0 bg-gradient-to-t px-2 py-3 from-black via-black/70 w-full flex flex-col items-start justify-center">
                <h1 className="font-semibold">{playlist?.name}</h1>
                <p className="group-hover:text-gray-300 text-sm text-gray-200">{length} Songs found</p>
            </div>
        </div>
    );
};

export default PlaylistsCard;