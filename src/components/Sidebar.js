import Playbar from "./Playbar";

const Sidebar = () => {
  return (
    <nav className="w-full h-full flex flex-col gap-3 text-white relative">
      <ul className="flex flex-col w-full items-start text-lg font-medium p-4 rounded-3xl bg-white/30 backdrop-blur-lg border border-white/40 gap-2">
        <li className="self-center text-xl font-bold">Music Player</li>
        <li className="w-full hover:bg-gradient-to-r from-white/30 rounded-lg px-2 py-1 transition-all duration-300">
          Home
        </li>
        <li className="w-full hover:bg-gradient-to-r from-white/30 rounded-lg transition-all duration-300 px-2 py-1">
          Explore
        </li>
        <input
          className="mx-2 px-2 py-1 rounded-full w-full outline-none text-gray-600 text-base"
          type="text"
          placeholder="Search songs"
        />
      </ul>

      {/* Login Message Card */}
      <div className="bg-white/30 border border-white/40 backdrop-blur-lg rounded-3xl p-6 flex flex-col items-start gap-3 text-sm ">
        <h2 className="text-lg text-white font-semibold">
          You're not logged in
        </h2>
        <p className="text-gray-300">
          Login to save your favorite songs and access your playlist across
          devices.
        </p>
        <button className="mt-2 px-4 py-2 border text-green-500 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white hover:border-white/30 transition">
          Login
        </button>
      </div>
      
    </nav>
  );
};

export default Sidebar;
