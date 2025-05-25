import Sidebar from "../components/Sidebar";
import { getHits, getPopular } from "../services/deezerAPI";
import { useEffect, useState } from "react";
import MainSection from "../components/MainSection";
import "../App.css";
import Playbar from "../components/Playbar";

const Home = () => {
  const [popular, setPopular] = useState([]);
  const [hits, setHits] = useState([]);
  useEffect(() => {
    const fetchSongs = async () => {
      const top = await getPopular();
      const hits = await getHits();
      setPopular(top);
      setHits(hits);
    };
    fetchSongs();
  }, []);

  return (
    <div className="h-screen bg-forest relative flex min-h-[90dvh] max-h-[100dvh] p-4 gap-4 border border-black">
      <div className="w-[20dvw] h-full">
        <Sidebar />
      </div>
      <div className="w-[80dvw] h-full">
        {hits ? (
          <MainSection hits={hits} popular={popular} />
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="absolute top-4 w-[20dvw] pr-4 right-2 text-white">
        <Playbar />
      </div>
    </div>
  );
};

export default Home;
