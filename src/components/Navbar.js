import { Home, ListMusicIcon, MoonIcon, Search, SunDim } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reduxStore/themeSlice";
import React from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  return (
    <div className="flex flex-row-reverse justify-between items-center animate-fade-in px-4">
      <div className="flex items-center gap-4">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex items-center gap-2 text-white font-semibold p-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-white/15 ${
              isActive && "bg-white/20"
            }`
          }
        >
          <Search /> Search
        </NavLink>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 text-sm rounded-full bg-black text-white dark:bg-white dark:text-black"
        >
          {mode === "light" ? <MoonIcon /> : <SunDim />}
        </button>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-2 text-white font-semibold p-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-white/15 ${
              isActive && "bg-white/20"
            }`
          }
        >
          <Home /> Home
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `flex items-center gap-2 text-white font-semibold p-2 rounded-full transition-all duration-200 cursor-pointer hover:bg-white/15 ${
              isActive && "bg-white/20"
            }`
          }
        >
          <ListMusicIcon /> Explore
        </NavLink>
      </div>
    </div>
  );
};
export default React.memo(Navbar);
