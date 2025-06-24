import { useState } from "react";
import RecentlyPlayed from "./RecentlyPlayed";
import Favorites from "./Favorites";
import Playlists from "./Playlists";

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState("recent");

  return (
    <div className="flex flex-col sm:dark:bg-black/40  sm:bg-white/30 sm:rounded-3xl p-4 sm:p-6 sm:backdrop-blur-lg h-full overflow-hidden text-white">
      <h1 className="font-semibold text-xl sm:text-2xl text-glow">User Library</h1>
      <div className="flex sm:border-b sm:dark:border-b-black mt-4">
        <button onClick={() => setActiveTab("recent")} className={`${activeTab === "recent" ?"bg-white dark:bg-black text-emerald-500 ":"bg-transparent"} px-4 py-1.5 sm:px-6 sm:py-2 font-semibold transition-all duration-300 rounded-t-2xl`}>Recently Played</button>
        <button onClick={() => setActiveTab("favorites")} className={`${activeTab === "favorites" ?"bg-white dark:bg-black text-emerald-500 ":"bg-transparent"} px-4 py-1.5 sm:px-6 sm:py-2 font-semibold transition-all duration-300 rounded-t-2xl`}>Favorites</button>
        <button onClick={() => setActiveTab("playlists")} className={`${activeTab === "playlists" ?"bg-white dark:bg-black text-emerald-500 ":"bg-transparent"} px-4 py-1.5 sm:px-6 sm:py-2 font-semibold  transition-all duration-300 rounded-t-2xl`}>Playlists</button>
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
