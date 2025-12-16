import { Menu, MoonIcon, SunDim } from "lucide-react";
import { openDrawer } from "../reduxStore/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reduxStore/themeSlice";
import React from "react";

const MobileNavbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <nav className="flex justify-between items-center px-4 py-2.5 text-white bg-white/30 dark:bg-black/10 backdrop-blur-lg">
      <button
        onClick={() => dispatch(openDrawer())}
        className="p-1"
      >
        <Menu size={24} />
      </button>
      <h1 className="text-lg font-semibold tracking-wide">Music Player</h1>
      <button
        onClick={() => dispatch(toggleTheme())}
        className="p-1.5 rounded-full text-white bg-white/10 active:scale-[0.90] transition-transform duration-300"
      >
        {mode === "light" ? <MoonIcon /> : <SunDim />}
      </button>
    </nav>
  );
};

export default React.memo(MobileNavbar);
