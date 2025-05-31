import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const {setFavorites, setUserInfo} = userSlice.actions;
export default userSlice.reducer;
