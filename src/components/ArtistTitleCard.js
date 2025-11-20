export const ArtistTitleCard = ({ prop }) => {

  if(!prop) return;
  return (
    <div className="text-white flex items-center gap-4 p-3 relative animate-fade-in">
      <div className="">
        <img
          src={prop?.artist?.picture}
          alt="not found"
          className="rounded-full shadow-xl"
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{prop?.artist?.name}</h1>
        <h2 className="font-medium">
          {prop?.album?.title.substring(0, 80) + ". . ."}
        </h2>
      </div>
      <div className="ml-auto bg-white/30 border border-white/40 rounded-full px-2 py-1 backdrop-blur-xl cursor-pointer whitespace-nowrap">view all</div>
    </div>
  );
};
