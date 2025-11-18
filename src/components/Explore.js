import { useSelector } from "react-redux";
import HorizontalScroller from "./HorizontalScroller";
import FallbackLoader from "./FallbackLoader";

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
      <FallbackLoader/>
    );
  }

  return (
    <div className="flex flex-col gap-4 dark:bg-black/40 backdrop-blur-lg lg:bg-white/20 h-full lg:max-h-full lg:h-max w-full p-3 lg:p-4 rounded-xl 2xl:rounded-2xl lg:border lg:border-white/10 animate-fade-in shadow-md">
      <div className="flex-1 overflow-auto hide-scrollbar flex flex-col lg:gap-3">
        {sections.map(({ title, data }, index) => (
          <div
            key={index}
            className="flex flex-col lg:gap-3"
          >
            <h1 className="pl-2 text-lg xl:text-xl font-bold text-white text-glow">
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
