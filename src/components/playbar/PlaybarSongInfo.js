export default function PlaybarSongInfo({ title, artist }) {
  return (
    <div className="flex flex-col w-full text-center gap-4 md:gap-2">
      <p className="text-5xl md:text-2xl font-bold truncate text-white drop-shadow">
        {title}
      </p>
      <p className="text-xs font-semibold text-gray-300 tracking-wide truncate">
        {artist?.toUpperCase()}
      </p>
    </div>
  );
}
