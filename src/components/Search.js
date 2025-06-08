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
    const favorites = useSelector((state)=>state.user.favorites);

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
    <div className="w-full h-full bg-white/30 backdrop-blur-lg rounded-3xl p-4 flex flex-col animate-fade-in border border-white/20">
      <div>
        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="search songs.."
            value={tag}
            className={`w-[40%] rounded-full p-2 outline-none transition-all duration-200 text-gray-500 font-medium `}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(tag);
            }}
          />
          <button
            className={`px-4 p-2 rounded-3xl bg-white text-emerald-500 font-semibold hover:bg-transparent hover:text-white border transition-all duration-200 active:scale-95 ${tag?"shadow-custom":"shadow-md "}`}
            onClick={() => onSearch(tag)}
          >
            Search
          </button>
        </div>

        <h1 className="text-lg font-semibold text-white py-4">Tags</h1>
        <div className="flex gap-4 flex-wrap w-2/3 border-b pb-6">
          {quickSearchTags.map((c, index) => (
            <div
              key={index}
              className="cursor-pointer active:scale-x-90 transition-all duration-300 bg-white hover:bg-transparent hover:text-white text-gray-500 font-medium w-max px-2 py-1 rounded-full border"
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

      <div className="relative w-2/3 overflow-y-scroll flex-1 hide-scrollbar my-4">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full text-white">
            <div className="flex items-end justify-center gap-2 h-20">
              <div className="w-1 h-4 bg-white animate-[bounce_0.6s_infinite] origin-bottom" />
              <div className="w-1 h-6 bg-white animate-[bounce_0.6s_infinite_0.1s] origin-bottom" />
              <div className="w-1 h-8 bg-white animate-[bounce_0.6s_infinite_0.2s] origin-bottom" />
              <div className="w-1 h-6 bg-white animate-[bounce_0.6s_infinite_0.3s] origin-bottom" />
              <div className="w-1 h-4 bg-white animate-[bounce_0.6s_infinite_0.4s] origin-bottom" />
            </div>
          </div>
        ) : (
          result.length > 0 && <div className="w-full flex flex-col gap-2 animate-fade-in">
            {result.map((res)=>(<SongTile key={res?.id} track={res} trackList={result} isFavorite={favorites?.some(fav => fav.id === res.id)}/> ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
