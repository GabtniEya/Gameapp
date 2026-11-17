import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  games: [
    {
      id: "game-1",
      title: "The Witcher 3: Wild Hunt",
      genre: "RPG",
      platform: "PC",
      price: 135.966,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "game-2",
      title: "Elden Ring",
      genre: "Action RPG",
      platform: "PlayStation 5",
      price: 203.966,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85",
    },
    {
      id: "game-3",
      title: "Forza Horizon 5",
      genre: "Course",
      platform: "Xbox",
      price: 169.966,
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
    },
  ],
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addGame: {
      reducer(state, action) {
        state.games.push(action.payload);
      },
      prepare(game) {
        return {
          payload: {
            ...game,
            id: nanoid(),
            price: Number(game.price),
          },
        };
      },
    },
    deleteGame(state, action) {
      state.games = state.games.filter((game) => game.id !== action.payload);
    },
    updateGame(state, action) {
      const index = state.games.findIndex((game) => game.id === action.payload.id);
      if (index !== -1) {
        state.games[index] = {
          ...state.games[index],
          ...action.payload,
          price: Number(action.payload.price),
        };
      }
    },
  },
});

export const { addGame, deleteGame, updateGame } = gamesSlice.actions;
export default gamesSlice.reducer;
