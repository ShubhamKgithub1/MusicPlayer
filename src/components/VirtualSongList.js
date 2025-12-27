import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import SongTile from "./SongTile";

const VirtualSongList = ({ data, favorites }) => {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 62, // approximate SongTile height
    overscan: 7, // render a few extra items above/below
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className="overflow-y-auto hide-scrollbar h-full"
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.key}
            ref={virtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {/* Render your SongTile here */}
            <SongTile
              track={data[virtualRow.index]}
              trackList={data}
              isFavorite={favorites?.some((fav) => fav.id === data[virtualRow.index]?.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualSongList;
