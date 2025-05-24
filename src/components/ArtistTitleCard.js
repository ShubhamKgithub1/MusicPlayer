export const ArtistTitleCard = ({ prop }) => {
  console.log(prop);
  return (
    <div className="text-white flex items-center gap-10 p-6 relative bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl">
      <img
        src={prop?.artist?.picture}
        alt="not found"
        className="rounded-full border bg-blue-500"
      />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{prop?.artist?.name}</h1>
        <h2 className="font-medium">{prop?.album?.title}</h2>
      </div>
      {/* <div className="absolute w-[90%] h-[1.5px] bottom-0 bg-black"></div> */}
    </div>
  );
};
