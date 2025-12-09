export default function PlaybarSongInfo({ title, artist }) {
  return (
    <div className="flex flex-col w-full text-center gap-3 md:gap-2">
      <p className="text-4xl md:text-2xl font-bold truncate text-white drop-shadow">
        {title}
      </p>
      <p className="text-xs font-semibold text-gray-300 tracking-wide truncate">
        {artist?.toUpperCase()}
      </p>
    </div>
  );
}
