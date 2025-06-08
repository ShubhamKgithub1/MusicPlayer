import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topTracks:[],
    trendingTracks:[],
    newReleases:[],
    mostPopular:[],
    hits:[],
    loaded: false,
};

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers:{
        setData: (state, action) =>{
            state.topTracks = action.payload.topTracks;
            state.trendingTracks = action.payload.trendingTracks;
            state.newReleases = action.payload.newReleases;
            state.mostPopular = action.payload.mostPopular;
            state.hits = action.payload.hits;
            state.loaded = true;
        }
    }
});

export const { setData } = apiSlice.actions;
export default apiSlice.reducer;