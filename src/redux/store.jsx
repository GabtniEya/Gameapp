import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gameslice.jsx";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});
