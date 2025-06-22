import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";
import apiReducer from "./apiSlice";
import themeReducer from "./themeSlice";
import uiReducer from "./uiSlice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { createFilter } from "redux-persist-transform-filter";


const playerFilter = createFilter("player", [
  "currentSong",
  "queue",
  "currentSongIndex",
  "isShuffle",
  "volume",
]);

const apiFilter = createFilter("api", [
  "topTracks",
  "trendingTracks",
  "newReleases",
  "mostPopular",
  "hits",
  "loaded", // Required for useInitAppData to skip refetch
]);


const rootReducer = combineReducers({
  player: playerReducer,
  user: userReducer,
  api: apiReducer,
  modal: modalReducer,
  theme: themeReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["player", "api"],
  transforms: [playerFilter, apiFilter],
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
