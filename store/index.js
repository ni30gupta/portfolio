import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice";

const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});

export default store;

// Re-export thunks and actions for convenience
export * from "./shopSlice";
