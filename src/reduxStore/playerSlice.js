import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentSong: null,
    isPlaying: false,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers:{
        setCurrentSong: (state, action) =>{
            state.currentSong = action.payload;
        },
        playPause: (state, action) =>{
            state.isPlaying = action.payload;
        },
    },
});

export const {setCurrentSong, playPause} = playerSlice.actions;
export default playerSlice.reducer;