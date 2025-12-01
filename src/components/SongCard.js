import { useState } from "react";
import FallbackLoader from "./FallbackLoader";
import { FolderPlus, Heart, ListPlus, Trash2 } from "lucide-react";
import KebabMenu from "./KebabMenu";
import { addToQueue, playPause } from "../reduxStore/playerSlice";
import { addToFavorites, removeFromFavorites } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { openAddToPlaylistModal } from "../reduxStore/modalSlice";

const SongCard = ({ track, onPlay, isFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
    const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
    const handleAddToQueue = (track) => {
    dispatch(addToQueue(track));
    dispatch(playPause(true));
    toast.success("Song added to queue..");
  };

  const handleAddToFavorites = async (track) => {
    if (!user) return;

    if (isFavorite) {
      await removeFromFavorites(user.uid, track.id, dispatch);
    } else {
      await addToFavorites(user.uid, track, dispatch);
    }
  };
  return (
    <div
      key={track?.id}
      className="flex-[0_0_35%] sm:flex-[0_0_25%] md:flex-[0_0_20%] xl:flex-[0_0_14%] relative group snap-start rounded-lg shadow-md cursor-pointer transition-all duration-200 animate-fade-in aspect-square"
      onClick={() => onPlay(track)}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 z-30">
            <FallbackLoader />
          </div>
        )}
        <img
          src={track?.album?.cover_medium}
          alt="cover"
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover relative z-10 group-hover:scale-[1.08] transition-transform duration-300"
        />
        <div className=" lg:opacity-0 lg:group-hover:opacity-100 absolute inset-0 z-20 flex items-end text-white bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-300">
          <div className="w-full flex justify-between items-center p-1 lg:p-2">
            <h2 className="font-semibold truncate text-sm lg:text-base">
              {track?.title_short}
            </h2>

           {user && <KebabMenu
            actions={[
              {
                label:"Add to Queue",
                icon: ListPlus,
                onClick: ()=> handleAddToQueue(track),
              },{
                label:"Add to Playlist",
                icon: FolderPlus,
                onClick: () => dispatch(openAddToPlaylistModal(track)),
              },{
                label: isFavorite?"Remove from Favorites":"Add to Favorites",
                icon: isFavorite? Trash2 : Heart,
                className: isFavorite? "text-red-600": "",
                onClick: ()=> handleAddToFavorites(track),
              }
            ]}
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
