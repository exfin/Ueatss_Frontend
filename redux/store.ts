import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart.slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// ✅ Define RootState (type of the entire Redux store state)
export type RootCartState = ReturnType<typeof store.getState>;

// ✅ Define AppDispatch (type of Redux's dispatch function)
export type AppDispatch = typeof store.dispatch;

export default store;
