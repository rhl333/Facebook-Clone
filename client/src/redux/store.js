import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

let store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
