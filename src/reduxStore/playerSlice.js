import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentSongIndex: 0,
  isShuffle: true,
  volume: true,
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
      if (Array.isArray(action.payload)) {
        console.warn("Expected single track but got array in addToQueue");
        return;
      }
      state.queue.push(action.payload);
    },

    playNext: (state) => {
      if (!state.queue || state.queue.length === 0) return;

      if (state.isShuffle) {
        // Shuffle logic: pick a random index that's not the current one
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * state.queue.length);
        } while (
          nextIndex === state.currentSongIndex &&
          state.queue.length > 1
        );

        state.currentSongIndex = nextIndex;
      } else {
        if (state.currentSongIndex < state.queue.length - 1) {
          state.currentSongIndex += 1;
        } else {
          state.currentSongIndex = 0;
        }
      }

      state.isPlaying = true;
    },

    playPrevious: (state) => {
      if (state.currentSongIndex !== null && state.currentSongIndex > 0) {
        state.currentSongIndex -= 1;
        state.isPlaying = true;
      }
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    toggleVolume:(state)=>{
      state.volume = !state.volume;
    },
    resetPlayer: () => initialState,
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
  setCurrentSongIndex,
  isShuffle,
  toggleShuffle,
  resetPlayer,
  toggleVolume
} = playerSlice.actions;
export default playerSlice.reducer;
