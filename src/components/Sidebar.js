import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="w-full h-full flex flex-col gap-3 text-white relative">
      <ul className="flex flex-col w-full items-start text-lg font-medium p-4 rounded-3xl bg-white/30 backdrop-blur-lg border border-white/40 gap-2">
        <li className="self-center text-xl font-bold">Music Player</li>
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            `${isActive ? "text-green-500 bg-gradient-to-r from-transparent to-white/30 " : "text-white"} w-full`
          }
        >
          <li className="cursor-pointer w-full hover:bg-gradient-to-r from-transparent to-white/30 px-2 py-1 transition-all duration-300">
            Home
          </li>
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `${isActive ? "text-green-500 bg-gradient-to-r from-transparent to-white/30" : "text-white"} w-full`
          }
        >
          {" "}
          <li className=" cursor-pointer w-full hover:bg-gradient-to-r from-transparent to-white/30 transition-all duration-300 px-2 py-1">
            Explore{" "}
          </li>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `${isActive ? "text-green-500 bg-gradient-to-r from-transparent to-white/30" : "text-white"} w-full`
          }
        >
          <li className="cursor-pointer w-full hover:bg-gradient-to-r from-transparent to-white/30 transition-all duration-300 px-2 py-1">
            Search{" "}
          </li>
        </NavLink>
      </ul>

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
