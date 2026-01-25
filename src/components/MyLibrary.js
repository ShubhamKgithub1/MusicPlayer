import { useState } from "react";
import RecentlyPlayed from "./RecentlyPlayed";
import Favorites from "./Favorites";
import Playlists from "./Playlists";
import { useSelector } from "react-redux";
import useDeleteAccount from "../hooks/useDeleteAccount";
import { NAV_OPTIONS } from "../constants/constants";

const MyLibrary = () => {
  const deleteAccount = useDeleteAccount();
  const [activeTab, setActiveTab] = useState("recent");
  const recentSongs = useSelector((state) => state.user.recentlyPlayed);
  const handleDeleteAccount = () => {
    const confirm = window.confirm("Are you sure you want to permanently delete your account?");
    if (confirm) {
      deleteAccount();
    }
  };

  return (
    <div className="flex flex-col dark:bg-black/5 lg:dark:bg-black/35 lg:border lg:border-white/5 bg-white/20 lg:rounded-xl 2xl:rounded-2xl p-3 xl:p-4 backdrop-blur-lg h-full overflow-hidden text-white">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl 2xl:text-2xl text-glow">
          User Library
        </h1>
        <button
          onClick={handleDeleteAccount}
          className="px-2 xl:px-4 py-1 xl:py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Delete Account
        </button>
      </div>
      <div className="flex gap-1 mt-3 mb-1.5">
        {NAV_OPTIONS.map((opt) => (<button
          key={opt.navLink}
          onClick={() => setActiveTab(opt.navLink)}
          className={`px-5 py-2 text-sm font-medium rounded-full transition-all
  ${activeTab === opt.navLink
              ? "bg-white text-gray-800 shadow-md"
              : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          {opt.name}
        </button>))}
      </div>
      {activeTab === "recent" && (
        <RecentlyPlayed isFullTab={true} recentSongs={recentSongs} />
      )}
      {activeTab === "favorites" && <Favorites />}
      {activeTab === "playlists" && <Playlists />}
    </div>
  );
};

export default MyLibrary;
