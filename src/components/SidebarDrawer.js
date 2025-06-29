import { Home, Library, LogOut, Music, Search, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../reduxStore/uiSlice";
import { NavLink } from "react-router-dom";
import RecentlyPlayed from "./RecentlyPlayed";

const SidebarDrawer = ({ user }) => {
  const { login, logout } = useAuth();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isSidebarDrawerOpen);
  const recentSongs = useSelector((state) => state.user.recentlyPlayed);
  return (
    <div
      className={`fixed top-0 left-0 z-[99] sm:hidden bg-white/5 dark:bg-black/20 backdrop-blur-3xl h-screen w-3/4 ${
        isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      } transition-all duration-500 overflow-y-auto hide-scrollbar`}
    >
      <button
        onClick={() => dispatch(closeDrawer())}
        className="absolute top-2 right-2 p-1 text-white dark:hover:bg-white dark:hover:text-black hover:shadow-[inset_0_4px_6px_black] rounded-md transition-all duration-300"
      >
        <X />
      </button>
      <div className="p-4 text-white">
        {/* User Info */}
        {user && (
          <div className="mb-4">
            <p className="text-lg font-semibold">Hello, {user.displayName}</p>
            <p className="text-sm dark:text-gray-400 text-black/60">
              {user.email}
            </p>
          </div>
        )}

        {/* Menu Items */}
        <ul className="text-lg flex flex-col gap-1 font-semibold">
          <li onClick={() => dispatch(closeDrawer())}>
            <NavLink
              to="/home"
              end
              className={({ isActive }) =>
                `${isActive ? "text-green-500" : ""} cursor-pointer`
              }
            >
              <button className="flex items-center gap-1 py-1">
                <Home size={20} />
                <span>Home</span>
              </button>
            </NavLink>
          </li>
          <li onClick={() => dispatch(closeDrawer())}>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `${isActive ? "text-green-500" : ""} cursor-pointer`
              }
            >
              <button className="flex items-center gap-1 py-1">
                <Music size={20} />
                <span>Explore</span>
              </button>
            </NavLink>
          </li>
          <li onClick={() => dispatch(closeDrawer())}>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `${isActive ? "text-green-500" : ""} cursor-pointer`
              }
            >
              <button className="flex items-center gap-1 py-1">
                <Search size={20} />
                <span>Search</span>
              </button>
            </NavLink>
          </li>
          {user && (
            <NavLink
              to="/library"
              className={({ isActive }) =>
                `${isActive ? "text-green-500" : ""} w-full`
              }
              onClick={() => dispatch(closeDrawer())}
            >
              <button className="flex items-center gap-1 py-1">
                <Library size={20} />
                <span>My Library</span>
              </button>
            </NavLink>
          )}
        </ul>
        {user ? (
          <div className="flex flex-col gap-2 mt-3 ">
            {recentSongs?.length > 0 && (
              <div className="w-full dark:bg-black/40 bg-white/10 rounded-lg animate-fade-in">
                {Array.isArray(recentSongs) && recentSongs.length > 0 && (
                  <RecentlyPlayed isFullTab={false} recentSongs={recentSongs} />
                )}
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center justify-center hover:shadow-black hover:shadow-inner gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all duration-300 shadow"
            >
              <LogOut size={16} />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        ) : (
          <div className="mt-3 bg-white/20 shadow-md dark:bg-black/20 border-2 border-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-start gap-1.5 text-sm animate-fade-in">
            <h2 className="text-base text-white dark:text-gray-300 font-bold text-glow">
              You're not logged in
            </h2>
            <p className="dark:text-gray-400 text-gray-700">
              Login to save your favorite songs and access your playlist across
              devices.
            </p>
            <button
              className="mt-2 px-4 py-2 hover:bg-black/10 hover:shadow-[inset_2px_2px_4px_gray] text-gray-600 dark:text-white dark:bg-white/10 dark:hover:bg-transparent dark:hover:shadow-custom hover:text-white dark:hover:text-white font-semibold rounded-full bg-white active:scale-95 transition duration-300 dark:text-glow"
              onClick={login}
            >
              Continue With Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarDrawer;
