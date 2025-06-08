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

function App() {
  useInitUser();
  useInitAppData();
  const dispatch = useDispatch();
  const { isAddToPlaylistOpen, track } = useSelector((state) => state.modal);
  const userId = useSelector((state) => state.user.userInfo?.uid);

  return (
    <div className="h-screen bg-forest relative flex min-h-[90dvh] max-h-[100dvh] p-4 gap-4 overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-[18dvw] h-full">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="pb-4 border-b-2 border-b-white/50">
          <Navbar />
        </div>
        <div className="flex-1 pt-4 overflow-hidden">
          <Outlet />
        </div>
      </div>
      <div className="absolute bottom-4 w-[18dvw] left-4 text-white">
        <Playbar />
      </div>
       <AddToPlaylistModal
        isOpen={isAddToPlaylistOpen}
        onClose={() => dispatch(closeAddToPlaylistModal())}
        track={track}
        userId={userId}
      />
      <CreatePlaylistModal userId={userId}/>
    </div>
  );
}

export default App;
