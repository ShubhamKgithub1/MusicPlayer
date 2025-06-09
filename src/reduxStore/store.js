import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";
import apiReducer from "./apiSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { createFilter } from "redux-persist-transform-filter";
import themeReducer from "./themeSlice";
// import persistReducer from "redux-persist/es/persistReducer";

const playerFilter = createFilter("player", [
  "currentSong",
  "queue",
  "currentSongIndex",
  "isShuffle",
  "volume",
]);

const rootReducer = combineReducers({
  player: playerReducer,
  user: userReducer,
  api: apiReducer,
  modal: modalReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["player"],
  transforms: [playerFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
