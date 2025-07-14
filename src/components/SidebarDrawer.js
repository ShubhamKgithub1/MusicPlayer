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
      className={`fixed top-0 left-0 z-[99] text-white lg:hidden bg-black/25 backdrop-blur-3xl h-[100dvh] w-[90%] sm:w-2/4 md:w-1/3 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-200 overflow-y-auto hide-scrollbar`}
    >
      <button
        onClick={() => dispatch(closeDrawer())}
        className="absolute top-2 right-2 p-1 bg-white/10 active:scale-[0.85] hover:shadow-[inset_0_4px_6px_black] rounded-md transition-all"
      >
        <X size={20}/>
      </button>
      <div className="p-4">
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
        <ul className="text-lg flex flex-col gap-2 font-semibold">
          <li onClick={() => dispatch(closeDrawer())}>
            <NavLink
              to="/home"
              end
              className={({ isActive }) =>
                `${isActive ? "text-green-500" : ""}`
              }
            >
              <button className="flex items-center gap-1">
                <Home size={20} />
                <span>Home</span>
              </button>
            </NavLink>
          </li>
          <li onClick={() => dispatch(closeDrawer())}>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `${isActive ? "text-green-500" : ""}`
              }
            >
              <button className="flex items-center gap-1">
                <Music size={20} />
                <span>Explore</span>
              </button>
            </NavLink>
          </li>
          <li onClick={() => dispatch(closeDrawer())}>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `${isActive ? "text-green-500" : ""}`
              }
            >
              <button className="flex items-center gap-1">
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
              <button className="flex items-center gap-1">
                <Library size={20} />
                <span>My Library</span>
              </button>
            </NavLink>
          )}
        </ul>
        {user ? (
          <div className="flex flex-col gap-2 mt-3">
            {recentSongs?.length > 0 && (
              <div className=" bg-white/20 dark:bg-black/20 rounded-lg shadow-md">
                {Array.isArray(recentSongs) && recentSongs.length > 0 && (
                  <RecentlyPlayed isFullTab={false} recentSongs={recentSongs} />
                )}
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center justify-center bg-white/20 shadow-[inset_0_2px_6px_gray,inset_0_-2px_6px_black] dark:shadow-[inset_0_2px_6px_black,inset_0_-2px_6px_black] gap-2 py-2 rounded-xl active:scale-95 transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        ) : (
          <div className="mt-3 bg-white/20 shadow-md dark:bg-black/20 rounded-xl p-3 flex flex-col items-start gap-1 text-sm">
            <h2 className="text-base font-bold">
              You're not logged in
            </h2>
            <p className="text-gray-300 font-semibold">
              Login to save your favorite songs and access your playlist across
              devices.
            </p>
            <button
              className="mt-2 px-4 py-1.5 bg-white text-green-500 dark:shadow-none font-semibold rounded-full active:scale-95 transition duration-200"
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
