import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  load: null,
};

export const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    setLoad: (state, { payload }) => {
      state.load = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoad } = loadSlice.actions;

export default loadSlice.reducer;
