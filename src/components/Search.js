import { useState } from "react";
import { getSearch } from "../services/deezerAPI";
import SongTile from "./SongTile";
import { useSelector } from "react-redux";

const Search = () => {
  const quickSearchTags = [
    "Pop",
    "Hip-Hop",
    "Chill",
    "Workout",
    "Romantic",
    "Classical",
    "Indie",
    "Jazz",
    "Electronic",
    "Trending",
    "Throwback",
    "Party",
    "Lo-Fi",
    "Instrumental",
    "Mood Boosters",
  ];

  const [tag, setTag] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const favorites = useSelector((state) => state.user.favorites);

  const onSearch = async (searchTag) => {
    if (!searchTag) return;

    setLoading(true);

    try {
      const res = await getSearch(searchTag);
      setResult(res);
    } catch (err) {
      console.error("Error while searching:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log(result);

  return (
    <div className="w-full h-full sm:dark:bg-black/40 sm:bg-white/30 backdrop-blur-lg rounded-3xl p-4 flex flex-col animate-fade-in sm:border sm:border-white/10 sm:dark:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
      <div>
        <div className="flex items-center gap-2 sm:gap-4">
          <input
            type="search"
            placeholder="search songs.."
            value={tag}
            className={`sm:w-[40%] w-full rounded-full p-1.5 px-2 sm:p-2 outline-none transition-all duration-200 text-gray-500 font-medium `}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(tag);
            }}
          />
          <button
            className={`px-4 p-1.5 sm:p-2 rounded-3xl bg-white text-emerald-500 font-semibold hover:bg-transparent hover:text-white border transition-all duration-200 active:scale-95 ${
              tag ? "shadow-custom" : "shadow-md "
            }`}
            onClick={() => onSearch(tag)}
          >
            Search
          </button>
        </div>

        <h1 className="sm:text-lg font-medium sm:font-semibold dark:text-textPrimary text-white py-4">
          Tags
        </h1>
        <div className="flex gap-2 sm:gap-4 flex-wrap sm:w-2/3 sm:border-b sm:pb-6">
          {quickSearchTags.map((c, index) => (
            <div
              key={index}
              className="text-sm sm:text-base cursor-pointer active:scale-x-90 transition-all duration-300 bg-white hover:bg-transparent dark:hover:bg-black/40 dark:text-textPrimary dark:border-borderSoft dark:bg-white/10 dark:shadow-neon-blue hover:text-white text-gray-500 font-medium w-max py-1 px-1.5 sm:px-2 sm:py-1 rounded-full border"
              onClick={() => {
                setTag(c);
                onSearch(c);
              }}
            >
              <h1>{c}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="relative sm:w-2/3 overflow-y-scroll flex-1 hide-scrollbar mt-4 snap-y sm:snap-none snap-mandatory scroll-smooth">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full text-white px-4 sm:px-0">
            <div className="flex items-end justify-center gap-[3px] h-16 sm:gap-2 sm:h-20">
              <div className="w-[3px] sm:w-1 h-4 sm:h-5 bg-white animate-[bounce_0.6s_infinite] origin-bottom" />
              <div className="w-[3px] sm:w-1 h-6 sm:h-7 bg-white animate-[bounce_0.6s_infinite_0.1s] origin-bottom" />
              <div className="w-[3px] sm:w-1 h-8 sm:h-9 bg-white animate-[bounce_0.6s_infinite_0.2s] origin-bottom" />
              <div className="w-[3px] sm:w-1 h-6 sm:h-7 bg-white animate-[bounce_0.6s_infinite_0.3s] origin-bottom" />
              <div className="w-[3px] sm:w-1 h-4 sm:h-5 bg-white animate-[bounce_0.6s_infinite_0.4s] origin-bottom" />
            </div>
          </div>
        ) : (
          result.length > 0 && (
            <div className="w-full flex flex-col gap-2 animate-fade-in snap-start sm:snap-none">
              {result.map((res) => (
                <SongTile
                  key={res?.id}
                  track={res}
                  trackList={result}
                  isFavorite={favorites?.some((fav) => fav.id === res.id)}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Search;
