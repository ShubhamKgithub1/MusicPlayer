import { useSelector } from "react-redux";
import HorizontalScroller from "./HorizontalScroller";

const Explore = () => {
  const topTracks = useSelector((state) => state.api.topTracks);
  const trendingTracks = useSelector((state) => state.api.trendingTracks);
  const newReleases = useSelector((state) => state.api.newReleases);
  const isLoaded = useSelector((state) => state.api.loaded);
  const sections = [
    { title: "Trending Now", data: trendingTracks },
    { title: "Top Genres", data: topTracks },
    { title: "New Releases", data: newReleases },
  ];

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full text-white px-4 sm:px-0 ">
        <div className="flex items-end justify-center gap-[3px] h-16 sm:gap-2 sm:h-20">
          <div className="w-[3px] sm:w-1 h-4 sm:h-5 bg-black dark:bg-gradient-to-b from-cyan-400 via-purple-500 to-orange-400 animate-[bounce_0.6s_infinite] origin-bottom" />
          <div className="w-[3px] sm:w-1 h-6 sm:h-7 bg-black dark:bg-gradient-to-b from-cyan-400 via-purple-500 to-orange-400 animate-[bounce_0.6s_infinite_0.1s] origin-bottom" />
          <div className="w-[3px] sm:w-1 h-8 sm:h-9 bg-black dark:bg-gradient-to-b from-cyan-400 via-purple-500 to-orange-400 animate-[bounce_0.6s_infinite_0.2s] origin-bottom" />
          <div className="w-[3px] sm:w-1 h-6 sm:h-7 bg-black dark:bg-gradient-to-b from-cyan-400 via-purple-500 to-orange-400 animate-[bounce_0.6s_infinite_0.3s] origin-bottom" />
          <div className="w-[3px] sm:w-1 h-4 sm:h-5 bg-black dark:bg-gradient-to-b from-cyan-400 via-purple-500 to-orange-400 animate-[bounce_0.6s_infinite_0.4s] origin-bottom" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:dark:bg-black/40  sm:bg-white/30 backdrop-blur-lg sm:max-h-full sm:h-max w-full p-4 sm:p-6 sm:rounded-3xl sm:border sm:border-white/10 animate-fade-in">
      <div className="flex-1 overflow-auto hide-scrollbar flex flex-col gap-3">
        {sections.map(({ title, data }, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 sm:gap-3 bg-white/10 dark:bg-black/40 sm:dark:bg-transparent sm:bg-transparent p-3 sm:p-1 backdrop-blur-md sm:backdrop-blur-none rounded-md sm:rounded-none"
          >
            <h1 className="text-lg sm:text-xl font-semibold text-white">
              {title}
            </h1>
            <HorizontalScroller data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
