import { useSelector } from "react-redux";
import HorizontalScroller from "./HorizontalScroller";
import { use } from "react";

const Explore = () => {
  const topTracks = useSelector((state)=>state.api.topTracks);
  const trendingTracks = useSelector((state)=>state.api.trendingTracks);
  const newReleases = useSelector((state)=>state.api.newReleases);
  const isLoaded = useSelector((state)=> state.api.loaded);
    const sections = [
    { title: "Trending Now", data: trendingTracks },
    { title: "Top Genres", data: topTracks },
    { title: "New Releases", data: newReleases },
  ];

  if(!isLoaded){
    return (
      <div className="flex items-center justify-center w-full h-full text-white">
        <div className="flex items-end justify-center gap-2 h-20">
          <div className="w-1 h-5 bg-white animate-[bounce_0.6s_infinite] origin-bottom" />
          <div className="w-1 h-7 bg-white animate-[bounce_0.6s_infinite_0.1s] origin-bottom" />
          <div className="w-1 h-9 bg-white animate-[bounce_0.6s_infinite_0.2s] origin-bottom" />
          <div className="w-1 h-7 bg-white animate-[bounce_0.6s_infinite_0.3s] origin-bottom" />
          <div className="w-1 h-5 bg-white animate-[bounce_0.6s_infinite_0.4s] origin-bottom" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-white/30 backdrop-blur-lg max-h-full h-max w-full p-6 rounded-3xl border border-white/20 animate-fade-in">
      <div className="flex-1 overflow-auto hide-scrollbar flex flex-col gap-4">
        {sections.map(({title, data}, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            <HorizontalScroller data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
