import { useEffect, useState } from "react";
import { getRecentlyPlayed } from "../services/userService";
import SongTile from "./SongTile";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

const RecentlyPlayed = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const favorites = useSelector((state)=> state.user.favorites);

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
    <div className="flex flex-col relative overflow-auto bg-white/30 rounded-3xl border-t border-x border-white/20 backdrop-blur-lg max-h-[50dvh] animate-fade-in">
      <h2 className="text-base font-semibold text-white p-3">Recently Played</h2>
      {recentSongs.length > 0 ? (
        <div className="flex flex-col gap-1 overflow-auto hide-scrollbar relative">{recentSongs.map((song)=>(<SongTile key={song?.id} track={song} trackList={recentSongs} isFavorite={favorites?.some(fav => fav.id === song.id)}/>))}</div>
      ) : (
        <p className="text-white text-sm">No recently played songs yet.</p>
      )}
      <div className="absolute bottom-0 z-20 bg-gradient-to-t from-white/50 h-2 w-full"/>
    </div>
  );
};

export default RecentlyPlayed;
