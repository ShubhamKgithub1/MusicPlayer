import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import useInitUser from "./hooks/useInitUser";
import { useSelector, useDispatch } from "react-redux";
import { closeAddToPlaylistModal } from "./reduxStore/modalSlice";
import useInitAppData from "./hooks/useInitAppData";
import { lazy, Suspense, useEffect } from "react";
import MobileNavbar from "./components/MobileNavbar";
import SidebarDrawer from "./components/SidebarDrawer";
import useIsSmallDevice from "./hooks/useIsSmallDevice";
import FallbackLoader from "./components/FallbackLoader";
const Playbar = lazy(() => import("./components/Playbar"));
const AddToPlaylistModal = lazy(() => import("./components/AddToPlaylistModal"));
const CreatePlaylistModal = lazy(() => import("./components/CreatePlaylistModal"));


function App() {
  useInitUser();
  useInitAppData();
  const dispatch = useDispatch();
  const isSmallDevice = useIsSmallDevice();
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
      className={`h-[100dvh] ${
        themeMode === "dark" ? "bg-dark" : "bg-light"
      } flex-col md:flex-row relative flex md:min-h-[90dvh] md:max-h-[100dvh] lg:p-4 md:gap-4 md:overflow-hidden transition-all duration-300`}
    >
      <Toaster position="top-right" reverseOrder={false} />
      {isSmallDevice ? <SidebarDrawer user={user} /> : <Sidebar />}
      <div
        className={` ${
          queue.length > 0 ? " h-[92dvh] " : " h-[100dvh] "
        }  md:h-auto md:flex-1 flex flex-col md:min-h-0 md:min-w-0`}
      >
        {isSmallDevice ? (
          <MobileNavbar />
        ) : (
          <div className="lg:pb-3 xl:pb-4 border-b-2 border-b-white/50">
            <Navbar />
          </div>
        )}
        <div
          className={`flex-1 lg:pt-3 xl:pt-4 min-h-0 overflow-auto hide-scrollbar`}
        >
          <Outlet />
        </div>
      </div>
      {queue.length > 0 && (
        <div
          className={`absolute bottom-0 md:bottom-2 lg:bottom-4 w-full md:w-[40dvw] lg:w-[30dvw] xl:w-[18dvw] md:left-2 lg:left-4`}
        >
          <Suspense fallback={<FallbackLoader />}>
            <Playbar />
          </Suspense>
        </div>
      )}
      <AddToPlaylistModal
        isOpen={isAddToPlaylistOpen}
        onClose={() => dispatch(closeAddToPlaylistModal())}
        track={track}
        userId={userId}
      />
      <CreatePlaylistModal userId={userId} />
    </div>
  );
}

export default App;
