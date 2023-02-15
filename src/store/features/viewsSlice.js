import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  driver: {},
  trucks: {},
  trailers: {},
};

const viewsSlice = createSlice({
  name: 'views',
  initialState,
  reducers: {
    addViews: (state, { payload }) => {
      state[payload.view] = payload.data;
    },
  },
});

export const { addViews } = viewsSlice.actions;

export default viewsSlice.reducer;
