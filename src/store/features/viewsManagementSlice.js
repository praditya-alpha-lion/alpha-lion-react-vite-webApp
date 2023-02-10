import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  driver: {},
  trucks: {},
  trailers: {},
};

const viewsManagementSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    addViews: (state, { payload }) => {
      state[payload.view] = payload.data;
    },
  },
});

export const { addViews } = viewsManagementSlice.actions;

export default viewsManagementSlice.reducer;
