import {configureStore} from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
    reducer: {
        player: playerReducer,
        user: userReducer,
        modal: modalReducer,
    },
});