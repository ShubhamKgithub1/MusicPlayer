import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarDrawerOpen: false,
  },
  reducers: {
    openDrawer: (state) => {
      state.isSidebarDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isSidebarDrawerOpen = false;
    },
    toggleDrawer: (state) => {
      state.isSidebarDrawerOpen = !state.isSidebarDrawerOpen;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = uiSlice.actions;
export default uiSlice.reducer;
