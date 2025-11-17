import { Home, ListMusicIcon, MoonIcon, Search, SunDim } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reduxStore/themeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  return (
    <div className="flex flex-row-reverse justify-between items-center animate-fade-in px-4">
      <div className="flex items-center gap-4">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `${
              isActive
                ? " text-white bg-cyan-300 dark:bg-black/40 dark:text-orange-200 shadow-black/40 dark:shadow-orange-500 shadow-[1px_3px]"
                : " hover:bg-black/15 hover:shadow-[inset_0_2px_4px_black] hover:text-white bg-white dark:bg-black/40 dark:text-orange-200"
            } w-80 py-1 xl:py-1.5 px-2 rounded-full transition-all duration-200 cursor-pointer`
          }
        >
          <Search />
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
            `${
              isActive
                ? " text-white bg-cyan-300 dark:bg-black/40 dark:text-purple-500 shadow-black/50 dark:shadow-purple-500 shadow-[1px_3px]"
                : " hover:bg-black/15 hover:shadow-[inset_0_2px_4px_black] hover:text-white bg-white dark:bg-black/40 dark:text-purple-500"
            }  p-2 xl:p-3 rounded-full transition-all duration-200 cursor-pointer`
          }
        >
          <Home />
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `${
              isActive
                ? " text-white bg-cyan-300 dark:bg-black/40 dark:text-cyan-500 shadow-black/50 dark:shadow-cyan-500 shadow-[1px_3px]"
                : " hover:bg-black/15 hover:shadow-[inset_0_2px_4px_black] hover:text-white bg-white dark:bg-black/40 dark:text-cyan-400"
            }   p-2 xl:p-3 rounded-full transition-all duration-200 cursor-pointer`
          }
        >
          <ListMusicIcon />
        </NavLink>
      </div>
    </div>
  );
};
export default Navbar;
