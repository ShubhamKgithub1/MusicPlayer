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

function App() {
  useInitUser();
  const dispatch = useDispatch();
  const { isAddToPlaylistOpen, track } = useSelector((state) => state.modal);
  const userId = useSelector((state) => state.user.userInfo?.uid);

  return (
    <div className="h-screen bg-forest relative flex min-h-[90dvh] max-h-[100dvh] p-4 gap-4 border border-black overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-[18dvw] h-full">
        <Sidebar />
      </div>
      <div className="flex flex-col w-[80dvw] max-h-screen h-screen">
        <div className="pb-4 h-[8%] border-b-2 border-b-white/50">
          <Navbar />
        </div>
        <div className="h-[90%] py-4">
          <Outlet />
        </div>
      </div>
      <div className="absolute bottom-4 w-[20dvw] pr-4 left-2 text-white">
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
