import { useState } from "react";
import RecentlyPlayed from "./RecentlyPlayed";
import Favorites from "./Favorites";

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState("recent");

  return (
    <div className="flex flex-col bg-white/30 rounded-3xl p-6 backdrop-blur-lg h-full overflow-hidden text-white">
      <h1 className="font-semibold text-2xl">User Library</h1>
      <div className="flex gap-4 border-b pb-2 my-4">
        <button onClick={() => setActiveTab("recent")}>Recently Played</button>
        <button onClick={() => setActiveTab("favorites")}>Favorites</button>
        <button onClick={() => setActiveTab("playlists")}>Playlists</button>
      </div>
      {activeTab === "recent" && <RecentlyPlayed isFullTab={true} />}
      {activeTab === "favorites" && <Favorites/>}
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
