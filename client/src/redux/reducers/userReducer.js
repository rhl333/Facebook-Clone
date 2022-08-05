import { createSlice } from "@reduxjs/toolkit";

let userInitialState = { name: "raju" };
let userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
