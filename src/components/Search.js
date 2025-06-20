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
    <div className="w-full h-full sm:dark:bg-black/40 sm:bg-white/30 backdrop-blur-lg rounded-3xl p-4 flex flex-col animate-fade-in sm:border sm:border-white/10 ">
      <div>
        <div className="flex items-center gap-2 sm:gap-4">
          <input
            type="search"
            placeholder="Search songs..."
            value={tag}
            className="w-full sm:w-[40%] px-4 py-1.5 md:py-2 rounded-full bg-transparent text-white placeholder-white/70 border border-white/10 md:border-none font-medium backdrop-blur-md outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-400"
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(tag);
            }}
          />
          <button
            onClick={() => onSearch(tag)}
            disabled={!tag.trim()}
            className={`px-4 py-1.5 md:py-2 rounded-full font-semibold text-white transition-all duration-300 active:scale-95 ${
              tag.trim()
                ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_0_12px_#10B981]"
                : "bg-white/10 text-white/50 cursor-not-allowed"
            }`}
            // Button color code-#A855F7
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
              className="text-sm sm:text-base cursor-pointer active:scale-x-90 transition-all duration-300 bg-white hover:bg-transparent dark:hover:bg-black/40 dark:text-textPrimary dark:border-borderSoft dark:bg-white/10  hover:text-white text-gray-500 font-medium w-max py-1 px-1.5 sm:px-2 sm:py-1 rounded-full border"
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
