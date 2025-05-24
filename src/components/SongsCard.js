export const SongsCard = ({ track }) => {
  // Function to convert seconds to mm:ss format
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-w-[33%] snap-start max-w-[33%] bg-blue-300 rounded-3xl shadow-md relative overflow-hidden">
      <img
        src={track?.album?.cover_medium}
        alt="cover"
        className="rounded-3xl w-full object-cover relative"
      />
      <div
        className="flex justify-between absolute bottom-0 text-white bg-white/20 p-4 w-full backdrop-blur-md">
        <div><h2 className="font-semibold text-base truncate">{track?.title_short}</h2>
        <p className="text-sm">{formatDuration(track?.duration)} minutes</p>
        </div>
        <button className="border border-white/30 rounded-full p-2 hover:bg-white/30">Play</button>
      </div>
    </div>
  );
};
