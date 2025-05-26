import Sidebar from "./components/Sidebar";
import Playbar from "./components/Playbar";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="h-screen bg-forest relative flex min-h-[90dvh] max-h-[100dvh] p-4 gap-4 border border-black">
      <div className="w-[20dvw] h-full">
        <Sidebar />
      </div>
      <div className="w-[80dvw] h-full">
        <Outlet />
      </div>
      <div className="absolute top-4 w-[20dvw] pr-4 right-2 text-white">
        <Playbar />
      </div>
    </div>
  );
}

export default App;
