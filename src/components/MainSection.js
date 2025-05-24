import BannerCard from "./BannerCard";
import { ArtistTitleCard } from "./ArtistTitleCard";
import { SongTile } from "./SongTile";

const MainSection = ({ hits, popular }) => {
  if (!hits || !popular) return null;
  return (
    <div className="flex h-full gap-4">
      <div className="flex flex-col w-[40%] p-4 pb-0 bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl">
        <BannerCard topTracks={hits} />
        <div className="max-h-[60%] w-full flex flex-col">
          <h1 className="font-bold text-2xl text-white py-4">
            {hits[0]?.artist?.name} Songs
          </h1>
          <div className="flex overflow-auto hide-scrollbar w-full">
            <SongTile trackList={hits} />
          </div>
        </div>
      </div>
      <div className="flex-1 gap-4 rounded-3xl h-full flex flex-col">
        <ArtistTitleCard prop={hits[0]} />
        <div className="overflow-auto flex gap-4 w-full flex-1">
          <div className="w-[50%] overflow-auto bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl hide-scrollbar p-4">
            <h1 className="text-white text-lg font-medium py-2">
              Most Popular
            </h1>
            <SongTile trackList={popular} />
          </div>
          <div className="w-[50%] overflow-auto bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl hide-scrollbar p-4">
            <h1 className="text-white text-lg font-medium py-2">Weekly Hits</h1>
            <SongTile trackList={hits} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
