import BannerCard from "./BannerCard";
import { ArtistTitleCard } from "./ArtistTitleCard";
import SongTile from "./SongTile";
import { useEffect, useState } from "react";
import { getHits, getPopular } from "../services/deezerAPI";

const Home = () => {
  const [popular, setPopular] = useState([]);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSongs = async () => {
      const top = await getPopular();
      const hits = await getHits();
      setPopular(top);
      setHits(hits);
      setLoading(false);
    };
    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full text-white">
        <div className="flex items-end justify-center gap-2 h-20">
          <div className="w-1 h-5 bg-white animate-[bounce_0.6s_infinite] origin-bottom" />
          <div className="w-1 h-7 bg-white animate-[bounce_0.6s_infinite_0.1s] origin-bottom" />
          <div className="w-1 h-9 bg-white animate-[bounce_0.6s_infinite_0.2s] origin-bottom" />
          <div className="w-1 h-7 bg-white animate-[bounce_0.6s_infinite_0.3s] origin-bottom" />
          <div className="w-1 h-5 bg-white animate-[bounce_0.6s_infinite_0.4s] origin-bottom" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full gap-4 ">
      <div className="flex flex-col w-[40%] p-4  bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl animate-fade-in-delay">
        <BannerCard topTracks={hits} />
        <div className="max-h-[60%] w-full flex flex-col">
          <h1 className="font-bold text-2xl text-white py-4">
            {hits[0]?.artist?.name} Songs
          </h1>
          <div className="flex overflow-auto hide-scrollbar w-full px-2">
            <SongTile trackList={hits} />
          </div>
        </div>
      </div>
      <div className="flex-1 gap-4 rounded-3xl h-full flex flex-col">
        <ArtistTitleCard prop={hits[0]} />
        <div className="overflow-auto flex gap-4 w-full flex-1">
          <div className="w-[50%] flex flex-col bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl hide-scrollbar p-4 animate-fade-in">
            <div>
              <h1 className="text-white text-lg font-medium py-2">
                Most Popular
              </h1>
            </div>
            <div className="overflow-auto hide-scrollbar">
              <SongTile trackList={popular} />
            </div>
          </div>
          <div className="w-[50%] flex flex-col bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl hide-scrollbar p-4 animate-fade-in">
            <div>
              <h1 className="text-white text-lg font-medium py-2">
                Weekly Hits
              </h1>
            </div>
            <div className="overflow-scroll hide-scrollbar">
              <SongTile trackList={hits} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
