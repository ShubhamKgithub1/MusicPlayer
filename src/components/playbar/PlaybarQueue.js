import React, { useCallback } from "react";
import QueueCard from "../QueueCard";
import { setCurrentSongIndex, playPause } from "../../reduxStore/playerSlice";
import { useDispatch } from "react-redux";

function PlaybarQueue({ queue }) {
  const dispatch = useDispatch();

  const handleTrackClick = useCallback(
    (trackId) => {
      const index = queue.findIndex((t) => t.id === trackId);
      if (index === -1) return;

      dispatch(setCurrentSongIndex(index));
      dispatch(playPause(true));
    },
    [queue, dispatch]
  );
  return (
    <div className="flex-1 overflow-y-scroll hide-scrollbar p-1">
      {queue.map((track) => (
        <QueueCard key={track.id} track={track} onSelect={handleTrackClick} />
      ))}
    </div>
  );
}

export default React.memo(PlaybarQueue);
