import { useState } from "react";
import { getSearch } from "../services/deezerAPI";
import SongTile from "./SongTile";
import { useSelector } from "react-redux";
import EqualizerLoader from "./EqualizerLoader";
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

  return (
    <div className="w-full h-full dark:bg-black/40 bg-white/5 lg:bg-white/20 backdrop-blur-lg lg:rounded-xl 2xl:rounded-2xl p-1 lg:p-4 flex flex-col animate-fade-in lg:border lg:border-white/10 ">
      <div className="p-2">
        <div className="flex items-center gap-2 xl:gap-4">
          <input
            type="search"
            placeholder="Search songs..."
            value={tag}
            className="w-full md:w-[80%] lg:w-[75%] xl:w-[50%] px-3 py-1.5 lg:py-2 rounded-full bg-white/15 hover:bg-white/10 focus:bg-white/10 text-black/70 dark:text-white dark:placeholder-white/70 placeholder-black/60 shadow-inner focus:shadow-shadowInner dark:focus:shadow-inner dark:focus:shadow-black font-medium backdrop-blur outline-none transition-all duration-200"
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(tag);
            }}
          />
          <button
            onClick={() => onSearch(tag)}
            disabled={!tag.trim()}
            className={`px-4 py-1.5 lg:py-2 rounded-full font-semibold text-white transition-all duration-200 active:scale-95 ${
              tag.trim()
                ? "bg-emerald-400 text-white hover:bg-emerald-600 shadow-[0_0_12px_#10B981]"
                : "bg-white/10 text-white/50 cursor-not-allowed"
            }`}
          >
            Search
          </button>
        </div>
        <div className="py-3 xl:py-4 flex items-center overflow-auto gap-1.5 xl:gap-3 xl:w-2/3 hide-scrollbar snap-x snap-mandatory">
          {quickSearchTags.map((c, index) => (
            <div
              key={index}
              className="snap-start shrink-0 whitespace-nowrap text-sm xl:text-base cursor-pointer active:scale-90 bg-white hover:bg-white/80 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white/90 text-gray-600 font-medium py-1 px-2 xl:px-3 lg:py-1 rounded-full transition-all duration-200"
              onClick={() => {
                setTag(c);
                onSearch(c);
              }}
            >
             <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative xl:w-2/3 overflow-y-scroll flex-1 hide-scrollbar scroll-smooth">
        {loading ? (
          <EqualizerLoader/>
        ) : (
          result.length > 0 && (
            <div className="w-full flex flex-col gap-1 lg:gap-1.5 animate-fade-in rounded-md">
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
