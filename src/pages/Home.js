import Sidebar from "../components/Sidebar";
import { getHits, getPopular} from "../services/deezerAPI";
import {useEffect, useState} from "react";
import MainSection from "../components/MainSection";
import "../App.css";

const Home =()=>{
    const [popular, setPopular] = useState([]);
    const [hits, setHits] = useState([]);
    // const [topDevotional, setTopDevotional] = useState([]);
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
        <div className="h-screen bg-forest relative">
            {/* <div className="h-[10dvh]">
                <Navbar/>
            </div> */}
            
            <div className="flex min-h-[90dvh] max-h-[100dvh]">
                <div className="w-[20dvw]">
                    <Sidebar/>
                </div>
                <div className="w-[80dvw] h-[90dvh]">
                    {hits ? <MainSection hits={hits} popular={popular}/>: <h1>Loading...</h1>}
                     
                </div>
            </div>
        </div>
    );
};

export default Home;