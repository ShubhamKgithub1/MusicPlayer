export const ArtistTitleCard = ({ prop }) => {
  return (
    <div className="text-white flex items-center bg-white/30 backdrop-blur-lg border border-white/20 gap-10 p-6 relative border-b-2 rounded-xl animate-fade-in">
      <img
        src={prop?.artist?.picture}
        alt="not found"
        className="rounded-full shadow-xl"
      />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{prop?.artist?.name}</h1>
        <h2 className="font-medium">{prop?.album?.title}</h2>
      </div>
    </div>
  );
};
