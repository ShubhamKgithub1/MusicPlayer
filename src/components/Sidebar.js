import { Library } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import RecentlyPlayed from "./RecentlyPlayed";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { login, logout } = useAuth();
  const user = useSelector((state) => state.user.userInfo);

  return (
    <div className="sm:w-full sm:h-full sm:flex sm:flex-col sm:gap-3 sm:dark:text-textPrimary sm:text-white sm:relative">
      {user ? (
        <div className="sm:flex sm:flex-col sm:items-center sm:gap-4 sm:justify-center sm:w-full ">
          <div className="dark:bg-black/10  sm:bg-white/30 sm:backdrop-blur-lg sm:border sm:border-white/10 sm:rounded-3xl sm:w-full sm:flex sm:flex-col sm:items-center sm:justify-center sm:overflow-hidden animate-fade-in">
            <div className="sm:flex sm:flex-col sm:items-center sm:gap-4 sm:p-4 animate-fade-in">
              <img
                src={user.photoURL}
                alt="avatar"
                className="sm:w-20 sm:h-20 rounded-full"
                 referrerPolicy="no-referrer"
              />
              <span className="sm:text-xl">{user.displayName}</span>
              {/* <button onClick={logout} className="px-2 py-1 bg-red-500 rounded">
                Logout
              </button> */}
            </div>
            <div className="sm:w-full sm:p-4 transition-all duration-300 cursor-pointer sm:hover:bg-gradient-to-r from-transparent to-white/30 animate-fade-in">
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "sm:text-green-500"
                      : ""
                  } sm:w-full`
                }
              >
                <button className="flex"><Library />
                <span className="font-semibold">My Library</span></button>
              </NavLink>
            </div>
          </div>
          <div className="w-full  sm:dark:bg-black/40 bg-white/30 backdrop-blur-lg rounded-3xl animate-fade-in">
            <RecentlyPlayed isFullTab={false} />
          </div>
        </div>
      ) : (
        <div className="sm:bg-white/30 sm:dark:bg-black/40 sm:dark:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] sm:border sm:border-white/20 sm:backdrop-blur-lg sm:rounded-3xl sm:p-6 flex flex-col items-start gap-3 text-sm animate-fade-in">
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
