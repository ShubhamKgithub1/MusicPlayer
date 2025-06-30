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
  const queue = useSelector((state) => state.player.queue);
  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [themeMode]);
  return (
    <div
      className={`h-screen ${
        themeMode === "dark" ? " bg-dark" : "bg-light"
      } flex-col md:flex-row relative flex md:min-h-[90dvh] md:max-h-[100dvh] lg:p-4 md:gap-4 md:overflow-hidden transition-all duration-700`}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div className="hidden lg:block w-full lg:w-[18dvw] lg:h-full">
        <Sidebar />
      </div>
      <div
        className={` ${
          queue.length > 0 ? " h-[90dvh] " : " h-[100dvh] "
        }  md:h-auto md:flex-1 flex flex-col md:min-h-0 md:min-w-0`}
      >
        <div className="lg:pb-4 lg:border-b lg:border-b-white/50 lg:py-0">
          <Navbar />
          <MobileNavbar user={user} />
        </div>
        <div className={`flex-1 lg:pt-4 min-h-0 overflow-auto hide-scrollbar`}>
          <Outlet />
        </div>
      </div>
      <div className="absolute bottom-0 md:bottom-2 lg:bottom-4 w-full md:w-[40%] lg:w-[30%] xl:w-[18dvw] md:left-2 lg:left-4 md:text-white">
        <Playbar />
      </div>
      <AddToPlaylistModal
        isOpen={isAddToPlaylistOpen}
        onClose={() => dispatch(closeAddToPlaylistModal())}
        track={track}
        userId={userId}
      />
      <CreatePlaylistModal userId={userId} />
      <SidebarDrawer user={user} />
    </div>
  );
}

export default App;
