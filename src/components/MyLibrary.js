import { useState } from "react";
import RecentlyPlayed from "./RecentlyPlayed";
import Favorites from "./Favorites";
import Playlists from "./Playlists";

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState("recent");

  return (
    <div className="flex flex-col dark:bg-black/40 dark:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-white/30 rounded-3xl p-6 backdrop-blur-lg h-full overflow-hidden text-white">
      <h1 className="font-semibold text-2xl">User Library</h1>
      <div className="flex border-b my-4">
        <button onClick={() => setActiveTab("recent")} className={`${activeTab === "recent" ?"bg-white text-emerald-500":"bg-transparent"} px-6 py-2 font-semibold transition-all duration-300 rounded-t-2xl`}>Recently Played</button>
        <button onClick={() => setActiveTab("favorites")} className={`${activeTab === "favorites" ?"bg-white text-emerald-500":"bg-transparent"} px-6 py-2 font-semibold transition-all duration-300 rounded-t-2xl`}>Favorites</button>
        <button onClick={() => setActiveTab("playlists")} className={`${activeTab === "playlists" ?"bg-white text-emerald-500":"bg-transparent"} px-6 py-2 font-semibold  transition-all duration-300 rounded-t-2xl`}>Playlists</button>
      </div>
      {activeTab === "recent" && <RecentlyPlayed isFullTab={true} />} 
      {activeTab === "favorites" && <Favorites/>}
      {activeTab === "playlists" && <Playlists/>}
      {/* <div className="flex gap-4 overflow-auto hide-scrollbar">
        <div className="flex-1">{activeTab === "favorites" && <Favorites/>}
        {activeTab === "playlists" && <RecentlyPlayed isFullTab={true} />}
        </div>
        <div className="w-[30%]"><RecentlyPlayed isFullTab={true} /></div>
      </div> */}
    </div>
  );
};

export default MyLibrary;
