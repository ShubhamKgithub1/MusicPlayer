import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentSongIndex: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
      state.currentSongIndex = 0;
    },
    addToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    playNext: (state) => {
      if (
        state.currentSongIndex !== null &&
        state.currentSongIndex < state.queue.length - 1
      ) {
        state.currentSongIndex += 1;
      }
    },
    playPrevious: (state) => {
      if (state.currentSongIndex !== null && state.currentSongIndex > 0) {
        state.currentSongIndex -= 1;
      }
    },
  },
});

export const {
  setCurrentSong,
  playPause,
  setQueue,
  addToQueue,
  playNext,
  currentSongIndex,
  playPrevious,
  setCurrentSongIndex
} = playerSlice.actions;
export default playerSlice.reducer;
