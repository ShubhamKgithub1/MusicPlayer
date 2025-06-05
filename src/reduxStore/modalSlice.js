import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddToPlaylistOpen: false,
  isCreatePlaylistOpen: false,
  track: null, // For Add to Playlist modal
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAddToPlaylistModal: (state, action) => {
      state.isAddToPlaylistOpen = true;
      state.track = action.payload;
    },
    closeAddToPlaylistModal: (state) => {
      state.isAddToPlaylistOpen = false;
      state.track = null;
    },

    openCreatePlaylistModal: (state) => {
      state.isCreatePlaylistOpen = true;
    },
    closeCreatePlaylistModal: (state) => {
      state.isCreatePlaylistOpen = false;
    },
  },
});

export const {
  openAddToPlaylistModal,
  closeAddToPlaylistModal,
  openCreatePlaylistModal,
  closeCreatePlaylistModal,
} = modalSlice.actions;

export default modalSlice.reducer;
