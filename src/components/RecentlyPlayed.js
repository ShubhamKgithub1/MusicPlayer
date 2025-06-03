import { useEffect, useState } from "react";
import { getRecentlyPlayed } from "../services/userService";
import SongTile from "./SongTile";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const RecentlyPlayed = ({ isFullTab }) => {
  const [recentSongs, setRecentSongs] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const favorites = useSelector((state) => state.user.favorites);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        const songs = await getRecentlyPlayed(user.uid);
        setRecentSongs(songs);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div
      className={`flex flex-col relative rounded-3xl animate-fade-in ${
        isFullTab
          ? "h-full overflow-auto "
          : "h-auto overflow-auto border border-white/20"
      }`}
    >
      <div className="flex justify-between items-center  p-4">
        <h2
          className={`${
            isFullTab ? "text-xl font-bold" : "text-base font-semibold"
          } text-white`}
        >
          Recently Played
        </h2>
        {!isFullTab && (
          <NavLink
            to="library"
            className={({ isActive }) =>
              `${isActive ? "text-green-500 " : "text-gray-300"}`
            }
          >
            <button className="cursor-pointer transition-all duration-300 hover:text-white">
              View all
            </button>
          </NavLink>
        )}
      </div>
      {recentSongs.length > 0 ? (
        <div
          className={`flex flex-col ${
            isFullTab ? "overflow-auto hide-scrollbar gap-1" : "overflow-hidden"
          }  relative pb-4`}
        >
          {(isFullTab ? recentSongs : recentSongs.slice(0, 5)).map((song) => (
            <SongTile
              key={song?.id}
              track={song}
              trackList={recentSongs}
              isFavorite={favorites?.some((fav) => fav.id === song.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-white text-sm px-6">No recently played songs yet.</p>
      )}
      {isFullTab && (
        <div className="absolute bottom-0 z-20 bg-gradient-to-t from-white/50 h-2 w-full" />
      )}
    </div>
  );
};

export default RecentlyPlayed;
