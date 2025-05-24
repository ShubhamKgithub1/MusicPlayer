import { useDispatch } from "react-redux";
import { playPause, setQueue } from "../reduxStore/playerSlice";
const BannerCard = ({topTracks})=>{
    const dispatch = useDispatch();
    const handlePlay =(song)=>{
        dispatch(setQueue(topTracks));
        dispatch(playPause(true));
    };

    const track = topTracks[0];
    if(!track) return null
    return (
        <div className="w-full h-[40%] flex relative rounded-3xl overflow-hidden">
            <img src={track?.album?.cover_big} alt="not found" className="w-full relative object-cover brightness-110"/>
            <div className="flex flex-col justify-end items-start absolute z-1 bottom-0 text-white p-6 bg-gradient-to-tr from-black w-full h-full gap-2">
                 <h1 className="text-4xl font-bold">{track?.album?.title}</h1>
                 <h3 className="text-xl font-medium">{track?.artist?.name}</h3>
                 <div className="flex gap-2">
                 <button className="border px-6 py-2 rounded-full hover:bg-gray-200 hover:text-black transition-all duration-300 active:scale-90" onClick={()=>handlePlay(track)}>Play</button>
                 <button className="border px-6 py-2 rounded-full hover:bg-gray-200 hover:text-black transition-all duration-300">More</button>
                 </div>
            </div>
        </div>
    );
};

export default BannerCard;