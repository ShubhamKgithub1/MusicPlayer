import { useSelector } from "react-redux";
import HorizontalScroller from "./HorizontalScroller";
import FallbackLoader from "./FallbackLoader";

const Explore = () => {
  const topTracks = useSelector((state) => state.api.topTracks);
  const trendingTracks = useSelector((state) => state.api.trendingTracks);
  const hits = useSelector((state) => state.api.hits);
  const newReleases = useSelector((state) => state.api.newReleases);
  const isLoaded = useSelector((state) => state.api.loaded);
  const favorites = useSelector((state) => state.user.favorites);
  const popular = useSelector((state) => state.api.mostPopular);

  const sections = [
    { title: "Trending Now", data: trendingTracks },
    { title: "Top Tracks", data: topTracks },
    { title: "Hits", data: hits },
    { title: "Lo-Fi", data: newReleases },
    { title: "Poplar", data: popular },
  ];

  if (!isLoaded) {
    return <FallbackLoader />;
  }

  return (
    <div className="flex backdrop-blur-lg bg-white/20 dark:bg-black/5 lg:dark:bg-black/30 h-full lg:max-h-full lg:h-max w-full p-3 xl:p-4 lg:rounded-xl 2xl:rounded-2xl lg:border lg:border-white/10">
      <div className="flex-1 overflow-auto hide-scrollbar flex flex-col gap-3 lg:gap-4 animate-fade-in">
        {sections.map(({ title, data }, index) => (
          <div key={index} className="flex flex-col gap-3 lg:gap-4">
            <h1 className="text-lg xl:text-xl font-bold text-white text-glow">
              {title}
            </h1>
            <HorizontalScroller data={data} favorites={favorites} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
