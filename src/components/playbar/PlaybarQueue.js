import React from "react";
import QueueCard from "../QueueCard";

function PlaybarQueue({ queue }) {
  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar p-1">
      {queue.map(track => (
        <QueueCard key={track.id} track={track} />
      ))}
    </div>
  );
};

export default React.memo(PlaybarQueue);

