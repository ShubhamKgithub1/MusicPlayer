import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  userInfo: null,
  playlists: [],
  recentlyPlayed: [],
  userLoaded: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setRecentlyPlayed: (state, action) => {
      state.recentlyPlayed = action.payload;
    },
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    addPlaylist: (state, action) => {
      state.playlists.unshift(action.payload);
    },
    updatePlaylistSongs: (state, action) => {
      const { playlistId, songs } = action.payload;
      const target = state.playlists.find((p) => p.id === playlistId);
      if (target) {
        target.songs = songs;
      }
    },
    setUserLoaded: (state, action) => {
      state.userLoaded = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const {
  setFavorites,
  setUserInfo,
  resetUser,
  setRecentlyPlayed,
  setPlaylists,
  addPlaylist,
  updatePlaylistSongs,
  setUserLoaded
} = userSlice.actions;
export default userSlice.reducer;
