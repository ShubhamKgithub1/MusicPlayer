import Sidebar from "./components/Sidebar";
import Playbar from "./components/Playbar";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import useInitUser from "./hooks/useInitUser";
import AddToPlaylistModal from "./components/AddToPlaylistModal";
import { useSelector, useDispatch } from "react-redux";
import { closeAddToPlaylistModal } from "./reduxStore/modalSlice";
import CreatePlaylistModal from "./components/CreatePlaylistModal";
import useInitAppData from "./hooks/useInitAppData";
import { useEffect } from "react";
import MobileNavbar from "./components/MobileNavbar";
import SidebarDrawer from "./components/SidebarDrawer";

function App() {
  useInitUser();
  useInitAppData();
  const dispatch = useDispatch();
  const { isAddToPlaylistOpen, track } = useSelector((state) => state.modal);
  const user = useSelector((state) => state.user.userInfo);
  const userId = user?.uid;
  const themeMode = useSelector((state) => state.theme.mode);
 const queue = useSelector((state)=> state.player.queue);
  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [themeMode]);
  return (
    <div className={`h-screen ${themeMode === 'dark' ? 'bg-[#1e1e1e]' : 'bg-forest '} flex-col sm:flex-row relative flex sm:min-h-[90dvh] sm:max-h-[100dvh] sm:p-4 sm:gap-4 sm:overflow-hidden transition-all duration-700`}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="hidden sm:block w-full sm:w-[18dvw] sm:h-full">
        <Sidebar />
      </div>
      <div className={` ${queue.length > 0 ?" h-[90dvh] ":" h-[100dvh] "}  sm:h-auto sm:flex-1 flex flex-col sm:min-h-0 sm:min-w-0`}>
        <div className="sm:pb-4 border-b sm:border-b-2 border-b-white/50 sm:py-0">
          <Navbar />
          <MobileNavbar
          user={user}/>
        </div>
        <div className={`flex-1 sm:pt-4 min-h-0 overflow-auto hide-scrollbar`}>
          <Outlet />
        </div>
      </div>
      <div className="absolute bottom-0 sm:bottom-4 w-full sm:w-[18dvw] sm:left-4 sm:text-white">
        <Playbar />
      </div>
       <AddToPlaylistModal
        isOpen={isAddToPlaylistOpen}
        onClose={() => dispatch(closeAddToPlaylistModal())}
        track={track}
        userId={userId}
      />
      <CreatePlaylistModal userId={userId}/>
      <SidebarDrawer
      user={user}/>
    </div>
  );
}

export default App;
