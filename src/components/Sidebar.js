import { Library, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import RecentlyPlayed from "./RecentlyPlayed";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { login, logout } = useAuth();
  const user = useSelector((state) => state.user.userInfo);

  return (
    <div className="w-full h-full flex flex-col gap-3 dark:text-textPrimary text-white relative">
      {user ? (
        <div className="flex flex-col items-center gap-4 justify-center w-full ">
          <div className="dark:bg-black/40  bg-white/30 backdrop-blur-lg border border-white/10 rounded-3xl w-full flex flex-col items-center justify-center overflow-hidden animate-fade-in">
            <div className="flex items-center justify-start w-full gap-2 p-4 animate-fade-in">
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-12 h-12 rounded-full"
                referrerPolicy="no-referrer"
              />
              <div>
                <h1 className="text-lg font-medium">{user.displayName}</h1>
                <h1 className="text-xs text-gray-300">{user.email}</h1>
              </div>
              <button
                onClick={logout}
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all duration-300 shadow-lg border border-white/20"
              >
                <LogOut size={16} />
                <span className="font-semibold">Logout</span>
              </button>
            </div>
            <div className="w-full p-4 transition-all duration-300 cursor-pointer hover:bg-gradient-to-r from-transparent to-white/30 animate-fade-in">
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `${isActive ? "text-green-500" : ""} w-full`
                }
              >
                <button className="flex">
                  <Library />
                  <span className="font-semibold">My Library</span>
                </button>
              </NavLink>
            </div>
          </div>
          <div className="w-full  dark:bg-black/40 bg-white/30 backdrop-blur-lg rounded-3xl animate-fade-in">
            <RecentlyPlayed isFullTab={false} />
          </div>
        </div>
      ) : (
        <div className="bg-white/30 dark:bg-black/40 dark:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 backdrop-blur-lg rounded-3xl p-6 flex flex-col items-start gap-3 text-sm animate-fade-in">
          <h2 className="text-lg text-white font-semibold">
            You're not logged in
          </h2>
          <p className="text-gray-300">
            Login to save your favorite songs and access your playlist across
            devices.
          </p>

          <button
            className="mt-2 px-4 py-2 border text-green-500 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white hover:border-white/20 transition"
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
