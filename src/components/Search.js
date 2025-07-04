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
    <div className="w-full h-full lg:dark:bg-black/40 lg:bg-white/20 backdrop-blur-lg rounded-3xl p-4 flex flex-col animate-fade-in lg:border lg:border-white/10 ">
      <div>
        <div className="flex items-center gap-2 xl:gap-4">
          <input
            type="search"
            placeholder="Search songs..."
            value={tag}
            className="w-full md:w-[80%] lg:w-[75%] xl:w-[50%] px-4 py-1.5 lg:py-2 rounded-full bg-white text-black/70 dark:bg-black/40 dark:focus:bg-white/20 dark:focus:shadow-black dark:hover:bg-white/10 dark:hover:shadow-black/20 dark:text-white dark:placeholder-white/70 placeholder-black/70 hover:bg-transparent hover:shadow-black/10 hover:shadow-inner focus:bg-transparent focus:shadow-inner focus:shadow-black font-medium backdrop-blur-md outline-none transition-all duration-300"
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(tag);
            }}
          />
          <button
            onClick={() => onSearch(tag)}
            disabled={!tag.trim()}
            className={`px-4 py-1.5 lg:py-2 rounded-full font-semibold text-white transition-all duration-300 active:scale-95 ${
              tag.trim()
                ? "bg-emerald-400 text-white hover:bg-emerald-600 shadow-[0_0_12px_#10B981]"
                : "bg-white/10 text-white/50 cursor-not-allowed"
            }`}
          >
            Search
          </button>
        </div>
        <div className="mt-3 xl:mt-6 flex gap-2 xl:gap-3 flex-wrap xl:w-2/3 lg:border-b pb-4 xl:pb-6">
          {quickSearchTags.map((c, index) => (
            <div
              key={index}
              className="text-sm xl:text-base hover:shadow-[inset_0_2px_6px_black] cursor-pointer active:scale-x-90 bg-white dark:bg-black/30 dark:hover:bg-white/20 dark:hover:bg-white dark:text-white/70 text-gray-500 font-medium w-max py-1 px-2 xl:px-3 lg:py-1 rounded-full transition-all duration-300"
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
      <div className="relative xl:w-2/3 overflow-y-scroll flex-1 hide-scrollbar mt-4 snap-y lg:snap-none snap-mandatory scroll-smooth">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full text-white px-4 lg:px-0">
            <div className="flex items-end justify-center gap-[3px] h-16 lg:gap-2 lg:h-20">
              <div className="w-[3px] lg:w-1 h-4 lg:h-5 bg-white animate-[bounce_0.6s_infinite] origin-bottom" />
              <div className="w-[3px] lg:w-1 h-6 lg:h-7 bg-white animate-[bounce_0.6s_infinite_0.1s] origin-bottom" />
              <div className="w-[3px] lg:w-1 h-8 lg:h-9 bg-white animate-[bounce_0.6s_infinite_0.2s] origin-bottom" />
              <div className="w-[3px] lg:w-1 h-6 lg:h-7 bg-white animate-[bounce_0.6s_infinite_0.3s] origin-bottom" />
              <div className="w-[3px] lg:w-1 h-4 lg:h-5 bg-white animate-[bounce_0.6s_infinite_0.4s] origin-bottom" />
            </div>
          </div>
        ) : (
          result.length > 0 && (
            <div className="w-full flex flex-col gap-2 animate-fade-in snap-start lg:snap-none">
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
