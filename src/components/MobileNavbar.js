import { Menu, MoonIcon, SunDim } from "lucide-react";
import { openDrawer } from "../reduxStore/uiSlice"; 
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reduxStore/themeSlice";

const MobileNavbar = ({user}) => {
      const dispatch = useDispatch();
      const mode = useSelector((state)=> state.theme.mode);

  return (
    <nav className="flex justify-between items-center px-4 py-3 text-white h-full bg-white/15 backdrop-blur-md sm:hidden">
      <button onClick={()=>dispatch(openDrawer())} className="transition-all duration-200">
        <Menu size={24} />
      </button>
      <h1 className="text-lg font-semibold tracking-wide">Music Player</h1>
      <div className="flex items-center gap-3">
        <button
      onClick={() => dispatch(toggleTheme())}
      className="p-1 text-sm rounded-full bg-black text-white dark:bg-white dark:text-black"
    >
      {mode === 'light' ? (<MoonIcon/>) : (<SunDim/>)}
    </button>
        {/* <div>
          <UserCircle size={24} />
        </div> */}
      </div>
    </nav>
  );
};

export default MobileNavbar;
