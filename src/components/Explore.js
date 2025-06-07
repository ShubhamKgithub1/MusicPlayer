import HorizontalScroller from "./HorizontalScroller";

const Explore = () => {
  const title = ["Trending Now", "Top Genres", "New Releases"];

  return (
    <div className="flex flex-col gap-4 bg-white/30 backdrop-blur-lg max-h-full h-max w-full p-6 rounded-3xl border border-white/20 animate-fade-in-delay">
      <div className="flex-1 overflow-auto hide-scrollbar flex flex-col gap-4">
        {title.map((t, index) => (
          <div key={index} className="flex flex-col gap-4 animate-fade-in">
            <h1 className="text-lg font-semibold text-white">{t}</h1>
            <HorizontalScroller tag={t} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
