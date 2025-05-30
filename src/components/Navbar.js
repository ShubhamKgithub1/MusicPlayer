import { Home, Music, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const [userOptions, setUserOptions] = useState(false);

  const { user, logout } = useAuth();
  return (
    <div className="bg-transparent w-full backdrop-blur-lg h-full flex flex-row-reverse justify-between items-center animate-fade-in px-4">
      <div className="flex items-center gap-4">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `${
              isActive ? "text-green-500" : "text-black"
            } w-80 bg-white hover:text-white rounded-3xl py-1 px-2 cursor-pointer hover:bg-transparent border border-white/20 transition-all duration-300`
          }
        >
          <Search />
        </NavLink>
        {user && (
          <div className="relative flex justify-center">
            <img
              src={user?.photoURL}
              alt="User"
              className={`w-10 h-10 rounded-full ${
                user.photoURL ? "bg-transparent" : "bg-red-400"
              } border border-white/20 cursor-pointer relative`}
              onClick={() => setUserOptions(!userOptions)}
            />
            <div className={`${userOptions?"bg-red-500 rounded-full cursor-pointer h-min opacity-100 text-opacity-100":"bg-transparent h-0 opacity-0 text-opacity-0"} font-medium animation-fade-in flex items-center absolute -bottom-2 translate-y-2/3 transition-all duration-300 px-2 py-1 text-white`} onClick={()=>{setUserOptions(false); logout()}}>
                Logout
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            `${
              isActive
                ? "text-green-500 bg-gradient-to-r from-transparent to-white/30 "
                : "text-black"
            } bg-white p-2 rounded-full hover:bg-transparent border border-white/20 hover:text-white transition-all duration-300 cursor-pointer`
          }
        >
          <Home />
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `${
              isActive
                ? "text-green-500 bg-gradient-to-r from-transparent to-white/30"
                : "text-black"
            } flex items-center justify-center bg-white p-2 rounded-full hover:bg-transparent border border-white/20 hover:text-white transition-all duration-300 cursor-pointer`
          }
        >
          <Music />
        </NavLink>
      </div>
    </div>
  );
};
export default Navbar;
