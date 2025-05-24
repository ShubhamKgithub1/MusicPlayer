import BannerCard from "./BannerCard";
import { ArtistTitleCard } from "./ArtistTitleCard";
import { SongTile } from "./SongTile";

const MainSection = ({ hits, popular}) => {
  if (!hits || !popular) return null;
  return (
    <div className="flex h-screen gap-4 p-4">
      <div className="flex flex-col w-[40%] p-6 bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl">
        <BannerCard topTracks={hits} />
        <div className="max-h-[60%] w-full flex flex-col gap-6 py-4">
          <h1 className="font-bold text-2xl text-white">
            {hits[0]?.artist?.name} Songs
          </h1>
          <div className="flex overflow-auto hide-scrollbar w-full">
            <SongTile song={hits}/>
          </div>
          {/* <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory hide-scrollbar">
            {devotional.map((song) => (
              <SongsCard key={song?.id} track={song} />
            ))}
          </div> */}
        </div>
      </div>
      <div className="flex-1 gap-4 rounded-3xl h-full flex flex-col">
            <ArtistTitleCard prop={hits[0]}/>
            <div className="overflow-auto flex gap-4 w-full flex-1">
              <div className="w-[50%] overflow-auto bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl hide-scrollbar p-4">
              <h1 className="text-white text-lg font-medium py-2">Most Popular</h1>
              <SongTile song={popular}/></div>
              <div className="w-[50%] overflow-auto bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl hide-scrollbar p-4">
               <h1 className="text-white text-lg font-medium py-2">Weekly Hits</h1>
               <SongTile song={hits}/>
               </div>
              
            </div>
      </div>
    </div>
  );
};

export default MainSection;
