import {configureStore} from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        player: playerReducer,
        user: userReducer,
    },
});