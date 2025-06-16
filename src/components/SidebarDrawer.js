import { Home, Library, Music, Search, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../reduxStore/uiSlice";
import { NavLink } from "react-router-dom";

const SidebarDrawer = ({ user }) => {
  const { login, logout } = useAuth();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isSidebarDrawerOpen);
  return (
    <div
      className={`fixed top-0 left-0 sm:hidden bg-black/20 backdrop-blur-3xl h-screen w-2/3 ${
        isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      } transition-all duration-500`}
    >
      <button
        onClick={() => dispatch(closeDrawer())}
        className="absolute top-2 right-2 text-white"
      >
        <X />
      </button>
      <div className="p-4 text-white">
        {/* User Info */}
        {user && (
          <div className="mb-4">
            <p className="text-lg font-semibold">Hello, {user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        )}

        {/* Menu Items */}
        <ul className="text-sm">
          <li className="">
            <NavLink
              to="/home"
              end
              className={({ isActive }) =>
                `${
                  isActive ? "text-green-500" : ""
                } transition-all duration-300 cursor-pointer`
              }
            >
              <button className="flex items-center gap-1 py-1">
                <Home size={20}/>
                <span className="font-semibold">Home</span>
              </button>
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `${
                  isActive ? "text-green-500" : ""
                } transition-all duration-300 cursor-pointer`
              }
            >
              <button className="flex items-center gap-1 py-1">
                <Music size={20}/>
                <span className="font-semibold">Explore</span>
              </button>
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `${
                  isActive ? "text-green-500" : ""
                } transition-all duration-300 cursor-pointer`
              }
            >
              <button className="flex items-center gap-1 py-1">
                <Search size={20}/>
                <span className="font-semibold">Search</span>
              </button>
            </NavLink>
          </li>
          {user && (
            <NavLink
              to="/library"
              className={({ isActive }) =>
                `${isActive ? "text-green-500" : ""} w-full`
              }
            >
              <button className="flex items-center gap-1 py-1">
                <Library size={20} />
                <span className="font-semibold">My Library</span>
              </button>
            </NavLink>
          )}
        </ul>
        {user ? (
          <div className="py-1 text-red-500 cursor-pointer" onClick={logout}>
            🚪 Logout
          </div>
        ) : (
          <div className="mt-3 bg-white/30 sm:dark:bg-black/40 sm:dark:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 backdrop-blur-lg rounded-xl p-4 flex flex-col items-start gap-1.5 text-sm animate-fade-in">
            <h2 className="text-base text-white font-semibold">
              You're not logged in
            </h2>
            <p className="text-gray-300">
              Login to save your favorite songs and access your playlist across
              devices.
            </p>

            <button
              className="mt-2 px-3 py-1.5 border text-green-500 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white hover:border-white/20 transition"
              onClick={login}
            >
              Continue With Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarDrawer;
