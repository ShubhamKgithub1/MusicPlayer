const PlaylistsCard = ({playlist, setSelectedPlaylistId})=>{
    // const songs = playlist?.songs;
    const length = playlist?.songs.length;
    if(!playlist) return;
    return (
        <div className="relative z-40 snap-start flex-[0_0_25%] sm:flex-[0_0_20%] md:flex-[0_0_15%] xl:flex-[0_0_12%] 2xl:flex-[0_0_10%] hover:scale-[0.90] w-full h-full flex flex-col bg-white/20 overflow-hidden rounded-lg hover:bg-black/20 cursor-pointer transition-all duration-200 animate-fade-in"
        onClick={() => setSelectedPlaylistId(playlist.id)}>
            <div className="relative z-10 w-full flex items-center justify-center rounded-lg overflow-hidden transition-all duration-200"><img src={playlist?.songs[0]?.album?.cover_medium} alt="Empty.." className="aspect-square object-center"/></div>
            <div className="absolute bottom-0 z-20 px-2 py-3 bg-gradient-to-t from-black via-black/60 w-full flex flex-col items-start justify-center">
                <h1 className="font-semibold lg:text-sm 2xl:text-base">{playlist?.name}</h1>
                <p className="text-xs 2xl:text-sm text-gray-200">{length} Songs found</p>
            </div>
        </div>
    );
};

export default PlaylistsCard;