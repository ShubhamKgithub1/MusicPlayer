import { Menu, MoonIcon, SunDim } from "lucide-react";
import { openDrawer } from "../reduxStore/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reduxStore/themeSlice";

const MobileNavbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <nav className="flex justify-between items-center px-4 py-3 text-white bg-white/20 dark:bg-black/40 backdrop-blur-md">
      <button
        onClick={() => dispatch(openDrawer())}
        className=" p-1 transition-all duration-200 dark:hover:bg-white/20 dark:hover:text-white"
      >
        <Menu size={24} />
      </button>
      <h1 className="text-lg font-semibold tracking-wide">Music Player</h1>
      <button
        onClick={() => dispatch(toggleTheme())}
        className="p-1 rounded-full bg-black dark:bg-white dark:text-black transition-all duration-200"
      >
        {mode === "light" ? <MoonIcon /> : <SunDim />}
      </button>
    </nav>
  );
};

export default MobileNavbar;
