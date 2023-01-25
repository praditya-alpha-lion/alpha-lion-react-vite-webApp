import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const userAuthenticationSlice = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {
    handleUserLogin: (state, { payload }) => {
      state.user = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleUserLogin } = userAuthenticationSlice.actions;

export default userAuthenticationSlice.reducer;
