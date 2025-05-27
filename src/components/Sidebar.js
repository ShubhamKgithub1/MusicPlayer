import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, login, logout } = useAuth();

  return (
    <nav className="w-full h-full flex flex-col gap-3 text-white relative">
      {/* <ul className="flex flex-col w-full items-start text-lg font-medium p-4 rounded-3xl bg-white/30 backdrop-blur-lg border border-white/40 gap-2 animate-fade-in">
        <li className="self-center text-xl font-bold">Music Player</li>
        <NavLink
          to="/home"
          end
          className={({ isActive }) =>
            `${isActive ? "text-green-500 bg-gradient-to-r from-transparent to-white/30 " : "text-white"} w-full`
          }
        >
          <li className="flex items-center gap-2 cursor-pointer w-full hover:bg-gradient-to-r from-transparent to-white/30 px-2 py-1 transition-all duration-300">
            <span><HomeIcon/> </span> <span>Home</span>
          </li>
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `${isActive ? "text-green-500 bg-gradient-to-r from-transparent to-white/30" : "text-white"} w-full`
          }
        >
          <li className="items-center cursor-pointer flex gap-2 w-full hover:bg-gradient-to-r from-transparent to-white/30 transition-all duration-300 px-2 py-1">
            <span><ListMusic/> </span> <span>Explore</span>
          </li>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `${isActive ? "text-green-500 bg-gradient-to-r from-transparent to-white/30" : "text-white"} w-full`
          }
        >
          <li className="cursor-pointer flex items-center gap-2 w-full hover:bg-gradient-to-r from-transparent to-white/30 transition-all duration-300 px-2 py-1">
            <span><Search/> </span> <span>Search</span>
          </li>
        </NavLink>
      </ul> */}

      {user ? (
        <div className="flex items-center gap-4 animate-fade-in justify-center">
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span>{user.displayName}</span>
          <button onClick={logout} className="px-2 py-1 bg-red-500 rounded">
            Logout
          </button>
        </div>
      ) : (
        <div className="bg-white/30 border border-white/40 backdrop-blur-lg rounded-3xl p-6 flex flex-col items-start gap-3 text-sm animate-fade-in">
          <h2 className="text-lg text-white font-semibold">
            You're not logged in
          </h2>
          <p className="text-gray-300">
            Login to save your favorite songs and access your playlist across
            devices.
          </p>

          <button
            className="mt-2 px-4 py-2 border text-green-500 font-semibold rounded-full bg-white hover:bg-transparent hover:text-white hover:border-white/30 transition"
            onClick={login}
          >
            Continue With Google
          </button>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
