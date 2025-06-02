import { Library } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import RecentlyPlayed from "./RecentlyPlayed";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { login, logout } = useAuth();
  const user = useSelector((state) => state.user.userInfo);

  return (
    <div className="w-full h-full flex flex-col gap-3 text-white relative">
      {user ? (
        <div className="flex flex-col items-center gap-4 animate-fade-in justify-center w-full ">
          <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-3xl w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full"
                 referrerPolicy="no-referrer"
              />
              <span>{user.displayName}</span>
              <button onClick={logout} className="px-2 py-1 bg-red-500 rounded">
                Logout
              </button>
            </div>
            <div className="w-full p-4 transition-all duration-300 cursor-pointer hover:bg-gradient-to-r from-transparent to-white/30">
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-green-500 bg-gradient-to-r from-transparent to-white/30"
                      : "text-white"
                  }w-full`
                }
              >
                <button className="flex"><Library />
                <span className="font-semibold">My Library</span></button>
              </NavLink>
            </div>
          </div>
          <div className="w-full bg-white/30 backdrop-blur-lg rounded-3xl">
            <RecentlyPlayed isFullTab={false} />
          </div>
        </div>
      ) : (
        <div className="bg-white/30 border border-white/20 backdrop-blur-lg rounded-3xl p-6 flex flex-col items-start gap-3 text-sm animate-fade-in">
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
