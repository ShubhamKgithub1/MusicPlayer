export default function PlaybarExpandedImage({ src, alt, isExpand }) {
  return (
    <div className="absolute inset-0 overflow-hidden md:rounded-lg">
      <img
        src={src}
        alt={alt}
        className={`w-full h-full blur object-cover transition-opacity duration-300 ${
          isExpand ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
