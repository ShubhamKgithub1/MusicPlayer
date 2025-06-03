import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  track: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.track = action.payload; // track object
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.track = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
