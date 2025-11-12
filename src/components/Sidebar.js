import { Library, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import RecentlyPlayed from "./RecentlyPlayed";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { login, logout } = useAuth();
  const user = useSelector((state) => state.user.userInfo);
  const recentSongs = useSelector((state) => state.user.recentlyPlayed);

  return (
    <div className="w-full h-full flex flex-col gap-3 dark:text-white relative">
      {user ? (
        <div className="flex flex-col items-center gap-4 justify-center w-full">
          <div className="dark:bg-black/40 shadow-lg dark:shadow-none bg-white/30 backdrop-blur-lg border border-white/10 rounded-2xl w-full flex flex-col items-center justify-center overflow-hidden animate-fade-in">
            <div className="flex items-center justify-start w-full gap-2 p-2 2xl:p-4 animate-fade-in flex-wrap">
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-8 h-8 xl:h-10 xl:w-10 2xl:w-12 2xl:h-12 rounded-full"
                referrerPolicy="no-referrer"
              />
              <div>
                <h1 className="text-sm 2xl:text-lg font-medium text-glow">
                  {user.displayName}
                </h1>
                <h1 className="text-xs text-gray-600 dark:text-gray-300">
                  {user.email}
                </h1>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 p-2 xl:px-4 xl:py-2 rounded-xl hover:shadow-[inset_0_2px_6px_black] bg-red-600 text-white active:scale-95 transition-all duration-200"
              >
                <LogOut size={16} />
                <span className="font-semibold text-sm">Logout</span>
              </button>
            </div>
            <div className=" w-full p-2 xl:p-4 transition-all duration-200 cursor-pointer hover:bg-gradient-to-r from-transparent to-white/30 animate-fade-in">
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `${isActive ? "text-emerald-500" : ""} w-full`
                }
              >
                <button className="flex items-center">
                  <Library />
                  <span className="font-semibold">My Library</span>
                </button>
              </NavLink>
            </div>
          </div>
          {recentSongs?.length > 0 && (
            <div className="w-full dark:bg-black/40 shadow-lg border border-white/10 dark:shadow-none bg-white/30 backdrop-blur-lg rounded-2xl animate-fade-in">
              {Array.isArray(recentSongs) && recentSongs.length > 0 && (
                <RecentlyPlayed isFullTab={false} recentSongs={recentSongs} />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/30 shadow-md dark:bg-black/40 border border-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-start gap-2 text-sm animate-fade-in">
          <h2 className=" text-base xl:text-lg text-gray-600 dark:text-white font-bold">
            You're not logged in
          </h2>
          <p className="text-xs xl:text-sm font-semibold dark:text-gray-400 text-gray-500">
            Login to save your favorite songs and access your playlist across
            devices.
          </p>

          <button
            className="mt-2 px-2 text-xs xl:text-sm xl:px-4 py-2 text-green-500 font-semibold rounded-full bg-white active:scale-95 shadow hover:shadow-lg transition duration-200"
            onClick={login}
          >
            Continue With Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
