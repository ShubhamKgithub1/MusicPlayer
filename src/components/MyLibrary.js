import { useState } from "react";
import RecentlyPlayed from "./RecentlyPlayed";
import Favorites from "./Favorites";
import Playlists from "./Playlists";
import { useSelector } from "react-redux";
import useDeleteAccount from "../hooks/useDeleteAccount";

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
    <div className="flex flex-col lg:dark:bg-black/40 lg:border lg:border-white/10 lg:bg-white/20 lg:rounded-3xl p-4 lg:p-6 backdrop-blur-lg h-full overflow-hidden text-white">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl 2xl:text-2xl text-glow">
          User Library
        </h1>
        <button
          onClick={handleDeleteAccount}
          className="px-3 xl:px-4 py-1.5 xl:py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete Account
        </button>
      </div>
      <div className="flex lg:border-b lg:dark:border-b-black mt-4">
        <button
          onClick={() => setActiveTab("recent")}
          className={`${
            activeTab === "recent"
              ? "bg-white dark:bg-black text-emerald-500 "
              : "bg-transparent text-glow"
          } px-4 py-1.5 lg:px-6 lg:py-2 font-semibold transition-all duration-200 rounded-t-2xl`}
        >
          Recently Played
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={`${
            activeTab === "favorites"
              ? "bg-white dark:bg-black text-emerald-500 "
              : "bg-transparent text-glow"
          } px-4 py-1.5 lg:px-6 lg:py-2 font-semibold transition-all duration-200 rounded-t-2xl`}
        >
          Favorites
        </button>
        <button
          onClick={() => setActiveTab("playlists")}
          className={`${
            activeTab === "playlists"
              ? "bg-white dark:bg-black text-emerald-500 "
              : "bg-transparent text-glow"
          } px-4 py-1.5 lg:px-6 lg:py-2 font-semibold  transition-all duration-200 rounded-t-2xl`}
        >
          Playlists
        </button>
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
