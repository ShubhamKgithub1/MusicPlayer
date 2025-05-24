import { useSelector } from "react-redux";
// import { SongTile } from "./SongTile";

export const SongQueue = () => {
  const queue = useSelector((state) => state.player.queue);
  const currentSong = useSelector((state) => state.player.currentSong);
  return (
    <div>
      <h1 className="p-4 bg-white/30 backdrop-blur-lg text-black font-bold">
        Current Playing: {currentSong?.title}
      </h1>
      <h3>In the queue:</h3>
      {/* <SongTile track={queue} isQueue={true} /> */}
    </div>
  );
};
